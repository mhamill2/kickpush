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

router.get('/getMessages', auth, async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: req.user._id }, { receiver: req.user._id }]
        }
      },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ['$sender', req.user._id] }, '$receiver', '$sender']
          },
          message: { $last: '$$ROOT' }
        }
      }
    ]);

    // populate the sender and receiver fields
    const populatedMessages = await Message.populate(messages, {
      path: 'message.sender message.receiver',
      select: 'firstName lastName avatar',
      model: 'User'
    });

    res.status(200).json(messages);
  } catch (err) {
    console.log('Failed to get messages: ', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/getConversation/:userId', auth, async (req, res) => {
  try {
    let messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id }
      ]
    });

    messages = await Message.populate(messages, {
      path: 'sender receiver',
      select: 'firstName lastName avatar',
      model: 'User'
    });

    res.status(200).json(messages);
  } catch (err) {
    console.log('Failed to get conversation: ', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
