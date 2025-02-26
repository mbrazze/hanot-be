import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { type Firestore, getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import type { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import { UserTypeMap, userCollectionNameFromUserType } from '../user/utils';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const ADMIN_SDK_FILE_PATH = process.env.FIREBASE_ADMIN_SDK_PATH || ``;

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (!ADMIN_SDK_FILE_PATH) {
  throw new Error('FIREBASE_ADMIN_SDK_PATH environment variable not set');
}

// Read and parse the service account file
const serviceAccount = JSON.parse(
  readFileSync(ADMIN_SDK_FILE_PATH, 'utf-8')
) as ServiceAccount;

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });
const auth = getAuth();
export interface Context {
  user: {
    userType: UserTypeMap;
    createdAt: string;
    updatedAt: string;
    email: string;
    firstName: string;
    lastName: string;
    teamIds: string[];
    clubIds: string[];
    id: string;
    role: string;
    managedTeams?: string[];
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
  console.log('Auth header:', authHeader); // Add this for debugging

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    console.log('Token:', token); // Log the extracted token
    try {
      console.log('Attempting to verify token...'); // Add this for debugging
      const decodedToken = await auth.verifyIdToken(token);
      console.log('Token verified, uid:', decodedToken.uid); // Add this for debugging

      // First, get the user type from userIdToUserType collection
      const userTypeDocs = await db
        .collection('userIdToUserType')
        .where('userId', '==', decodedToken.uid)
        .get();

      if (userTypeDocs.empty || userTypeDocs.size > 1) {
        throw new Error('User not found');
      }
      const userTypeDoc = userTypeDocs.docs[0];

      console.log('User type doc exists:', userTypeDoc.exists); // Add this for debugging
      console.log('User type data:', userTypeDoc.data()); // Add this for debugging

      if (!userTypeDoc.exists || !userTypeDoc.data()?.userType) {
        console.log('User type not found'); // Add this for debugging
        throw new Error('User not found');
      }

      const userTypeValue = userTypeDoc.data()?.userType as UserTypeMap;
      const userCollection = userCollectionNameFromUserType(
        userTypeValue as unknown as string
      );

      // debug log
      console.log({ collection: userCollection, uid: decodedToken.uid });

      // Now fetch the user data from the appropriate collection
      const userDoc = await db
        .collection(userCollection)
        .doc(decodedToken.uid)
        .get();

      console.log('User doc exists:', userDoc.exists); // Add this for debugging
      console.log('User data:', userDoc.data()); // Add this for debugging

      const userData = userDoc.data();

      if (userData) {
        context.user = {
          userType: userTypeValue,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          clubIds: userData.clubIds || [],
          teamIds: userData.teamIds || [],
          id: decodedToken.uid,
          role: userTypeDoc.data()?.userType,
          managedTeams: userData.managedTeams || [],
        };
        console.log('User context created:', context.user.id);
      } else {
        console.log('No user data found for uid:', decodedToken.uid);
        throw new Error('User data not found');
      }
    } catch (error) {
      console.error('Error creating context:', error);
    }
  } else {
    console.log('No authorization header found');
  }
  return context;
}

export { UserTypeMap };
