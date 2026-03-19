import { db, storage } from "./firebaseConfig";
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import curriculumData from "./curriculum.json";

const COLLECTION_NAME = "users";
const CURRICULUM_COLLECTION = "curriculum";
const TOPIC_RESOURCES_COLLECTION = "topicResources";

// Session-based cache for topic resources
export let topicCache = {};

/**
 * Clear the topic cache (call this on logout)
 */
export const clearTopicCache = () => {
  topicCache = {};
};

/**
 * Save user progress to Firestore
 * @param {string} userId - User ID from Firebase Auth
 * @param {object} progressData - Progress data { topicName: boolean }
 */
export const saveUserProgress = async (userId, progressData) => {
  try {
    const userDocRef = doc(db, COLLECTION_NAME, userId);
    await updateDoc(userDocRef, {
      progress: progressData,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error saving progress:", error);
    throw error;
  }
};

/**
 * Get user progress from Firestore
 * @param {string} userId - User ID from Firebase Auth
 */
export const getUserProgress = async (userId) => {
  try {
    const userDocRef = doc(db, COLLECTION_NAME, userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data().progress || {};
    }
    return {};
  } catch (error) {
    console.error("Error getting progress:", error);
    return {};
  }
};

/**
 * Initialize user document with default data
 * @param {string} userId - User ID from Firebase Auth
 * @param {string} userEmail - User email
 */
export const initializeUserDocument = async (userId, userEmail) => {
  try {
    const userDocRef = doc(db, COLLECTION_NAME, userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        email: userEmail,
        createdAt: new Date().toISOString(),
        progress: {},
        lastUpdated: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Error initializing user document:", error);
    throw error;
  }
};

/**
 * Push curriculum data to Firestore (one-time operation)
 */
export const pushCurriculumToFirestore = async () => {
  try {
    const curriculumDocRef = doc(db, CURRICULUM_COLLECTION, "ml_ai_curriculum");
    await setDoc(curriculumDocRef, {
      data: curriculumData,
      updatedAt: new Date().toISOString(),
    });
    console.log("Curriculum data pushed to Firestore successfully");
  } catch (error) {
    console.error("Error pushing curriculum to Firestore:", error);
    throw error;
  }
};

/**
 * Get curriculum data from Firestore
 */
export const getCurriculumFromFirestore = async () => {
  try {
    const curriculumDocRef = doc(
      db,
      CURRICULUM_COLLECTION,
      "ml_ai_curriculum"
    );
    const curriculumDoc = await getDoc(curriculumDocRef);

    if (curriculumDoc.exists()) {
      return curriculumDoc.data().data;
    }
    // Fallback to local JSON if not in Firestore
    return curriculumData;
  } catch (error) {
    console.error("Error getting curriculum from Firestore:", error);
    // Fallback to local JSON
    return curriculumData;
  }
};
/**
 * Track user activity for the current day
 * Stores data in year-specific documents for scalability: users/{userId}/activity/{year}
 * @param {string} userId - User ID from Firebase Auth
 */
export const trackUserActivity = async (userId) => {
  try {
    const now = new Date();
    const today = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const year = now.getFullYear().toString();
    
    // Reference to year-specific activity document
    const yearDocRef = doc(db, COLLECTION_NAME, userId, "activity", year);
    const yearDoc = await getDoc(yearDocRef);

    if (yearDoc.exists()) {
      const data = yearDoc.data();
      const count = (data[today] || 0) + 1;
      await updateDoc(yearDocRef, {
        [today]: count,
        updatedAt: new Date().toISOString()
      });
    } else {
      await setDoc(yearDocRef, {
        [today]: 1,
        updatedAt: new Date().toISOString()
      });
    }

    // Also update lastActive on the main user document
    const userDocRef = doc(db, COLLECTION_NAME, userId);
    await updateDoc(userDocRef, {
      lastActive: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Error tracking activity:", error);
  }
};

/**
 * Get user activity data for a specific year
 * @param {string} userId - User ID from Firebase Auth
 * @param {string} year - Year to fetch (defaults to current year)
 */
export const getUserActivityByYear = async (userId, year = new Date().getFullYear().toString()) => {
  try {
    const yearDocRef = doc(db, COLLECTION_NAME, userId, "activity", year);
    const yearDoc = await getDoc(yearDocRef);

    if (yearDoc.exists()) {
      return yearDoc.data() || {};
    }
    return {};
  } catch (error) {
    console.error(`Error getting activity for ${year}:`, error);
    return {};
  }
};

/**
 * Get years for which the user has activity records
 * @param {string} userId - User ID from Firebase Auth
 */
export const getAvailableActivityYears = async (userId) => {
  try {
    const activityColRef = collection(db, COLLECTION_NAME, userId, "activity");
    const snapshot = await getDocs(activityColRef);
    const years = snapshot.docs.map(doc => doc.id).sort((a, b) => b - a);
    
    // Always include current year if no data
    const currentYear = new Date().getFullYear().toString();
    if (years.length === 0) return [currentYear];
    return years;
  } catch (error) {
    console.error("Error getting available years:", error);
    return [new Date().getFullYear().toString()];
  }
};

/**
 * Legacy support for getting activity (fetched from main user doc for now, 
 * but should migrate to year-based eventually)
 * @param {string} userId 
 */
export const getUserActivity = async (userId) => {
  try {
    // For transition, try getting current year first
    const currentYear = new Date().getFullYear().toString();
    const yearData = await getUserActivityByYear(userId, currentYear);
    if (Object.keys(yearData).length > 0) return yearData;

    // Fallback to legacy field in user doc
    const userDocRef = doc(db, COLLECTION_NAME, userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data().activity || {};
    }
    return {};
  } catch (error) {
    console.error("Error getting activity:", error);
    return {};
  }
};

/**
 * Calculate the current activity streak
 * @param {object} activity - Activity object { "YYYY-MM-DD": count }
 * @returns {number} Current streak in days
 */
export const calculateStreak = (activity) => {
  if (!activity || Object.keys(activity).length === 0) return 0;

  const today = new Date();
  const sortedDates = Object.keys(activity).sort((a, b) => new Date(b) - new Date(a));
  
  let currentStreak = 0;
  let checkDate = new Date();
  checkDate.setHours(0, 0, 0, 0);

  // Check if active today or yesterday to continue streak
  const todayStr = checkDate.toISOString().split('T')[0];
  const yesterday = new Date(checkDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (!activity[todayStr] && !activity[yesterdayStr]) {
    return 0;
  }

  // Start from today or yesterday
  if (!activity[todayStr]) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (activity[dateStr]) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return currentStreak;
};

/**
 * Save topic-specific resources (notes, links, attachments) to Firestore
 * Uses a subcollection for scalability: users/{userId}/topicResources/{topicId}
 * @param {string} userId - User ID from Firebase Auth
 * @param {string} topicId - Normalized topic ID
 * @param {object} resources - Resources data { notes, links, attachments }
 */
export const saveTopicResources = async (userId, topicId, resources) => {
  try {
    const resourceDocRef = doc(db, COLLECTION_NAME, userId, TOPIC_RESOURCES_COLLECTION, topicId);
    await setDoc(resourceDocRef, {
      ...resources,
      lastUpdated: new Date().toISOString(),
    }, { merge: true });
    
    // Update cache
    topicCache[topicId] = resources;
  } catch (error) {
    console.error("Error saving topic resources:", error);
    throw error;
  }
};

/**
 * Get topic-specific resources from Firestore
 * @param {string} userId - User ID from Firebase Auth
 * @param {string} topicId - Normalized topic ID
 */
export const getTopicResources = async (userId, topicId) => {
  try {
    // Check cache first
    if (topicCache[topicId]) {
      return topicCache[topicId];
    }

    const resourceDocRef = doc(db, COLLECTION_NAME, userId, TOPIC_RESOURCES_COLLECTION, topicId);
    const resourceDoc = await getDoc(resourceDocRef);

    if (resourceDoc.exists()) {
      const data = resourceDoc.data();
      const resources = {
        notes: data.notes || "",
        links: data.links || [],
        attachments: data.attachments || []
      };
      // Update cache
      topicCache[topicId] = resources;
      return resources;
    }
    
    return { notes: "", links: [], attachments: [] };
  } catch (error) {
    console.error("Error getting topic resources:", error);
    return { notes: "", links: [], attachments: [] };
  }
};
/**
 * Upload a file to Firebase Storage and return the download URL
 * @param {string} userId - User ID from Firebase Auth
 * @param {string} topicId - Topic ID
 * @param {File} file - File object to upload
 * @param {function} onProgress - Optional callback for upload progress
 * @returns {Promise<string>} Download URL
 */
export const uploadTopicFile = (userId, topicId, file, onProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `users/${userId}/topics/${topicId}/attachments/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};
