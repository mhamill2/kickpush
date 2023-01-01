const dotenv = require('dotenv');
dotenv.config({ path: '../config/dev.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Get a list of the accounts to delete
stripe.accounts.list((error, accounts) => {
  if (error) {
    console.log(error);
  } else {
    // Delete each account
    accounts.data.forEach((account) => {
      stripe.accounts.del(account.id, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Account ${account.id} deleted successfully`);
        }
      });
    });
  }
});
