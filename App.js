// server/app.js
const express = require('express');
const axios = require('axios');
const firebaseAdmin = require('firebase-admin');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(cookieParser());

const port = process.env.PORT || 3001;

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/your-firebase-adminsdk.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

// Google OAuth URLs
const redirectUri = 'http://localhost:3001/callback';
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

// Route to handle Google OAuth login
app.get('/login', (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
  res.redirect(url);
});

// Callback route after Google OAuth
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    // Exchange authorization code for tokens
    const { data } = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }
    );

    const { access_token } = data;

    // Get user information from Google
    const userInfo = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const user = userInfo.data;

    // Generate custom token for Firebase
    const firebaseToken = await firebaseAdmin.auth().createCustomToken(user.id);

    // Set Firebase token in cookies (or send it back to the client)
    res.cookie('firebaseToken', firebaseToken, { httpOnly: true });
    res.redirect('http://localhost:3001'); // Redirect back to React app
  } catch (error) {
    console.error('Error exchanging token:', error);
    res.status(500).send('Authentication failed');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
