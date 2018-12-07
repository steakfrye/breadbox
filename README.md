# breadbox

Breadbox is a social network for writing and sharing bread recipes and routines.

Sourdough bread sounds simple at first. Just mix a sourdough culture of flour and water into more flour and water, add salt, then bake some hours later.
But to those of us who dove deep into it, we know it gets so much more complex than that. In order to get those boules proofed just right, you need to keep track of temperatures, percentages, weights, types of kneading, frequency of steps, timing, and even more temperatures!

The goal of this website is to allow users to record all of these variables.

## Quick Start

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

You will need to create a keys_dev.js in the server config folder with

```
module.exports = {
  mongoURI: 'YOUR_OWN_MONGO_URI',
  secretOrKey: 'YOUR_OWN_SECRET'
};
```

## App Info

### Author

Dylan Frye

### Version

1.0.0

### License

This project is licensed under the MIT License
