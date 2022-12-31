const express = require('express');
const auth = require('../middleware/auth/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = new express.Router();

router.get('/getStripeAccount', auth, async (req, res) => {
  const user = req.user;

  if (user.accountType !== 'instructor') {
    console.log(`User ${user._id} - ${user.email} is not an instructor`);
    return res.status(403).json({ error: 'User is not an instructor' });
  }

  if (!user.stripeAccountId) {
    return res.status(200).json(null);
  }

  try {
    const account = await stripe.accounts.retrieve(user.stripeAccountId);
    res.status(200).json({ account });
  } catch (err) {
    console.log('Failed to get stripe account: ', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/getStripeAccountLink', auth, async (req, res) => {
  const user = req.user;

  if (user.accountType !== 'instructor') {
    console.log(`User ${user._id} - ${user.email} is not an instructor`);
    return res.status(403).json({ error: 'User is not an instructor' });
  }

  if (!user.stripeAccountId) {
    try {
      await createStripeAccount(user);
    } catch (err) {
      console.log('Failed to create stripe account: ', err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  try {
    const accountLink = await stripe.accountLinks.create({
      account: user.stripeAccountId,
      refresh_url: 'http://localhost:3000/payments',
      return_url: 'http://localhost:3000/payments',
      type: 'account_onboarding'
    });

    res.status(200).json({ accountLink });
  } catch (err) {
    console.log('Failed to create stripe account link: ', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const createStripeAccount = async (user) => {
  let account;

  try {
    account = await stripe.accounts.create({
      type: 'express',
      country: 'US',
      email: user.email,
      business_type: 'individual',
      business_profile: {
        product_description: 'KickPush lessons'
      }
    });

    user.stripeAccountId = account.id;
    await user.save();
  } catch (err) {
    console.log('Failed to create stripe account: ', err);

    if (account && account.id) {
      try {
        await stripe.accounts.del(account.id);
      } catch (err) {
        console.log('Failed to delete stripe account: ', err);
      }
    }

    throw err;
  }
};

module.exports = router;
