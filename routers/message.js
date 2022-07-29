const express = require('express');
const { User } = require('../models/user');
const Message = require('../models/message');
const auth = require('../middleware/auth/auth');

const router = new express.Router();

/**
 * @route   POST /sendMessage
 * @desc    Sends a message to another user
 */
router.post('/sendMessage/:receiverId', auth, async (req, res) => {
  const { text = '', attachments = [] } = req.body;
  const user = req.user;

  if (text.length === 0 && attachments.length === 0) {
    return res.status(422).json({ error: 'Cannot send empty messages' });
  }

  try {
    const receiver = await User.findById(req.params.receiverId);

    if (!receiver) {
      console.log('Error: Receiver of message not found: ', req.params.receiverId);
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.connections.includes(receiver._id)) {
      console.log(`Erorr: User ${user._id} attempted to send a message to a user they are not connected with: ${receiver._id}`);
      return res.status(401).json({ error: 'Cannot send messages to users that you are not connected to' });
    }

    const message = new Message({
      sender: user._id,
      receiver: receiver._id,
      text,
      attachments
    });

    await message.save();
    res.status(201).json({ data: message });
  } catch (err) {
    console.log('Faild to send message: ', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
