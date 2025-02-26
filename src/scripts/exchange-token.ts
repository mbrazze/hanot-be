import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getToken, UserType } from './get-token';

// Your Firebase configuration (from your Firebase Console)
const firebaseConfig = {
  apiKey: 'AIzaSyDO3nbjNiB9yd2kabkc4Tz2tv3uX_PUN9Q',
  authDomain: 'hanot-7be51.firebaseapp.com',
  projectId: 'hanot-7be51',
  storageBucket: 'hanot-7be51.firebasestorage.app',
  messagingSenderId: '401200029407',
  appId: '1:401200029407:web:a70633dbb3f0771ad1936a',
  measurementId: 'G-CCZMCSGJLX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const userEmail = 'jrking88@gmail.com';
const userType = UserType.ADMIN;

async function exchangeToken() {
  const customToken = await getToken(userEmail, userType);

  try {
    // Sign in with custom token
    const userCredential = await signInWithCustomToken(auth, customToken);

    // Get the ID token
    const idToken = await userCredential.user.getIdToken();

    console.log('\nYour ID Token (use this for API requests):\n');
    console.log(idToken);
  } catch (error) {
    console.error('Error exchanging token:', error);
  }
}

exchangeToken();
