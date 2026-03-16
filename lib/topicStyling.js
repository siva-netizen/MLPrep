/**
 * Topic styling configuration with gradients and images
 * Maps topic names to beautiful gradients and relevant Unsplash images
 */

const topicStyling = {
  // Linear Algebra
  "Vector spaces": {
    gradient: "from-blue-600/70 to-cyan-600/70",
    image: "https://images.unsplash.com/photo-1635070041078-e3cea2d128cd?w=400&h=300&fit=crop",
  },
  "Linear dependence and independence": {
    gradient: "from-indigo-600/70 to-purple-600/70",
    image: "https://images.unsplash.com/photo-1518611505868-d0a1b5f89da1?w=400&h=300&fit=crop",
  },
  "Subspaces": {
    gradient: "from-violet-600/70 to-indigo-600/70",
    image: "https://images.unsplash.com/photo-1575089141050-edad764ce34f?w=400&h=300&fit=crop",
  },
  "Basis and dimension": {
    gradient: "from-purple-600/70 to-pink-600/70",
    image: "https://images.unsplash.com/photo-1634062909811-582fda55df80?w=400&h=300&fit=crop",
  },
  "Linear transformations": {
    gradient: "from-pink-600/70 to-rose-600/70",
    image: "https://images.unsplash.com/photo-1633356713697-d90c07025caf?w=400&h=300&fit=crop",
  },
  "Rank and nullity": {
    gradient: "from-red-600/70 to-orange-600/70",
    image: "https://images.unsplash.com/photo-1611080626919-812cf6b7863f?w=400&h=300&fit=crop",
  },
  "Inner product spaces": {
    gradient: "from-orange-600/70 to-yellow-600/70",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
  },
  "Cauchy–Schwarz inequality": {
    gradient: "from-yellow-600/70 to-lime-600/70",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70a504f6?w=400&h=300&fit=crop",
  },
  "Orthogonal basis": {
    gradient: "from-lime-600/70 to-green-600/70",
    image: "https://images.unsplash.com/photo-1509438773649-da7094e8b466?w=400&h=300&fit=crop",
  },
  "Gram–Schmidt orthogonalization": {
    gradient: "from-green-600/70 to-emerald-600/70",
    image: "https://images.unsplash.com/photo-1624253471633-1f7ca89e1f43?w=400&h=300&fit=crop",
  },

  // Matrix Algebra
  "Eigenvalues": {
    gradient: "from-teal-600/70 to-cyan-600/70",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
  },
  "Eigenvectors": {
    gradient: "from-cyan-600/70 to-blue-600/70",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop",
  },
  "Cayley–Hamilton theorem": {
    gradient: "from-blue-600/70 to-indigo-600/70",
    image: "https://images.unsplash.com/photo-1606896834934-ffe3ba2838df?w=400&h=300&fit=crop",
  },
  "Matrix diagonalization": {
    gradient: "from-indigo-600/70 to-purple-600/70",
    image: "https://images.unsplash.com/photo-1596526131083-e8b9ff1286b8?w=400&h=300&fit=crop",
  },
  "Quadratic form reduction": {
    gradient: "from-purple-600/70 to-pink-600/70",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
  },
  "Sparse matrices": {
    gradient: "from-pink-600/70 to-rose-600/70",
    image: "https://images.unsplash.com/photo-1551431009-381d36ac3a14?w=400&h=300&fit=crop",
  },
  "Permutation matrices": {
    gradient: "from-rose-600/70 to-red-600/70",
    image: "https://images.unsplash.com/photo-1504978344cb40be30a592cb0a3566cba25e46381?w=400&h=300&fit=crop",
  },
  "Hessenberg matrices": {
    gradient: "from-red-600/70 to-orange-600/70",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  },

  // Calculus for ML (orange/amber tones)
  "Limits and continuity": {
    gradient: "from-amber-600/70 to-yellow-600/70",
    image: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=400&h=300&fit=crop",
  },
  "Derivatives": {
    gradient: "from-yellow-600/70 to-lime-600/70",
    image: "https://images.unsplash.com/photo-1633356313518-cf19a26fb4d4?w=400&h=300&fit=crop",
  },
  "Extreme values of functions": {
    gradient: "from-lime-600/70 to-green-600/70",
    image: "https://images.unsplash.com/photo-1606857521604-40d08b938a42?w=400&h=300&fit=crop",
  },
  "Partial derivatives": {
    gradient: "from-green-600/70 to-emerald-600/70",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70a504f6?w=400&h=300&fit=crop",
  },
  "Jacobians": {
    gradient: "from-emerald-600/70 to-teal-600/70",
    image: "https://images.unsplash.com/photo-1509438773649-da7094e8b466?w=400&h=300&fit=crop",
  },
  "Hessian matrix": {
    gradient: "from-teal-600/70 to-cyan-600/70",
    image: "https://images.unsplash.com/photo-1634062909811-582fda55df80?w=400&h=300&fit=crop",
  },
  "Lagrange multipliers": {
    gradient: "from-cyan-600/70 to-blue-600/70",
    image: "https://images.unsplash.com/photo-1655635643916-e59b2dd08e00?w=400&h=300&fit=crop",
  },

  // Numerical Methods (sea colors)
  "Bisection method": {
    gradient: "from-blue-600/70 to-indigo-600/70",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=400&h=300&fit=crop",
  },
  "Newton Raphson method": {
    gradient: "from-indigo-600/70 to-purple-600/70",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
  },
  "Interpolation methods": {
    gradient: "from-purple-600/70 to-pink-600/70",
    image: "https://images.unsplash.com/photo-1578572933382-67d440642117?w=400&h=300&fit=crop",
  },
  "Numerical integration": {
    gradient: "from-pink-600/70 to-rose-600/70",
    image: "https://images.unsplash.com/photo-1580776579206-4e28e85e9a06?w=400&h=300&fit=crop",
  },
  "Numerical solution of differential equations": {
    gradient: "from-rose-600/70 to-red-600/70",
    image: "https://images.unsplash.com/photo-1634022876432-4f0e9f8e0a4b?w=400&h=300&fit=crop",
  },

  // Machine Learning topics (green/emerald tones)
  "Regression": {
    gradient: "from-green-600/70 to-emerald-600/70",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  },
  "Linear regression": {
    gradient: "from-emerald-600/70 to-teal-600/70",
    image: "https://images.unsplash.com/photo-1526374965328-7f5ae4e8e49e?w=400&h=300&fit=crop",
  },
  "Polynomial regression": {
    gradient: "from-teal-600/70 to-cyan-600/70",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  "Classification": {
    gradient: "from-cyan-600/70 to-blue-600/70",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
  },
  "Logistic regression": {
    gradient: "from-blue-600/70 to-indigo-600/70",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
  },
  "Decision trees": {
    gradient: "from-indigo-600/70 to-purple-600/70",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
  },
  "Support vector machines": {
    gradient: "from-purple-600/70 to-pink-600/70",
    image: "https://images.unsplash.com/photo-1516552577784-b82b08f4b6bb?w=400&h=300&fit=crop",
  },
  "k-nearest neighbors": {
    gradient: "from-pink-600/70 to-rose-600/70",
    image: "https://images.unsplash.com/photo-1508384867526-a3ab1aa0416f?w=400&h=300&fit=crop",
  },
  "Overfitting": {
    gradient: "from-rose-600/70 to-red-600/70",
    image: "https://images.unsplash.com/photo-1495592822108-9e6261896da8?w=400&h=300&fit=crop",
  },
  "Underfitting": {
    gradient: "from-red-600/70 to-orange-600/70",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
  },
  "Cross validation": {
    gradient: "from-orange-600/70 to-amber-600/70",
    image: "https://images.unsplash.com/photo-1551430782-9c037cb4f32a?w=400&h=300&fit=crop",
  },
  "Bias variance tradeoff": {
    gradient: "from-amber-600/70 to-yellow-600/70",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=300&fit=crop",
  },

  // Unsupervised Learning (teal/turquoise)
  "Clustering": {
    gradient: "from-teal-600/70 to-cyan-600/70",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
  },
  "k-means clustering": {
    gradient: "from-cyan-600/70 to-blue-600/70",
    image: "https://images.unsplash.com/photo-1460925895917-adf4e565e479?w=400&h=300&fit=crop",
  },
  "Hierarchical clustering": {
    gradient: "from-blue-600/70 to-indigo-600/70",
    image: "https://images.unsplash.com/photo-1551431009-381d36ac3a14?w=400&h=300&fit=crop",
  },
  "Density based clustering": {
    gradient: "from-indigo-600/70 to-purple-600/70",
    image: "https://images.unsplash.com/photo-1583291215763-bf63dcc50810?w=400&h=300&fit=crop",
  },
  "Dimensionality reduction": {
    gradient: "from-purple-600/70 to-pink-600/70",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
  },
  "Principal component analysis": {
    gradient: "from-pink-600/70 to-rose-600/70",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=300&fit=crop",
  },
  "Association rule learning": {
    gradient: "from-rose-600/70 to-red-600/70",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=300&fit=crop",
  },

  // Ensemble methods (warm colors)
  "Bagging": {
    gradient: "from-red-600/70 to-orange-600/70",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=400&h=300&fit=crop",
  },
  "Random forest": {
    gradient: "from-orange-600/70 to-amber-600/70",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
  },
  "Boosting": {
    gradient: "from-amber-600/70 to-yellow-600/70",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop",
  },
  "AdaBoost": {
    gradient: "from-yellow-600/70 to-lime-600/70",
    image: "https://images.unsplash.com/photo-1518611505868-d0a1b5f89da1?w=400&h=300&fit=crop",
  },
  "Gradient boosting": {
    gradient: "from-lime-600/70 to-green-600/70",
    image: "https://images.unsplash.com/photo-1460925895917-adf4e565e479?w=400&h=300&fit=crop",
  },

  // Model selection (blue tones)
  "Training validation testing split": {
    gradient: "from-blue-600/70 to-indigo-600/70",
    image: "https://images.unsplash.com/photo-1553531889-e6cf12d18d16?w=400&h=300&fit=crop",
  },
  "Cross validation strategies": {
    gradient: "from-indigo-600/70 to-purple-600/70",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
  },
  "Evaluation metrics": {
    gradient: "from-purple-600/70 to-pink-600/70",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70a504f6?w=400&h=300&fit=crop",
  },

  // Hyperparameter tuning (violet tones)
  "Grid search": {
    gradient: "from-purple-600/70 to-pink-600/70",
    image: "https://images.unsplash.com/photo-1633356313518-cf19a26fb4d4?w=400&h=300&fit=crop",
  },
  "Random search": {
    gradient: "from-pink-600/70 to-rose-600/70",
    image: "https://images.unsplash.com/photo-1606896834934-ffe3ba2838df?w=400&h=300&fit=crop",
  },
  "Bayesian optimization": {
    gradient: "from-rose-600/70 to-red-600/70",
    image: "https://images.unsplash.com/photo-1617638924702-92f37fc6014d?w=400&h=300&fit=crop",
  },
  "Early stopping": {
    gradient: "from-red-600/70 to-orange-600/70",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop",
  },

  // Deep Learning - Neural Networks (deep blue/neural colors)
  "Perceptron": {
    gradient: "from-slate-600/70 to-slate-700/70",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
  },
  "Weighted sum": {
    gradient: "from-slate-700/70 to-slate-800/70",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
  },
  "Bias term": {
    gradient: "from-slate-800/70 to-blue-900/70",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
  },
  "Neuron output": {
    gradient: "from-blue-900/70 to-blue-800/70",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop",
  },

  // Activation functions (rainbow)
  "Sigmoid": {
    gradient: "from-red-600/70 to-orange-600/70",
    image: "https://images.unsplash.com/photo-1611080626919-812cf6b7863f?w=400&h=300&fit=crop",
  },
  "Tanh": {
    gradient: "from-orange-600/70 to-yellow-600/70",
    image: "https://images.unsplash.com/photo-1612198188060-c7fb86d1b51b?w=400&h=300&fit=crop",
  },
  "ReLU": {
    gradient: "from-yellow-600/70 to-green-600/70",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
  },
  "Softmax": {
    gradient: "from-green-600/70 to-cyan-600/70",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop",
  },
  "Leaky ReLU": {
    gradient: "from-cyan-600/70 to-blue-600/70",
    image: "https://images.unsplash.com/photo-1493145552615-2ab5e4dd4baa?w=400&h=300&fit=crop",
  },

  // Feedforward networks (deep purple)
  "Input layer": {
    gradient: "from-blue-600/70 to-indigo-600/70",
    image: "https://images.unsplash.com/photo-1526374965328-7f5ae4e8e49e?w=400&h=300&fit=crop",
  },
  "Hidden layers": {
    gradient: "from-indigo-600/70 to-purple-600/70",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop",
  },
  "Output layer": {
    gradient: "from-purple-600/70 to-pink-600/70",
    image: "https://images.unsplash.com/photo-1591290621437-db8c0b7c0a14?w=400&h=300&fit=crop",
  },
  "Forward propagation": {
    gradient: "from-pink-600/70 to-rose-600/70",
    image: "https://images.unsplash.com/photo-1488522871842-f048f0ac6b6a?w=400&h=300&fit=crop",
  },

  // Backpropagation (coral/salmon)
  "Error calculation": {
    gradient: "from-rose-600/70 to-red-600/70",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&h=300&fit=crop",
  },
  "Gradient computation": {
    gradient: "from-red-600/70 to-orange-600/70",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70a504f6?w=400&h=300&fit=crop",
  },
  "Chain rule": {
    gradient: "from-orange-600/70 to-amber-600/70",
    image: "https://images.unsplash.com/photo-1506361197048-46a72bb9e929?w=400&h=300&fit=crop",
  },
  "Weight updates": {
    gradient: "from-amber-600/70 to-yellow-600/70",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop",
  },

  // Gradient descent (sunset)
  "Batch gradient descent": {
    gradient: "from-yellow-600/70 to-lime-600/70",
    image: "https://images.unsplash.com/photo-1596394406318-be2fe7c37c1f?w=400&h=300&fit=crop",
  },
  "Stochastic gradient descent": {
    gradient: "from-lime-600/70 to-green-600/70",
    image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=400&h=300&fit=crop",
  },
  "Mini batch gradient descent": {
    gradient: "from-green-600/70 to-emerald-600/70",
    image: "https://images.unsplash.com/photo-1580625916550-2173dba999ef?w=400&h=300&fit=crop",
  },
  "Learning rate": {
    gradient: "from-emerald-600/70 to-teal-600/70",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&h=300&fit=crop",
  },
};

/**
 * Get styling for a topic
 * Falls back to a default if topic not found
 */
export function getTopicStyling(topicName) {
  return (
    topicStyling[topicName] || {
      gradient: "from-slate-600/70 to-slate-700/70",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    }
  );
}
