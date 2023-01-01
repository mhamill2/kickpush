const dotenv = require('dotenv');
dotenv.config({ path: '../config/dev.env' });

const MongoClient = require('mongodb').MongoClient;

const MONGODB_URL = process.env.MONGODB_URL;

console.log(`This script will delete the "stripeAccountId" field from all users in the "users" collection of the database at ${MONGODB_URL}.`);
console.log('Are you sure you want to continue? (y/n)');

process.stdin.resume();
process.stdin.on('data', (data) => {
  if (data.toString().trim() === 'y') {
    // Connect to the MongoDB server
    MongoClient.connect(MONGODB_URL, { useUnifiedTopology: true }, (error, client) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Connected to MongoDB server');

        // Get a reference to the "users" collection
        const users = client.db('kickpush').collection('users');

        // Delete the "stripeAccountId" field from all users
        users.updateMany({}, { $unset: { stripeAccountId: '' } }, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Successfully deleted the "stripeAccountId" field from all users');
          }

          // Close the connection to the MongoDB server
          client.close();
          process.stdin.pause();
        });
      }
    });
  } else {
    console.log('Operation cancelled');
    process.exit();
  }
});
