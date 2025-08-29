const express = require('express');
const router = express.Router();
const { createUser, createDoor, createDoorAccess } = require('./create');
const multer = require("multer");
const { verifyFace } = require('./verifyFace');
const { verifyPin } = require('./verifyPin');

const upload = multer({ dest: 'uploads/' }); // For face images

// router.post("/doors", handleDoors);
// router.post("/login", upload.single('face'), login); // expects 'face'
// router.post("/signup", upload.single('face'), createUser);
router.post("/cuser",createUser);
router.post("/cdoor",createDoor);
router.post("/cdaccess",createDoorAccess);
router.post("/verifyFace",verifyFace);
router.post("/verifyPin",verifyPin);

module.exports = router;