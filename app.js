// Core Module
const path = require('path');

// External Modules
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config(); // Load .env variables

// Local Modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const bookingRoutes = require('./routes/bookings');

const app = express();

// MongoDB URI and PORT from .env
const DB_PATH = process.env.DB_PATH;
const PORT = process.env.PORT || 3000;

// MongoDB session store
const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});

// Utility to generate random file names
const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerOptions = { storage, fileFilter };

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer(multerOptions).single('photo'));
app.use(express.static(path.join(rootDir, 'public')));
app.use("/uploads", express.static(path.join(rootDir, 'uploads')));
app.use("/host/uploads", express.static(path.join(rootDir, 'uploads')));
app.use("/homes/uploads", express.static(path.join(rootDir, 'uploads')));

// Session config
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: true,
  store
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Set login status for routes
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

// Routes
app.use(authRouter);
app.use(storeRouter);
app.use(bookingRoutes);

app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

// 404 Page
app.use(errorsController.pageNotFound);

// MongoDB Connection & Server Start
mongoose.connect(DB_PATH)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log('MongoDB connection error:', err);
  });
