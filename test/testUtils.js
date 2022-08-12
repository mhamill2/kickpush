require('../db/db');
const { User } = require('../models/user');

router.get('/deleteAllTokens', async (req, res) => {
  try {
    const users = await User.find({});
    users.forEach(async (user) => {
      user.tokens = [];
      await user.save();
    });
    res.send('Deleted all tokens');
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});
