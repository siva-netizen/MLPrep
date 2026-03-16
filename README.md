# 🧠 AI/ML Study Tracker

A modern, interactive study tracking application for mastering AI and ML concepts. Built with React, Firebase, Tailwind CSS, and Framer Motion.

## ✨ Features

### 🔐 **User Authentication**
- Sign up / Sign in with email and password
- Secure authentication via Firebase Auth
- Session persistence across browser sessions
- Logout functionality

### 📊 **Animated Progress Tracker**
- Real-time progress visualization
- Smooth animations using Framer Motion
- Displays completion percentage and topic count
- Automatically updates as you mark topics

### 🎨 **Beautiful Topic Cards**
- 100+ AI/ML topics with custom styling
- Unique gradient overlays and background images
- Interactive buttons (Mark Done, Open Notes, Add Link, Add Attachment)
- Completion checkmarks for finished topics
- Hover animations for enhanced UX

### 💾 **Firebase Integration**
- Cloud-based progress storage with Firestore
- Automatic progress syncing
- Debounced saves (500ms) for performance
- Real-time data persistence

### 📚 **Comprehensive Curriculum**
Covers three main areas:
- **Mathematics for Machine Learning** (Linear Algebra, Calculus, Numerical Methods)
- **Machine Learning** (Supervised/Unsupervised Learning, Ensemble Methods)
- **Deep Learning** (Neural Networks, Backpropagation, Activation Functions)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Firebase project with credentials

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
# Copy the provided .env file with your Firebase credentials
# Do NOT commit .env to git!

# 3. Start development server
npm run dev
```

The app will open at `http://localhost:5173`

## 📖 Application Flow

### 1. Authentication
```
User Opens App
    ↓
Check if Logged In?
    ├─ NO → Show Auth Page
    │    ├─ Sign Up: Create new account + Firestore doc
    │    └─ Sign In: Load existing user's progress
    └─ YES → Load Dashboard
```

### 2. Progress Tracking
```
User Checks Topic Checkbox
    ↓
Update Local State
    ↓
Debounce 500ms
    ↓
Save to Firestore
    ↓
Progress Card Animates
```

### 3. Data Sync
```
On App Load
    ↓
Fetch User from Firebase Auth
    ↓
Load Progress from Firestore
    ↓
Update UI with Saved Progress
    ↓
Listen for Real-time Updates
```

## 🏗️ Architecture

### Components

#### `AuthPage.jsx`
Login and registration interface
- Email/password fields
- Sign up / Sign in toggle
- Error handling

#### `ml_ai_study_tracker.jsx` (Main)
Core dashboard component
- Manages authentication state
- Handles progress updates
- Renders curriculum sections
- Controls Firebase sync

#### `TopicCard` (`components/ui/topic-card.tsx`)
Individual topic display card
- Shows topic with gradient background
- Interactive action buttons
- Completion status indicator
- Responsive hover effects

#### `AnimatedProgressCard` (`components/ui/progress-card.tsx`)
Progress visualization component
- Animated progress bar
- Percentage display
- Topic counter
- Smooth transitions

### Utilities

#### `firebaseConfig.js`
Firebase initialization
- Loads credentials from `.env`
- Initializes Auth and Firestore
- Exports auth and db instances

#### `firestoreUtils.js`
Database operations
- `saveUserProgress()` - Save progress to Firestore
- `getUserProgress()` - Load progress from Firestore
- `initializeUserDocument()` - Create new user doc
- Functions for curriculum management

#### `topicStyling.js`
Topic customization
- 100+ topics with unique styling
- Gradient colors and Unsplash images
- `getTopicStyling()` helper function

#### `utils.js`
Utility functions
- `cn()` - Merge Tailwind classes
- Uses clsx and tailwind-merge

## 📊 Data Structure

### Firestore Schema
```
firestore/
├── users/{userId}/
│   ├── email: "user@example.com"
│   ├── createdAt: Timestamp
│   ├── progress: {
│   │   "Vector spaces": true,
│   │   "Eigenvalues": false,
│   │   ... (all topics as boolean)
│   │ }
│   └── lastUpdated: Timestamp
└── curriculum/
    └── ml_ai_curriculum/
        ├── data: { curriculum object }
        └── updatedAt: Timestamp
```

## 🎨 Design System

### Color Palette
- **Primary**: Green (progress, success)
- **Secondary**: Blue/Purple (categories)
- **Gradients**: Topic-specific colors for visual organization
- **Backgrounds**: Unsplash images for each topic

### Typography
- **Headings**: Bold, large (3xl - 2xl)
- **Body**: Medium weight (500-600)
- **Labels**: Semibold, uppercase tracking

