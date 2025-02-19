import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { type Firestore, getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import type { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { userCollectionNameFromUserType } from '../user/utils';

// Initialize Firebase Admin SDK
const serviceAccount = require('./admin-service-account.json');

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db = getFirestore();
const auth = getAuth();

// Define the context interface

enum UserType {
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
    teamIds: never[];
    clubIds: any;
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

      const userType = await db
        .collection('userIdToUserType')
        .doc(decodedToken.uid)
        .get();

      if (!userType.exists || !userType.data()?.userType) {
        throw new Error('User not found');
      }

      let userDataCollection = userCollectionNameFromUserType(
        userType.data()?.userType
      );
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
          userType: userType.data()?.userType,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt,
          email: userData.email,
          clubIds: userData.clubIds || [],
          teamIds: userData.teamIds || [],
          id: decodedToken.uid,
          role: userData.role || 'user',
          managedTeams: userData.managedTeams || [],
          // Add other user properties as needed
        };
      }
    } catch (error) {
      console.error('Error creating context', error);
    }
  }
  return context;
}
