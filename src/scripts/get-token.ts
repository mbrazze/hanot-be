import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and parse the service account file
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '../../admin-service-account.json'), 'utf-8')
) as ServiceAccount;

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const auth = getAuth();

export enum UserType {
  MANAGER = 'manager',
  COACH = 'coach',
  SCOUT = 'scout',
  PLAYER = 'player',
  ADMIN = 'admin',
}

const userCollectionNameFromUserType = (userType: UserType): string => {
  switch (userType) {
    case UserType.MANAGER:
      return 'managers';
    case UserType.COACH:
      return 'coaches';
    case UserType.SCOUT:
      return 'scouts';
    case UserType.PLAYER:
      return 'players';
    case UserType.ADMIN:
      return 'adminUsers';
    default:
      throw new Error(`Invalid user type: ${userType}`);
  }
};

async function getAdminUserFromFirebase(email: string, collection: string) {
  const snapshot = await db
    .collection(collection)
    .where('email', '==', email)
    .get();

  if (snapshot.empty || snapshot.size > 1) {
    console.log('No matching documents.');
    return;
  }
  return {
    ...snapshot.docs[0].data(),
    id: snapshot.docs[0].id,
  };
}

export async function getToken(userEmail: string, userType: UserType) {
  let customSignInToken = '';
  try {
    const adminUser = (await getAdminUserFromFirebase(
      userEmail,
      userCollectionNameFromUserType(userType)
    )) as any;
    // console.log({ adminUser });

    const customClaims = {
      role: adminUser.role,
      email: adminUser.email,
    };

    // First create a custom token
    const customToken = await auth.createCustomToken(
      adminUser.id,
      customClaims
    );
    customSignInToken = customToken;
  } catch (error) {
    console.error('Error:', error);
  }

  // console.log('Custom token - use signInWithCustomToken fn:', customSignInToken);
  return customSignInToken;
}

// getToken('test@example.com', UserType.ADMIN);
