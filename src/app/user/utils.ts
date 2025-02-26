import {
  User,
  Admin,
  Coach,
  Player,
  Scout,
  Manager,
  ClubAdmin,
} from '../../generated/graphql';

export const userCollectionNameFromUserType = (userType: string) => {
  let userDataCollection = '';
  if (userType === 'manager') {
    userDataCollection = 'managers';
  } else if (userType === 'coach') {
    userDataCollection = 'coaches';
  } else if (userType === 'clubAdmin') {
    userDataCollection = 'clubAdmins';
  } else if (userType === 'scout') {
    userDataCollection = 'scouts';
  } else if (userType === 'player') {
    userDataCollection = 'players';
  } else if (userType === 'admin') {
    userDataCollection = 'adminUsers';
  }
  return userDataCollection;
};

export type UserTypeMap = {
  manager: Manager;
  coach: Coach;
  scout: Scout;
  player: Player;
  clubAdmin: ClubAdmin;
  admin: Admin;
};

export const userGqlTypeFromUserType = (userType: keyof UserTypeMap): User => {
  switch (userType) {
    case 'manager':
      return { __typename: 'Manager' } as Manager;
    case 'coach':
      return { __typename: 'Coach' } as Coach;
    case 'scout':
      return { __typename: 'Scout' } as Scout;
    case 'player':
      return { __typename: 'Player' } as Player;
    case 'admin':
      return { __typename: 'Admin' } as Admin;
    case 'clubAdmin':
      return { __typename: 'ClubAdmin' } as ClubAdmin;
    default:
      throw new Error(`Invalid user type: ${userType}`);
  }
};
