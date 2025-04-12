const { GoogleAuth } = require('google-auth-library');

// יצירת אובייקט אימות בעזרת קובץ ה-JSON של Service Account
const auth = new GoogleAuth({
  keyFile: './src/secrets/munchly.json',
  scopes: 'https://www.googleapis.com/auth/cloud-platform',
});

async function getAccessToken() {
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  console.log('Access Token:', accessToken);
}

getAccessToken();
