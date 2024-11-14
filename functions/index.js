const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore(); // Initialize Firestore
const app = express();


app.use(cors({origin: true})); // Allow CORS for all origins
app.use(express.json());

// Secret key for signing JWTs (use an environment variable in production)
const JWT_SECRET = "your_jwt_secret_key";

const verifyTokenAndRole = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(403).json({message: "Token required"});

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Attach user info to the request

      if (!decoded.role || decoded.role !== requiredRole) {
        return res.status(403).json({message:
          "Access denied: insufficient permissions"});
      }

      next();
    } catch (error) {
      res.status(403).json({message: "Invalid or expired token"});
    }
  };
};

// Register route
app.post("/register", async (req, res) => {
  const {email, password, role} = req.body;

  try {
    // Check if the user already exists
    const userRef = db.collection("users").doc(email);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      return res.status(400).json({message: "User already exists"});
    }

    // Hash the password and save user to Firestore
    const hashedPassword = await bcrypt.hash(password, 10);
    await userRef.set({email, password: hashedPassword, role});
    res.status(201).json({message: "User registered successfully"});
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({message: "Failed to register user"});
  }
});

// Login route
app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  console.log("Received login request for:", email);

  try {
    // Query Firestore for a document with the specified username
    const userQuery = db.collection("users").where("email", "==", email);
    const userSnapshot = await userQuery.get();
    console.log("checked db");

    // Check if a matching user document exists
    if (userSnapshot.empty) {
      console.log("checked empty");
      return res.status(401).json({message: "Invalid username or password"});
    }

    // Get the first matching document (assuming usernames are unique)
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    console.log("userDoc.data");
    console.log(userData.role);

    // Compare the provided password with the hashed password in Firestore
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    console.log("check password");

    if (!isPasswordCorrect) {
      return res.status(401).json({message: "Invalid username or password"});
    }

    // Create and sign a JWT token
    const token = jwt.sign({email, role: userData.role}, JWT_SECRET,
        {expiresIn: "1h"});
    res.json({token, role: userData.role});
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({message: "Failed to log in"});
  }
});

// Protected route that requires a valid JWT
app.get("/protected", verifyTokenAndRole("employee"), (req, res) => {
  res.json({message: `Hello, ${req.user.email}`, data: "Protected data"});
});

// Admin-only route that requires a valid JWT with the 'admin' role
app.get("/admin", verifyTokenAndRole("admin"), (req, res) => {
  res.json({message: "Hello, Admin", data: "Admin-only data"});
});

app.get("/users", async (req, res) => {
  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();

    if (snapshot.empty) {
      return res.status(404).json({message: "No users found"});
    }

    const users = [];
    snapshot.forEach((doc) => {
      users.push({id: doc.id, ...doc.data()});
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({message: "Failed to retrieve users"});
  }
});

// Export the Express app as a Cloud Function
exports.api = functions.https.onRequest(app);

