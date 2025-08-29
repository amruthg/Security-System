const User = require("./models/user.js");
const Door = require("./models/doors.js");
const DoorAccess = require("./models/doorAccess.js");
const bcrypt = require("bcrypt");

const verifyPin = async (req, res) => {
  const { username, doorName, plainPin } = req.body;
  console.log("Received for PIN verification:", username, doorName);

  if (!username || !doorName || !plainPin) {
    return res.status(400).json("username, doorName and plainPin are required");
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json("User not found");

    const door = await Door.findOne({ name: doorName });
    if (!door) return res.status(404).json("Door not found");

    const doorAccess = await DoorAccess.findOne({
      userId: user._id,
      doorId: door._id,
      isActive: true
    });
    if (!doorAccess) return res.status(404).json("Access failed for this user and door");

    const isPinCorrect = await bcrypt.compare(plainPin, doorAccess.pin);
    if (isPinCorrect) {
      return res.status(200).json("PIN verified successfully");
    } else {
      return res.status(401).json("Incorrect PIN");
    }
  } catch (err) {
    console.error("Error in verifyPin:", err);
    res.status(500).json(err.message);
  }
};

module.exports = { verifyPin };