### Spacing
- Card padding: 6 units (24px)
- Gap between items: 4-6 units
- Max width: 7xl for content

### Animations
- Progress bar: 1.2s easeInOut
- Card entrance: 0.5s opacity + Y translation
- Hover effects: Scale (1.04x), shadow increase

## 🔐 Security

### Authentication
- Firebase Auth handles password security
- No passwords stored in frontend
- Session tokens managed by Firebase

### Database Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Curriculum is readable by authenticated users
    match /curriculum/{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

## 📱 Responsive Design

| Device | Layout |
|--------|--------|
| Mobile (<640px) | 1 column, stacked |
| Tablet (640-1024px) | 2 columns |
| Desktop (>1024px) | 3 columns |

## 🔄 State Management

### Local State
```javascript
const [user, setUser] = useState(null);           // Current user
const [checked, setChecked] = useState({});       // Topic completion
const [openSections, setOpenSections] = useState({}); // Expanded sections
const [loading, setLoading] = useState(true);     // Loading state
```

### Derived State
```javascript
const completed = Object.values(checked).filter(Boolean).length;
const progress = (completed / totalTopics) * 100;
```

## 🛠️ Build & Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel**: `vercel deploy`
- **Netlify**: Connect GitHub repo
- **Firebase Hosting**: `firebase deploy`
- **Traditional Server**: Copy `dist/` folder

## 🧪 Testing

### Manual Testing Checklist
- [ ] Sign up creates new user
- [ ] Sign in loads existing user
- [ ] Checking topic updates progress
- [ ] Progress saves to Firestore
- [ ] Progress loads on refresh
- [ ] Logout clears data
- [ ] Cards animate on hover
- [ ] Progress bar animates
- [ ] Mobile layout works
- [ ] Images load properly

### Browser DevTools
1. **Console**: Check for errors
2. **Network**: Verify Firebase requests
3. **Application**: Check localStorage
4. **Elements**: Inspect animations

## 📈 Performance Optimization

### Debouncing
- Progress saves debounced at 500ms
- Prevents excessive Firestore writes
- Improves app responsiveness

### Code Splitting
- Components imported on-demand
- Lazy loading for large lists
- Minimal initial bundle size

### Image Optimization
- Unsplash images optimized (400x300, q=75)
- Using responsive image URLs
- CDN delivery for fast loading

## 🐛 Troubleshooting

### Common Issues

**Problem**: "Firebase not initialized"
- **Solution**: Check `.env` has correct credentials

**Problem**: "Progress not saving"
- **Solution**: Check Firestore rules, user auth status

**Problem**: "Styles not applying"
- **Solution**: Ensure Tailwind CSS is configured

**Problem**: "Images not loading"
- **Solution**: Check Unsplash URLs, HTTPS requirement

**Problem**: "Animations stuttering"
- **Solution**: Ensure GPU acceleration enabled, reduce motion if needed

## 📚 API Reference

### Authentication
```javascript
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Sign up
await createUserWithEmailAndPassword(auth, email, password);

// Sign in
await signInWithEmailAndPassword(auth, email, password);

// Sign out
await signOut(auth);
```

### Firestore Operations
```javascript
import { saveUserProgress, getUserProgress } from "./firestoreUtils";

// Save progress
await saveUserProgress(userId, progressData);

// Get progress
const progress = await getUserProgress(userId);
```

## 🔮 Future Features

- [ ] Progress history charts (weekly/monthly)
- [ ] Achievement badges for milestones
- [ ] Streak counter for consecutive days
- [ ] Export progress as PDF
- [ ] Share progress with friends
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Collaborative learning groups
- [ ] AI-powered study recommendations
- [ ] Quiz generation from topics

## 📞 Support & Feedback

For issues or feature requests:
1. Check the troubleshooting guide
2. Review Firebase console logs
3. Check browser DevTools console
4. Open an issue with:
   - Error message
   - Steps to reproduce
   - Browser/OS info
   - Screenshot if applicable

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Firebase**: Backend infrastructure
- **Framer Motion**: Animation library
- **Tailwind CSS**: Styling framework
- **Lucide React**: Icon library
- **Unsplash**: Free stock images
- **shadcn/ui**: Component inspiration

## 🚀 Let's Get Started!

Your learning journey starts here. Sign up, pick a topic, and start tracking your progress toward mastering AI and ML!

### Next Steps:
1. [Installation Guide](./INSTALLATION_GUIDE.md)
2. [Progress Tracker Guide](./PROGRESS_TRACKER_GUIDE.md)
3. [Setup Guide](./SETUP_GUIDE.md)

---

**Built with ❤️ for AI/ML learners**
#   M L P r e p  
 