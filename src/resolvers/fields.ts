import { ResolverTypeWrapper, Club, Team, Player } from '../generated/graphql';
import type { Context } from '../app/context/contextProvider';
import { FieldPath } from 'firebase-admin/firestore';

const fieldResolvers = {
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
      const teamPlayerIds = await db
        .collection('teamPlayers')
        .where('playerId', '==', parent.id)
        .get();

      if (!teamPlayerIds?.docs?.length) {
        return [];
      }

      const teams = await db
        .collection('teams')
        .where(
          FieldPath.documentId(),
          'in',
          teamPlayerIds?.docs?.map((doc) => doc.data().teamId)
        )
        .get();

      return teams.docs.map((doc) => {
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

export default fieldResolvers;
