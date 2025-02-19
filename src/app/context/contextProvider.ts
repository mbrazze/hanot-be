import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { type Firestore, getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import type { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import { userCollectionNameFromUserType } from '../user/utils';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and parse the service account file
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, './admin-service-account.json'), 'utf-8')
) as ServiceAccount;

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const auth = getAuth();

// Define the context interface
export enum UserType {
  MANAGER = 'manager',
  COACH = 'coach',
  SCOUT = 'scout',
  PLAYER = 'player',
  ADMIN = 'admin',
}

export interface Context {
  user: {
    userType: UserType;
    createdAt: string;
    updatedAt: string;
    email: string;
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

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await auth.verifyIdToken(token);

      const userType = await db
        .collection('userIdToUserType')
        .doc(decodedToken.uid)
        .get();

      if (!userType.exists || !userType.data()?.userType) {
        throw new Error('User not found');
      }

      const userTypeValue = userType.data()?.userType as UserType;
      const userDataCollection = userCollectionNameFromUserType(userTypeValue);

      if (!userDataCollection) {
        throw new Error('User type not found');
      }

      // Fetch additional user data from Firestore if needed
      const userDoc = await db
        .collection(userDataCollection)
        .doc(decodedToken.uid)
        .get();
      const userData = userDoc.data();

      if (userData) {
        context.user = {
          userType: userTypeValue,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt,
          email: userData.email,
          clubIds: userData.clubIds || [],
          teamIds: userData.teamIds || [],
          id: decodedToken.uid,
          role: userData.role || 'user',
          managedTeams: userData.managedTeams || [],
        };
      }
    } catch (error) {
      console.error('Error creating context', error);
    }
  }
  return context;
}
