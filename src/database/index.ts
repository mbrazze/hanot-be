import {
  EntityStatus,
  AgeGroup,
  Position,
  SkillLevel,
} from '../generated/graphql';

interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: EntityStatus;
}

interface ParentGuardian {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface VideoHighlight {
  id: string;
  title: string;
  description: string;
}

interface Statistics {
  gamesPlayed: number;
  goalsScored: number;
  assists: number;
  cleanSheets: number;
}

interface Skills {
  ballMasteryTier: SkillLevel[];
  passingTier: SkillLevel[];
  shootingTier: SkillLevel[];
  physicalTier: SkillLevel[];
  dribblingTier: SkillLevel[];
  footballIqTier: SkillLevel[];
}

interface Player extends BaseEntity {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  positions: Position[];
  preferredFoot: 'LEFT' | 'RIGHT';
  clubs: Club[];
  teams: Team[];
  region: string;
  parentGuardians: ParentGuardian[];
  statistics: Statistics;
  videoHighlights: VideoHighlight[];
  skillsCompleted: Skills;
}

interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  teams: Team[];
}

interface Manager extends User {
  // Add any manager-specific properties here
}

interface Coach extends User {
  // Add any coach-specific properties here
}

interface Scout extends User {
  assignedAgeGroups: AgeGroup[];
}

interface Team extends BaseEntity {
  name: string;
  ageGroup: AgeGroup;
  club: Club;
  manager: Manager;
  coaches: Coach[];
  scouts: Scout[];
  players: Player[];
}

interface Club extends BaseEntity {
  name: string;
  location: string;
  teams: Team[];
}

const now = new Date().toISOString();

function createManager(
  clubId: string,
  teamId: string,
  suffix: string
): Manager {
  return {
    id: `${teamId}-manager`,
    createdAt: now,
    updatedAt: now,
    status: EntityStatus.Active,
    firstName: 'John',
    lastName: suffix,
    email: `manager@${clubId}.com`,
    phone: '111-111-1111',
    teams: [],
  };
}

function createCoach(clubId: string, teamId: string, coachNum: number): Coach {
  return {
    id: `${teamId}-coach${coachNum}`,
    createdAt: now,
    updatedAt: now,
    status: EntityStatus.Active,
    firstName: 'Alice',
    lastName: `Coach${coachNum}`,
    email: `coach${coachNum}@${clubId}.com`,
    phone: '222-222-2222',
    teams: [],
  };
}

function createScout(
  clubId: string,
  teamId: string,
  ageGroup: AgeGroup
): Scout {
  return {
    id: `${teamId}-scout`,
    createdAt: now,
    updatedAt: now,
    status: EntityStatus.Active,
    firstName: 'Sam',
    lastName: 'Scout',
    email: `scout@${clubId}.com`,
    phone: '333-333-3333',
    assignedAgeGroups: [ageGroup],
    teams: [],
  };
}

function createPlayer(
  clubId: string,
  teamId: string,
  playerNum: number
): Player {
  return {
    id: `${teamId}-player${playerNum}`,
    createdAt: now,
    updatedAt: now,
    status: EntityStatus.Active,
    firstName: `Player${playerNum}`,
    lastName: 'Lastname',
    dateOfBirth: '2012-01-01',
    positions: [Position.Midfielder],
    preferredFoot: 'RIGHT',
    clubs: [],
    teams: [],
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
      ballMasteryTier: [SkillLevel.Bronze],
      passingTier: [SkillLevel.Bronze],
      shootingTier: [SkillLevel.Bronze],
      physicalTier: [SkillLevel.Bronze],
      dribblingTier: [SkillLevel.Bronze],
      footballIqTier: [SkillLevel.Bronze],
    },
  };
}

export const clubs: Club[] = [
  {
    id: 'club1',
    createdAt: now,
    updatedAt: now,
    status: EntityStatus.Active,
    name: 'Greenwood FC',
    location: 'Greenwood',
    teams: [
      {
        id: 'club1-team1',
        createdAt: now,
        updatedAt: now,
        status: EntityStatus.Active,
        name: 'Greenwood Under 10',
        ageGroup: AgeGroup.Under_10,
        club: {} as Club, // will be set later
        manager: createManager('club1', 'club1-team1', 'One'),
        coaches: [
          createCoach('club1', 'club1-team1', 1),
          createCoach('club1', 'club1-team1', 2),
        ],
        scouts: [createScout('club1', 'club1-team1', AgeGroup.Under_10)],
        players: Array.from({ length: 15 }, (_, i) =>
          createPlayer('club1', 'club1-team1', i + 1)
        ),
      },
      {
        id: 'club1-team2',
        createdAt: now,
        updatedAt: now,
        status: EntityStatus.Active,
        name: 'Greenwood Under 12',
        ageGroup: AgeGroup.Under_12,
        club: {} as Club,
        manager: createManager('club1', 'club1-team2', 'Two'),
        coaches: [
          createCoach('club1', 'club1-team2', 1),
          createCoach('club1', 'club1-team2', 2),
        ],
        scouts: [createScout('club1', 'club1-team2', AgeGroup.Under_12)],
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
    status: EntityStatus.Active,
    name: 'Lakeside FC',
    location: 'Lakeside',
    teams: [
      {
        id: 'club2-team1',
        createdAt: now,
        updatedAt: now,
        status: EntityStatus.Active,
        name: 'Lakeside Under 14',
        ageGroup: AgeGroup.Under_14,
        club: {} as Club,
        manager: createManager('club2', 'club2-team1', 'One'),
        coaches: [
          createCoach('club2', 'club2-team1', 1),
          createCoach('club2', 'club2-team1', 2),
        ],
        scouts: [createScout('club2', 'club2-team1', AgeGroup.Under_14)],
        players: Array.from({ length: 15 }, (_, i) =>
          createPlayer('club2', 'club2-team1', i + 1)
        ),
      },
      {
        id: 'club2-team2',
        createdAt: now,
        updatedAt: now,
        status: EntityStatus.Active,
        name: 'Lakeside Under 16',
        ageGroup: AgeGroup.Under_16,
        club: {} as Club,
        manager: createManager('club2', 'club2-team2', 'Two'),
        coaches: [
          createCoach('club2', 'club2-team2', 1),
          createCoach('club2', 'club2-team2', 2),
        ],
        scouts: [createScout('club2', 'club2-team2', AgeGroup.Under_16)],
        players: Array.from({ length: 15 }, (_, i) =>
          createPlayer('club2', 'club2-team2', i + 1)
        ),
      },
    ],
  },
];

// Update each team's club reference and set parent references on nested objects
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

export default clubs;
