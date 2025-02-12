import { GraphQLScalarType, Kind } from 'graphql';
import { clubs } from '../../database/mockdb';
const DateTime = new GraphQLScalarType({
    name: 'DateTime',
    description: 'A DateTime scalar in ISO 8601 format',
    serialize(value) {
        return value;
    },
    parseValue(value) {
        return value;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return ast.value;
        }
        return null;
    },
});
function findTeamById(teamId) {
    for (const club of clubs) {
        const team = club.teams.find((t) => t.id === teamId);
        if (team)
            return team;
    }
    return null;
}
const resolvers = {
    DateTime,
    Query: {
        clubs: () => clubs,
        club: (_, { id }) => clubs.find((club) => club.id === id),
        teams: () => clubs.flatMap((club) => club.teams),
        team: (_, { id }) => clubs.flatMap((club) => club.teams).find((t) => t.id === id),
        managers: () => clubs.flatMap((club) => club.teams.map((team) => team.manager)),
        manager: (_, { id }) => clubs
            .flatMap((club) => club.teams.map((team) => team.manager))
            .find((m) => m.id === id),
        coaches: () => clubs.flatMap((club) => club.teams).flatMap((team) => team.coaches),
        coach: (_, { id }) => clubs
            .flatMap((club) => club.teams)
            .flatMap((team) => team.coaches)
            .find((c) => c.id === id),
        scouts: () => clubs.flatMap((club) => club.teams).flatMap((team) => team.scouts),
        scout: (_, { id }) => clubs
            .flatMap((club) => club.teams)
            .flatMap((team) => team.scouts)
            .find((s) => s.id === id),
        players: () => clubs.flatMap((club) => club.teams).flatMap((team) => team.players),
        player: (_, { id }) => clubs
            .flatMap((club) => club.teams)
            .flatMap((team) => team.players)
            .find((p) => p.id === id),
    },
    Mutation: {
        createPlayer: (_, args) => {
            const { teamId, name, dateOfBirth, positions, preferredFoot, region } = args;
            const team = findTeamById(teamId);
            if (!team) {
                throw new Error(`Team with id ${teamId} not found`);
            }
            const [firstName, ...lastNameParts] = name.split(' ');
            const lastName = lastNameParts.join(' ') || '';
            const newPlayer = {
                id: `${teamId}-player${team.players.length + 1}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                status: 'ACTIVE',
                firstName,
                lastName,
                dateOfBirth,
                positions,
                preferredFoot,
                clubs: [team.club],
                teams: [team],
                region,
                parentGuardians: [
                    {
                        id: `${teamId}-player${team.players.length + 1}-pg`,
                        firstName: 'Default',
                        lastName: 'Guardian',
                        email: `pg${team.players.length + 1}@example.com`,
                        phone: '555-555-5555',
                    },
                ],
                statistics: {
                    gamesPlayed: 0,
                    goalsScored: 0,
                    assists: 0,
                    cleanSheets: 0,
                },
                videoHighlights: [],
                skillsCompleted: {
                    ballMasteryTier: [],
                    passingTier: [],
                    shootingTier: [],
                    physicalTier: [],
                    dribblingTier: [],
                    footballIqTier: [],
                },
            };
            team.players.push(newPlayer);
            return newPlayer;
        },
        createCoach: (_, args) => {
            const { teamId, name, contactNumber, email } = args;
            const team = findTeamById(teamId);
            if (!team) {
                throw new Error(`Team with id ${teamId} not found`);
            }
            const [firstName, ...lastNameParts] = name.split(' ');
            const lastName = lastNameParts.join(' ') || '';
            const newCoach = {
                id: `${teamId}-coach${team.coaches.length + 1}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                status: 'ACTIVE',
                firstName,
                lastName,
                email: email || `coach${team.coaches.length + 1}@example.com`,
                phone: contactNumber || '000-000-0000',
                teams: [team],
            };
            team.coaches.push(newCoach);
            return newCoach;
        },
    },
};
export default resolvers;
