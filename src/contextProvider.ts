import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { type Firestore, getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import type { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';

// Initialize Firebase Admin SDK
const serviceAccount = require('./admin-service-account.json');

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db = getFirestore();
const auth = getAuth();

// Define the context interface
export interface Context {
  user: {
    id: string;
    role: string;
    managedTeams?: string[];
    // Add any other user properties you need
  } | null;
  db: Firestore;
}

export async function createContext({
  req,
}: StandaloneServerContextFunctionArgument): Promise<Context> {
  const context: Context = {
    user: null,
    db,
  };

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await auth.verifyIdToken(token);

      // Fetch additional user data from Firestore if needed
      const userDoc = await db.collection('users').doc(decodedToken.uid).get();
      const userData = userDoc.data();

      if (userData) {
        context.user = {
          id: decodedToken.uid,
          role: userData.role || 'user',
          managedTeams: userData.managedTeams || [],
          // Add other user properties as needed
        };
      }
    } catch (error) {
      console.error('Error verifying token', error);
    }
  }
  return context;
}
