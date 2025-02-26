import {
  ResolverTypeWrapper,
  Club,
  Team,
  Player,
  Coach,
  EntityStatus,
  MutationResolvers,
} from '../generated/graphql';
import type { Context } from '../app/context/contextProvider';
import { FieldValue } from 'firebase-admin/firestore';
import { UserTypeMap } from '../app/context/contextProvider';

const mutations: MutationResolvers<Context> = {
  createPlayer: async (
    parent,
    args,
    { user, db }
  ): Promise<ResolverTypeWrapper<Player>> => {
    if (!user) throw new Error('Not authenticated');

    const authorizedRoles = ['admin', 'clubAdmin', 'manager'];
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

    let team;
    if (teamId) {
      const teamDoc = await db.collection('teams').doc(teamId).get();
      if (!teamDoc.exists) {
        throw new Error(`Team with id ${teamId} not found`);
      }
      team = {
        id: teamDoc.id,
      };
    }

    const newPlayer = {
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
      parentGuardians: [],
      videoHighlights: [],
    };

    const newPlayerRef = await db.collection('players').add(newPlayer);
    const newPlayerId = newPlayerRef.id;
    console.log(newPlayerRef);

    if (team && team?.id) {
      await db
        .collection('teamPlayers')
        .add({ playerId: newPlayerId, teamId: team.id });
    }

    if (invitationType !== 'DIRECT_ADD') {
      await db.collection('invitations').add({
        playerId: newPlayerId,
        teamId,
        status: 'PENDING',
        createdAt: new Date(),
        invitedBy: user.id,
        type: invitationType,
      });
    }

    const playerDoc = await newPlayerRef.get();
    if (!playerDoc.exists) {
      throw new Error('Player did not create successfully');
    }

    return {
      ...playerDoc.data(),
      id: playerDoc.id,
    } as Player;
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
};

export default mutations;
