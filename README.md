[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmhamill2%2Fkickpush.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmhamill2%2Fkickpush?ref=badge_shield)

##### To get started, you'll need to configure the .env file. To do so, simply create a .env file in the config folder, and set the following properties:

```
PORT: the port number that the backend server will listen on
MONGODB_URL: the URL of the MongoDB database to connect to
JWT_SECRET: the secret key used to sign JSON Web Tokens (JWTs)
GOOGLE_API_KEY: the API key for the Google API that you are using
AWS_ACCESS_KEY_ID: the access key ID for your AWS account
AWS_SECRET_ACCESS_KEY: the secret access key for your AWS account
STRIPE_SECRET_KEY: the secret key for your Stripe account
```

##### Run dev environment

1. Run `npm ci` from both the top level directory and the client directory
2. Ensure that MongoDB is installed locally
3. Run `npm run dev`. This will start both the client and the server, as well as the local database.

#### Current state

The app is currently in an unfinished state. The following features are available:

1. Create an account
2. Search for instructors
3. Add connections
4. Schedule, update and cancel lessons
5. User profiles
6. Messaging
7. Instructors can add a method of payment

Additionally, only the mobile view has been started. The desktop view needs to be flushed out


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmhamill2%2Fkickpush.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmhamill2%2Fkickpush?ref=badge_large)