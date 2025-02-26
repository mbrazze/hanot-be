import {
  ResolverTypeWrapper,
  Club,
  User,
  Team,
  Player,
  Manager,
  Coach,
  Scout,
  Invitation,
  InvitationType,
  InvitationStatus,
  QueryResolvers,
} from '../generated/graphql';
import type { Context } from '../app/context/contextProvider';
import {
  userCollectionNameFromUserType,
  userGqlTypeFromUserType,
} from '../app/user/utils';

const queries: QueryResolvers<Context> = {
  clubs: async (_, __, { db, user }): Promise<ResolverTypeWrapper<Club>[]> => {
    if (!user) throw new Error('Not authenticated');
    const snapshot = await db.collection('clubs').get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
      status: doc.data().status,
      name: doc.data().name,
      location: doc.data().location,
      teams: doc.data().teams || [],
      adminUsers: doc.data().adminUsers || [],
    }));
  },
  club: async (
    _,
    { id },
    { db, user }
  ): Promise<ResolverTypeWrapper<Club> | null> => {
    if (!user) throw new Error('Not authenticated');
    const doc = await db.collection('clubs').doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data()!;
    return {
      id: doc.id,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      status: data.status,
      name: data.name,
      location: data.location,
      teams: data.teams || [],
      adminAdmins: data.adminUsers || [],
    };
  },
  teams: async (_, __, { db, user }): Promise<ResolverTypeWrapper<Team>[]> => {
    if (!user) throw new Error('Not authenticated');
    const snapshot = await db.collection('teams').get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        ...data,
      } as Team;
    });
  },
  team: async (
    _,
    { id },
    { db, user }
  ): Promise<ResolverTypeWrapper<Team> | null> => {
    if (!user) throw new Error('Not authenticated');
    const doc = await db.collection('teams').doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data()!;
    return {
      id: doc.id,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      ...data,
    } as Team;
  },
  managers: async (
    _,
    __,
    { db, user }
  ): Promise<ResolverTypeWrapper<Manager>[]> => {
    if (!user) throw new Error('Not authenticated');
    const snapshot = await db
      .collection('users')
      .where('role', '==', 'TEAM_MANAGER')
      .get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        status: data.status,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: data.role,
        teams: data.teams || [],
        managedTeams: data.managedTeams || [],
      } as Manager;
    });
  },
  manager: async (
    parent,
    { id },
    { db, user }
  ): Promise<ResolverTypeWrapper<Manager> | null> => {
    if (!user) throw new Error('Not authenticated');
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists || doc.data()?.role !== 'TEAM_MANAGER') return null;
    const data = doc.data()!;
    return {
      id: doc.id,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      status: data.status,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: data.role,
      teams: data.teams || [],
      managedTeams: data.managedTeams || [],
    } as Manager;
  },
  coaches: async (
    parent,
    args,
    { db, user }
  ): Promise<ResolverTypeWrapper<Coach>[]> => {
    if (!user) throw new Error('Not authenticated');
    const snapshot = await db
      .collection('users')
      .where('role', '==', 'COACH')
      .get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        ...data,
        teams: data.teams || [],
      } as Coach;
    });
  },
  coach: async (
    _,
    { id },
    { db, user }
  ): Promise<ResolverTypeWrapper<Coach> | null> => {
    if (!user) throw new Error('Not authenticated');
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists || doc.data()?.role !== 'COACH') return null;
    const data = doc.data()!;
    return {
      id: doc.id,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      ...data,
      teams: data.teams || [],
    } as Coach;
  },
  scouts: async (
    _,
    __,
    { db, user }
  ): Promise<ResolverTypeWrapper<Scout>[]> => {
    if (!user) throw new Error('Not authenticated');
    const snapshot = await db
      .collection('users')
      .where('role', '==', 'SCOUT')
      .get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        ...data,
        teams: data.teams || [],
      } as Scout;
    });
  },
  scout: async (
    _,
    { id },
    { db, user }
  ): Promise<ResolverTypeWrapper<Scout> | null> => {
    if (!user) throw new Error('Not authenticated');
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists || doc.data()?.role !== 'SCOUT') return null;
    const data = doc.data()!;
    return {
      id: doc.id,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      ...data,
      teams: data.teams || [],
    } as Scout;
  },
  players: async (
    _,
    __,
    { db, user }
  ): Promise<ResolverTypeWrapper<Player>[]> => {
    if (!user) throw new Error('Not authenticated');
    const snapshot = await db.collection('players').get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        ...data,
      } as Player;
    });
  },
  player: async (
    _,
    { id },
    { db, user }
  ): Promise<ResolverTypeWrapper<Player> | null> => {
    if (!user) throw new Error('Not authenticated');
    const doc = await db.collection('players').doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data()!;
    return {
      id: doc.id,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      ...data,
    } as Player;
  },
  me: async (
    parent: any,
    args: any,
    { user, db }: Context
  ): Promise<ResolverTypeWrapper<User>> => {
    if (!user) throw new Error('Not authenticated');

    const userCollection = userCollectionNameFromUserType(
      user.userType as unknown as string
    );
    const userDoc = await db.collection(userCollection).doc(user.id).get();

    if (!userDoc.exists) {
      throw new Error('User document not found');
    }

    const userData = userDoc.data();
    if (!userData) {
      throw new Error('User data is empty');
    }

    const userType = userGqlTypeFromUserType(
      user.userType as keyof typeof userGqlTypeFromUserType
    );

    return {
      ...userData,
      id: userDoc.id,
      createdAt: userData.createdAt.toDate(),
      updatedAt: userData.updatedAt.toDate(),
      __typename: userType.__typename,
      status: userData.status,
    } as ResolverTypeWrapper<User>;
  },

  myTeams: async (
    _,
    __,
    { user, db }
  ): Promise<ResolverTypeWrapper<Team>[]> => {
    if (!user) throw new Error('Not authenticated');
    const snapshot = await db
      .collection('teams')
      .where('members', 'array-contains', user.id)
      .get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        ...data,
      } as Team;
    });
  },

  pendingInvitations: async (
    _,
    __,
    { user, db }
  ): Promise<ResolverTypeWrapper<Invitation>[]> => {
    if (!user) throw new Error('Not authenticated');

    const snapshot = await db
      .collection('invitations')
      .where('status', '==', 'PENDING')
      .where('teamId', 'in', user.managedTeams || [])
      .get();

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs
      .filter((doc) => doc.exists)
      .map((doc) => {
        const data = doc?.data();
        if (!data) {
          return null;
        }
        return {
          id: doc.id,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          status: data.status as InvitationStatus,
          playerId: data.playerId,
          teamId: data.teamId,
          invitedBy: data.invitedBy,
          type: data.type as InvitationType,
        };
      }) as Invitation[];
  },
  playerRequests: async (
    _,
    __,
    { user, db }
  ): Promise<ResolverTypeWrapper<Invitation>[]> => {
    if (!user) throw new Error('Not authenticated');
    const snapshot = await db
      .collection('invitations')
      .where('status', '==', 'PENDING')
      .where('type', '==', 'REQUEST')
      .where('teamId', 'in', user.managedTeams || [])
      .get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        status: data.status as InvitationStatus,
        playerId: data.playerId,
        teamId: data.teamId,
        invitedBy: data.invitedBy,
        type: data.type as InvitationType,
      };
    }) as Invitation[];
  },
  teamPlayers: async (
    _,
    { teamId },
    { user, db }
  ): Promise<ResolverTypeWrapper<Player>[]> => {
    if (!user) throw new Error('Not authenticated');
    const teamDoc = await db.collection('teams').doc(teamId).get();
    if (!teamDoc.exists) {
      throw new Error(`Team with id ${teamId} not found`);
    }
    const team = teamDoc.data() as Team;

    if (
      !team.players ||
      !team.players.some((player) => player.id === user.id)
    ) {
      throw new Error("Not authorized to view this team's players");
    }
    const snapshot = await db
      .collection('players')
      .where('teamId', '==', teamId)
      .where('status', '==', 'ACTIVE')
      .get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        ...data,
      } as Player;
    });
  },
};

export default queries;
