const User = require("./models/user.js");
const Door = require("./models/doors.js");
const DoorAccess = require("./models/doorAccess.js");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { username, name, email, phone, faceEmbedding } = req.body;
  try {
    if (!username || !name || !email || !phone || !faceEmbedding) {
      console.log("All fields required");
      return res.status(400).json("All fields are required");
    }
    const existinguser = await User.findOne({ username });
    if (existinguser) {
      console.log("Username exists");
      return res.status(409).json("Username already exists");
    }
    const user = new User({ username, name, email, phone, faceEmbedding });
    await user.save();
    res.json("Created user successfully");
  } catch (err) {
    console.log("Error in Create User: " + err);
    res.status(500).json(err);
  }
};


// Create a new door
const createDoor = async (req, res) => {
  const { name, location } = req.body;
  console.log("recieved : "+name+location);
  try {
    const door = new Door({
      name,
      location
    });
    await door.save();
    res.json("created door successfully");
  }
  catch (err) {
    console.log("Error in Create User " + err);
    res.status(500).json(err);
  }
}

// Create a new door access entry with hashed PIN
const createDoorAccess = async (req, res) => {
  const { username, doorName, plainPin } = req.body;
  console.log("Received:", username, doorName, plainPin);

  if (!username || !doorName || !plainPin) {
    return res.status(400).json("username, doorName and plainPin are required");
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json("User not found");

    const door = await Door.findOne({ name: doorName });
    if (!door) return res.status(404).json("Door not found");

    const saltRounds = 10;
    const hashedPin = await bcrypt.hash(plainPin, saltRounds);

    const doorAccess = new DoorAccess({
      userId: user._id,
      doorId: door._id,
      pin: hashedPin,
      isActive: true,
    });

    await doorAccess.save();
    res.status(201).json("Created door access successfully");
  } catch (err) {
    console.error("Error in Create DoorAccess:", err);
    res.status(500).json(err.message);
  }
};


module.exports = { createUser, createDoor, createDoorAccess };
