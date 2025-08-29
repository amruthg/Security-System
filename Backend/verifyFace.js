const User = require("./models/user.js");
const Door = require("./models/doors.js");
const DoorAccess = require("./models/doorAccess.js");

// Helper function to compare two arrays exactly
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const verifyFace = async (req, res) => {
  const { faceEmbedding, doorName } = req.body;
  console.log("Received for verification");

  if (!faceEmbedding || !doorName) {
    return res.status(400).json("All fields are required");
  }

  try {
    const door = await Door.findOne({ name: doorName });
    if (!door) return res.status(404).json("Door not found");

    const doorAccessDocs = await DoorAccess.find({ doorId: door._id, isActive: true }).select('userId');

    const userIds = doorAccessDocs.map(doc => doc.userId);

    const users = await User.find({ _id: { $in: userIds } }).select('username faceEmbedding');

    // Check for exact match of embeddings
    for (const user of users) {
      if (arraysEqual(user.faceEmbedding, faceEmbedding)) {
        console.log("Face matched with : "+ user.username);
        return res.status(200).json({
          message: "Face matched",
          username: user.username
        });
      }
    }

    return res.status(401).json("Face not recognized for this door");
  } catch (err) {
    console.error("Error in verifyFace:", err);
    res.status(500).json(err.message);
  }
};

module.exports = { verifyFace };
