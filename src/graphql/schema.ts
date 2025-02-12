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

enum UserRole {
  CLUB_ADMIN
  SUPER_ADMIN
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
  adminUsers: [User!]
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

type User implements BaseEntity {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: EntityStatus!
  firstName: String!
  lastName: String!
  email: String!
  phone: String!
  club: Club!
  role: UserRole!
  permissions: [String!]!
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
  users: [User!]!
  user(id: ID!): User
}

type Mutation {
  createClub(name: String!, location: String): Club!
  updateClub(id: ID!, name: String, location: String, status: EntityStatus): Club!
  deleteClub(id: ID!): Club!
  
  createTeam(clubId: ID!, name: String!, ageGroup: AgeGroup!): Team!
  updateTeam(id: ID!, name: String, clubId: ID, ageGroup: AgeGroup, status: EntityStatus): Team!
  deleteTeam(id: ID!): Team!
  
  createManager(teamId: ID!, name: String!, contactNumber: String, email: String, experienceYears: Int): Manager!
  updateManager(id: ID!, name: String, contactNumber: String, email: String, experienceYears: Int, status: EntityStatus): Manager!
  deleteManager(id: ID!): Manager!
  
  createCoach(teamId: ID!, name: String!, specialization: String, contactNumber: String, email: String): Coach!
  updateCoach(id: ID!, name: String, specialization: String, contactNumber: String, email: String, status: EntityStatus): Coach!
  deleteCoach(id: ID!): Coach!
  
  createScout(teamId: ID!, name: String!, regions: [String!]!, contactNumber: String, email: String): Scout!
  updateScout(id: ID!, name: String, regions: [String!], contactNumber: String, email: String, status: EntityStatus): Scout!
  deleteScout(id: ID!): Scout!
  
  createPlayer(teamId: ID!, name: String!, dateOfBirth: String!, positions: [Position!]!, preferredFoot: String!, region: String): Player!
  updatePlayer(id: ID!, name: String, dateOfBirth: String, positions: [Position!], preferredFoot: String, region: String, status: EntityStatus): Player!
  deletePlayer(id: ID!): Player!
  
  createUser(
    clubId: ID!,
    firstName: String!,
    lastName: String!,
    email: String!,
    phone: String!,
    role: UserRole!,
    permissions: [String!]!
  ): User!
  updateUser(
    id: ID!,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    role: UserRole,
    permissions: [String!],
    status: EntityStatus
  ): User!
  deleteUser(id: ID!): User!
}

type Subscription {
  clubAdded: Club!
  teamAdded: Team!
  managerAdded: Manager!
  coachAdded: Coach!
  scoutAdded: Scout!
  playerAdded: Player!
  userAdded: User!
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;

export default typeDefs;
