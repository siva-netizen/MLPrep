# ML/AI Study Tracker

A comprehensive web application for tracking and organizing your Machine Learning and Artificial Intelligence learning journey. This interactive platform provides a structured curriculum covering mathematics, machine learning fundamentals, and deep learning concepts with progress tracking capabilities.

## Overview

ML/AI Study Tracker is a React-based study companion that helps learners systematically progress through essential ML/AI topics. The application features an intuitive interface with topic cards, progress visualization, and persistent user data storage through Firebase.

## Features

- **Structured Curriculum**: Organized learning paths covering Mathematics for Machine Learning, Machine Learning Fundamentals, Advanced Machine Learning, and Deep Learning
- **Progress Tracking**: Visual progress indicators and completion status for each topic
- **User Authentication**: Secure sign-in with Firebase Authentication
- **Persistent Storage**: User progress automatically saved to Firestore database
- **Interactive UI**: Modern, responsive design built with React and Tailwind CSS
- **Topic Details**: Expandable topic cards with detailed subtopic breakdowns
- **Real-time Updates**: Activity tracking and progress synchronization across sessions

## Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Radix UI, Lucide React
- **Backend**: Firebase (Authentication, Firestore)
- **Language**: JavaScript/JSX with TypeScript support
- **Build Tool**: Vite

## Curriculum Coverage

The application includes comprehensive coverage of:

- **Mathematics for Machine Learning**: Linear Algebra, Matrix Algebra, Calculus, Numerical Methods
- **Machine Learning**: Supervised Learning, Unsupervised Learning, Ensemble Methods, Model Selection
- **Deep Learning**: Neural Networks, Activation Functions, Backpropagation, Gradient Descent

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Firebase project with Authentication and Firestore enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/siva-netizen/MLPrep.git
cd MLPrep
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a `.env` file based on `.env.example`
   - Add your Firebase configuration credentials

4. Run the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Deployment

This application is deployed on Vercel and accessible at the production URL.

## Project Structure

```
MLPrep/
├── components/          # React components
│   ├── ui/             # UI components (cards, buttons, etc.)
│   └── pages/          # Page components
├── lib/                # Utility functions
├── curriculum.json     # Learning curriculum data
├── firebaseConfig.js   # Firebase configuration
├── firestoreUtils.js   # Firestore database utilities
├── ml_ai_study_tracker.jsx  # Main application component
└── main.jsx           # Application entry point
```

## License

This project is available for personal use.

## Contributing

This is a personal project. For issues or suggestions, please open an issue in the repository.