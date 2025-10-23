import Message from "../models/Message.js";

// Send message (already handled by Socket, but optional API)
export const sendMessage = async (req, res) => {
  try {
    const { from, to, text } = req.body;
    const message = new Message({ from, to, text });
    await message.save();
    res.status(201).json({ message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Get conversation between two users
export const getMessages = async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    const messages = await Message.find({
      $or: [
        { from: user1, to: user2 },
        { from: user2, to: user1 },
      ],
    }).sort({ createdAt: 1 }); // oldest to newest
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
