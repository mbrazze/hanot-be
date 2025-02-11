import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLScalarType, Kind } from 'graphql';

// ---------------------------
// Type Definitions (Schema)
// ---------------------------
const typeDefs = `
scalar DateTime

enum EntityStatus {
  ACTIVE
  INACTIVE
  DELETED
}

enum AgeGroup {
  UNDER_7
  UNDER_8
  UNDER_9
  UNDER_10
  UNDER_11
  UNDER_12
  UNDER_13
  UNDER_14
  UNDER_15
  UNDER_16
  UNDER_17
  UNDER_18
  UNDER_19
  UNDER_20
  UNDER_21
  UNDER_22
  UNDER_23
  OPEN
}

interface BaseEntity {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: EntityStatus!
}

enum Position {
  FORWARD
  MIDFIELDER
  DEFENDER
  GOALKEEPER
}

type Skills {
  ballMasteryTier: [String]
  passingTier: [String]
  shootingTier: [String]
  physicalTier: [String]
  dribblingTier: [String]
  footballIqTier: [String]
}

type VideoHighlight {
  id: ID!
  title: String
  description: String
}

type Statistics {
  gamesPlayed: Int
  goalsScored: Int
  assists: Int
  cleanSheets: Int
}

type ParentGuardian {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  phone: String!
}

type Club implements BaseEntity {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: EntityStatus!
  name: String!
  location: String!
  teams: [Team!]
}

type Team implements BaseEntity {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: EntityStatus!
  name: String!
  ageGroup: AgeGroup!
  club: Club!
  manager: Manager
  coaches: [Coach!]
  players: [Player!]
  scouts: [Scout!]
}

type Manager implements BaseEntity {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: EntityStatus!
  firstName: String!
  lastName: String!
  email: String!
  phone: String!
  teams: [Team!]
}

type Coach implements BaseEntity {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: EntityStatus!
  firstName: String!
  lastName: String!
  email: String!
  phone: String!
  teams: [Team!]
}

type Scout implements BaseEntity {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: EntityStatus!
  firstName: String!
  lastName: String!
  email: String!
  phone: String!
  assignedAgeGroups: [AgeGroup!]
  teams: [Team!]
}

type Player implements BaseEntity {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: EntityStatus!
  firstName: String!
  lastName: String!
  dateOfBirth: String!
  positions: [Position!]
  preferredFoot: String!
  clubs: [Club!]
  teams: [Team!]
  region: String
  parentGuardians: [ParentGuardian!]
  statistics: Statistics
  videoHighlights: [VideoHighlight!]
  skillsCompleted: Skills
}

type Query {
  clubs: [Club!]!
  club(id: ID!): Club
  teams: [Team!]!
  team(id: ID!): Team
  managers: [Manager!]!
  manager(id: ID!): Manager
  coaches: [Coach!]!
  coach(id: ID!): Coach
  scouts: [Scout!]!
  scout(id: ID!): Scout
  players: [Player!]!
  player(id: ID!): Player
}

type Mutation {
  createPlayer(teamId: ID!, name: String!, dateOfBirth: String!, positions: [Position!]!, preferredFoot: String!, region: String): Player!
  createCoach(teamId: ID!, name: String!, contactNumber: String, email: String): Coach!
  # (Other mutations can be added similarly.)
}

type Subscription {
  clubAdded: Club!
  teamAdded: Team!
  managerAdded: Manager!
  coachAdded: Coach!
  scoutAdded: Scout!
  playerAdded: Player!
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;

// ---------------------------
// Custom DateTime Scalar
// ---------------------------
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

// ---------------------------
// Helper Functions for Sample Data
// ---------------------------
const now = new Date().toISOString();

function createManager(clubId: string, teamId: string, suffix: string) {
  return {
    id: `${teamId}-manager`,
    createdAt: now,
    updatedAt: now,
    status: 'ACTIVE',
    firstName: 'John',
    lastName: suffix,
    email: `manager@${clubId}.com`,
    phone: '111-111-1111',
    teams: [], // Will be set to reference the team later.
  };
}

function createCoach(clubId: string, teamId: string, coachNum: number) {
  return {
    id: `${teamId}-coach${coachNum}`,
    createdAt: now,
    updatedAt: now,
    status: 'ACTIVE',
    firstName: 'Alice',
    lastName: `Coach${coachNum}`,
    email: `coach${coachNum}@${clubId}.com`,
    phone: '222-222-2222',
    teams: [], // Will be set to reference the team later.
  };
}

function createScout(clubId: string, teamId: string, ageGroup: string) {
  return {
    id: `${teamId}-scout`,
    createdAt: now,
    updatedAt: now,
    status: 'ACTIVE',
    firstName: 'Sam',
    lastName: 'Scout',
    email: `scout@${clubId}.com`,
    phone: '333-333-3333',
    assignedAgeGroups: [ageGroup],
    teams: [], // Will be set to reference the team later.
  };
}

function createPlayer(clubId: string, teamId: string, playerNum: number) {
  return {
    id: `${teamId}-player${playerNum}`,
    createdAt: now,
    updatedAt: now,
    status: 'ACTIVE',
    firstName: `Player${playerNum}`,
    lastName: 'Lastname',
    dateOfBirth: '2012-01-01',
    positions: ['MIDFIELDER'],
    preferredFoot: 'RIGHT',
    clubs: [], // Will be set to reference the club later.
    teams: [], // Will be set to reference the team later.
    region: 'Region 1',
    parentGuardians: [
      {
        id: `${teamId}-player${playerNum}-pg`,
        firstName: 'Parent',
        lastName: 'Guardian',
        email: `pg${playerNum}@example.com`,
        phone: '444-444-4444',
      },
    ],
    statistics: { gamesPlayed: 10, goalsScored: 5, assists: 3, cleanSheets: 2 },
    videoHighlights: [
      {
        id: `${teamId}-player${playerNum}-vh1`,
        title: 'Highlight 1',
        description: 'Great performance',
      },
    ],
    skillsCompleted: {
      ballMasteryTier: ['Tier1'],
      passingTier: ['Tier1'],
      shootingTier: ['Tier1'],
      physicalTier: ['Tier1'],
      dribblingTier: ['Tier1'],
      footballIqTier: ['Tier1'],
    },
  };
}

// ---------------------------
// Sample Data: 2 Clubs, Each with 2 Teams
// ---------------------------
const clubs = [
  {
    id: 'club1',
    createdAt: now,
    updatedAt: now,
    status: 'ACTIVE',
    name: 'Greenwood FC',
    location: 'Greenwood',
    teams: [
      {
        id: 'club1-team1',
        createdAt: now,
        updatedAt: now,
        status: 'ACTIVE',
        name: 'Greenwood Under 10',
        ageGroup: 'UNDER_10',
        club: null, // to be set later
        manager: createManager('club1', 'club1-team1', 'One'),
        coaches: [
          createCoach('club1', 'club1-team1', 1),
          createCoach('club1', 'club1-team1', 2),
        ],
        scouts: [createScout('club1', 'club1-team1', 'UNDER_10')],
        players: Array.from({ length: 15 }, (_, i) =>
          createPlayer('club1', 'club1-team1', i + 1)
        ),
      },
      {
        id: 'club1-team2',
        createdAt: now,
        updatedAt: now,
        status: 'ACTIVE',
        name: 'Greenwood Under 12',
        ageGroup: 'UNDER_12',
        club: null,
        manager: createManager('club1', 'club1-team2', 'Two'),
        coaches: [
          createCoach('club1', 'club1-team2', 1),
          createCoach('club1', 'club1-team2', 2),
        ],
        scouts: [createScout('club1', 'club1-team2', 'UNDER_12')],
        players: Array.from({ length: 15 }, (_, i) =>
          createPlayer('club1', 'club1-team2', i + 1)
        ),
      },
    ],
  },
  {
    id: 'club2',
    createdAt: now,
    updatedAt: now,
    status: 'ACTIVE',
    name: 'Lakeside FC',
    location: 'Lakeside',
    teams: [
      {
        id: 'club2-team1',
        createdAt: now,
        updatedAt: now,
        status: 'ACTIVE',
        name: 'Lakeside Under 14',
        ageGroup: 'UNDER_14',
        club: null,
        manager: createManager('club2', 'club2-team1', 'One'),
        coaches: [
          createCoach('club2', 'club2-team1', 1),
          createCoach('club2', 'club2-team1', 2),
        ],
        scouts: [createScout('club2', 'club2-team1', 'UNDER_14')],
        players: Array.from({ length: 15 }, (_, i) =>
          createPlayer('club2', 'club2-team1', i + 1)
        ),
      },
      {
        id: 'club2-team2',
        createdAt: now,
        updatedAt: now,
        status: 'ACTIVE',
        name: 'Lakeside Under 16',
        ageGroup: 'UNDER_16',
        club: null,
        manager: createManager('club2', 'club2-team2', 'Two'),
        coaches: [
          createCoach('club2', 'club2-team2', 1),
          createCoach('club2', 'club2-team2', 2),
        ],
        scouts: [createScout('club2', 'club2-team2', 'UNDER_16')],
        players: Array.from({ length: 15 }, (_, i) =>
          createPlayer('club2', 'club2-team2', i + 1)
        ),
      },
    ],
  },
];

// Now, for each club, set each team’s club field and update the team references on manager, coaches, scouts, and players.
for (const club of clubs) {
  for (const team of club.teams) {
    team.club = club;
    team.manager.teams = [team];
    team.coaches.forEach((coach) => {
      coach.teams = [team];
    });
    team.scouts.forEach((scout) => {
      scout.teams = [team];
    });
    team.players.forEach((player) => {
      player.teams = [team];
      player.clubs = [club];
    });
  }
}

// ---------------------------
// Helper: Find a Team by ID
// ---------------------------
function findTeamById(teamId: string) {
  for (const club of clubs) {
    const team = club.teams.find((t: any) => t.id === teamId);
    if (team) return team;
  }
  return null;
}

// ---------------------------
// Resolvers
// ---------------------------
const resolvers = {
  DateTime,
  Query: {
    clubs: () => clubs,
    club: (_: any, { id }: { id: string }) =>
      clubs.find((club) => club.id === id),
    teams: () => clubs.flatMap((club) => club.teams),
    team: (_: any, { id }: { id: string }) =>
      clubs.flatMap((club) => club.teams).find((t: any) => t.id === id),
    managers: () =>
      clubs.flatMap((club) => club.teams.map((team) => team.manager)),
    manager: (_: any, { id }: { id: string }) =>
      clubs
        .flatMap((club) => club.teams.map((team) => team.manager))
        .find((m: any) => m.id === id),
    coaches: () =>
      clubs.flatMap((club) => club.teams).flatMap((team: any) => team.coaches),
    coach: (_: any, { id }: { id: string }) =>
      clubs
        .flatMap((club) => club.teams)
        .flatMap((team: any) => team.coaches)
        .find((c: any) => c.id === id),
    scouts: () =>
      clubs.flatMap((club) => club.teams).flatMap((team: any) => team.scouts),
    scout: (_: any, { id }: { id: string }) =>
      clubs
        .flatMap((club) => club.teams)
        .flatMap((team: any) => team.scouts)
        .find((s: any) => s.id === id),
    players: () =>
      clubs.flatMap((club) => club.teams).flatMap((team: any) => team.players),
    player: (_: any, { id }: { id: string }) =>
      clubs
        .flatMap((club) => club.teams)
        .flatMap((team: any) => team.players)
        .find((p: any) => p.id === id),
  },
  Mutation: {
    createPlayer: (_: any, args: any) => {
      const { teamId, name, dateOfBirth, positions, preferredFoot, region } =
        args;
      const team = findTeamById(teamId);
      if (!team) {
        throw new Error(`Team with id ${teamId} not found`);
      }
      // Split the name into firstName and lastName (if possible)
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
    createCoach: (_: any, args: any) => {
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
  // Optionally, add field-level resolvers if needed (e.g., to ensure that when querying a Club,
  // each team includes a reference to its parent club). In our sample data these references are set.
};

// ---------------------------
// Create and Start Apollo Server
// ---------------------------
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
