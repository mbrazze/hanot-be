import {
  User,
  Admin,
  Coach,
  Player,
  Scout,
  Manager,
} from '../../generated/graphql';

export const userCollectionNameFromUserType = (userType: string) => {
  let userDataCollection = '';
  if (userType === 'manager') {
    userDataCollection = 'managers';
  } else if (userType === 'coach') {
    userDataCollection = 'coaches';
  } else if (userType === 'scout') {
    userDataCollection = 'scouts';
  } else if (userType === 'player') {
    userDataCollection = 'players';
  } else if (userType === 'admin') {
    userDataCollection = 'admins';
  }
  return userDataCollection;
};

export type UserTypeMap = {
  manager: Manager;
  coach: Coach;
  scout: Scout;
  player: Player;
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
    default:
      throw new Error(`Invalid user type: ${userType}`);
  }
};
