import { GraphQLScalarType, Kind } from 'graphql';
import {
  Resolvers,
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
  EntityStatus,
} from '../generated/graphql';
import type { Context } from '../app/context/contextProvider';
import { FieldValue } from 'firebase-admin/firestore';
import {
  userCollectionNameFromUserType,
  userGqlTypeFromUserType,
} from '../app/user/utils';

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A DateTime scalar in ISO 8601 format',
  serialize(value: unknown): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === 'string' || typeof value === 'number') {
      return new Date(value).toISOString();
    }
    throw new Error('DateTime cannot represent an invalid date-time value');
  },
  parseValue(value: unknown): Date {
    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date-time value');
      }
      return date;
    }
    throw new Error('DateTime cannot represent non-string or non-number type');
  },
  parseLiteral(ast): Date {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
      const date = new Date(ast.value);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date-time value');
      }
      return date;
    }
    throw new Error('DateTime cannot represent an invalid date-time value');
  },
});

const resolvers: Resolvers<Context> = {
  DateTime,
  Query: {
    clubs: async (
      _,
      __,
      { db, user }
    ): Promise<ResolverTypeWrapper<Club>[]> => {
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
    teams: async (
      _,
      __,
      { db, user }
    ): Promise<ResolverTypeWrapper<Team>[]> => {
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
            status: data.status as EntityStatus,
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
          status: data.status as EntityStatus,
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
  },
  Mutation: {
    createPlayer: async (
      parent,
      args,
      { user, db }
    ): Promise<ResolverTypeWrapper<Player>> => {
      if (!user) throw new Error('Not authenticated');

      const authorizedRoles = ['SUPER_ADMIN', 'CLUB_ADMIN', 'TEAM_MANAGER'];
      if (!authorizedRoles.includes(user.role)) {
        throw new Error('Not authorized to create a player');
      }

      const {
        teamId,
        firstName,
        lastName,
        dateOfBirth,
        positions,
        preferredFoot,
        city,
        region,
        invitationType,
      } = args;

      const teamDoc = await db.collection('teams').doc(teamId).get();
      if (!teamDoc.exists) {
        throw new Error(`Team with id ${teamId} not found`);
      }
      const team = teamDoc.data() as Team;

      const newPlayer: Omit<Player, 'id'> = {
        createdAt: new Date(),
        updatedAt: new Date(),
        status:
          invitationType === 'DIRECT_ADD'
            ? EntityStatus.Active
            : EntityStatus.Pending,
        firstName,
        lastName,
        dateOfBirth,
        positions,
        preferredFoot,
        city,
        region,
        teams: [{ id: team.id, name: team.name } as Team],
        clubs: team.club ? [team.club] : [],
        parentGuardians: [],
        videoHighlights: [],
      };

      const newPlayerRef = await db.collection('players').add(newPlayer);
      const newPlayerId = newPlayerRef.id;
      console.log(newPlayerRef);
      if (invitationType === 'DIRECT_ADD') {
        await db
          .collection('teams')
          .doc(teamId)
          .update({
            playerIds: FieldValue.arrayUnion(newPlayerId),
          });
      } else {
        await db.collection('invitations').add({
          playerId: newPlayerId,
          teamId,
          status: 'PENDING',
          createdAt: new Date(),
          invitedBy: user.id,
          type: invitationType,
        });
      }

      return { id: newPlayerId, ...newPlayer };
    },
    createCoach: async (
      _,
      args,
      { user, db }
    ): Promise<ResolverTypeWrapper<Coach>> => {
      if (!user) throw new Error('Not authenticated');

      const authorizedRoles = ['SUPER_ADMIN', 'CLUB_ADMIN'];
      if (!authorizedRoles.includes(user.role)) {
        throw new Error('Not authorized to create a coach');
      }

      const { teamId, firstName, lastName, email, phone } = args;

      const teamDoc = await db.collection('teams').doc(teamId).get();

      if (!teamDoc.exists) {
        throw new Error(`Team with id ${teamId} not found`);
      }

      const newCoach: Omit<Coach, 'id'> = {
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName,
        lastName,
        email,
        phone,
        teams: [{ id: teamId, name: teamDoc.data()?.name } as Team],
        status: EntityStatus.Active,
      };

      const newCoachRef = await db.collection('users').add(newCoach);
      const newCoachId = newCoachRef.id;

      await db
        .collection('teams')
        .doc(teamId)
        .update({
          coachIds: FieldValue.arrayUnion(newCoachId),
        });

      return { id: newCoachId, ...newCoach };
    },
    createTeam: async (
      _,
      args,
      { user, db }
    ): Promise<ResolverTypeWrapper<Team>> => {
      if (!user) throw new Error('Not authenticated');

      const authorizedRoles = ['SUPER_ADMIN', 'CLUB_ADMIN'];
      if (!authorizedRoles.includes(user.role)) {
        throw new Error('Not authorized to create a coach');
      }

      const t = await db.collection('teams').add({
        name: args.name,
        ageGroup: args.ageGroup,
        clubId: args.clubId,
      });

      console.log(t);

      return {
        id: t.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: EntityStatus.Active,
        coaches: [],
        manager: null,
        players: [],
        scouts: [],
        club: { id: args.clubId } as Club,
        name: args.name,
        ageGroup: args.ageGroup,
      };
    },
  },
  Team: {
    club: async (parent: Team, args: unknown, { db }: Context) => {
      const clubDoc = await db.collection('clubs').doc(parent.club.id).get();
      if (!clubDoc.exists) {
        throw new Error(`Club with id ${parent.club.id} not found`);
      }
      const data = clubDoc.data();
      return {
        id: clubDoc.id,
        createdAt: data?.createdAt.toDate(),
        updatedAt: data?.updatedAt.toDate(),
        ...data,
      } as Club;
    },
  },
  Player: {
    teams: async (
      parent: Player,
      args: unknown,
      { db }: Context
    ): Promise<ResolverTypeWrapper<Team>[]> => {
      const snapshot = await db
        .collection('teams')
        .where('playerIds', 'array-contains', parent.id)
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
    skillsCompleted: async (parent: Player, args: unknown, { db }: Context) => {
      const skillsSnapshot = await db
        .collection('skill-levels')
        .where('playerId', '==', parent.id)
        .get();

      const skills = skillsSnapshot.docs.map((doc) => doc.data());

      return {
        ballMasteryTier: skills
          .filter((skill) => skill.type === 'ballMastery')
          .map((skill) => skill.level),
        passingTier: skills
          .filter((skill) => skill.type === 'passing')
          .map((skill) => skill.level),
        shootingTier: skills
          .filter((skill) => skill.type === 'shooting')
          .map((skill) => skill.level),
        physicalTier: skills
          .filter((skill) => skill.type === 'physical')
          .map((skill) => skill.level),
        dribblingTier: skills
          .filter((skill) => skill.type === 'dribbling')
          .map((skill) => skill.level),
        footballIqTier: skills
          .filter((skill) => skill.type === 'footballIq')
          .map((skill) => skill.level),
      };
    },
  },
};

export default resolvers;
