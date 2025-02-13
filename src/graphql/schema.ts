import { gql } from 'graphql-tag';

const typeDefs = gql`
  scalar DateTime

  enum EntityStatus {
    ACTIVE
    INACTIVE
    DELETED
    PENDING
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
    SUPER_ADMIN
    CLUB_ADMIN
    TEAM_MANAGER
    COACH
    SCOUT
    PLAYER
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
    ballMasteryTier: [SkillLevels!]!
    passingTier: [SkillLevels!]!
    shootingTier: [SkillLevels!]!
    physicalTier: [SkillLevels!]!
    dribblingTier: [SkillLevels!]!
    footballIqTier: [SkillLevels!]!
  }

  type SkillLevels {
    level: SkillLevel!
    completedAt: DateTime!
  }

  enum SkillLevel {
    BRONZE
    SILVER
    GOLD
    PLAT
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
    manager: User
    coaches: [Coach!]
    players: [Player!]
    scouts: [Scout!]
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
    city: String
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
    role: UserRole!
    teams: [Team!]
    managedTeams: [Team!]
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
    role: UserRole!
    teams: [Team!]
    managedTeams: [Team!]
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
    role: UserRole!
    teams: [Team!]
    managedTeams: [Team!]
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
    role: UserRole!
    teams: [Team!]
  }

  enum InvitationType {
    DIRECT_ADD
    INVITATION
    REQUEST
  }

  type Invitation implements BaseEntity {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    status: EntityStatus!
    playerId: ID!
    teamId: ID!
    invitedBy: ID!
    type: InvitationType!
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
    me: User!
    myTeams: [Team!]!
    pendingInvitations: [Invitation!]!
    playerRequests: [Invitation!]!
    teamPlayers(teamId: ID!): [Player!]!
  }

  type Mutation {
    createClub(name: String!, location: String): Club!
    updateClub(
      id: ID!
      name: String
      location: String
      status: EntityStatus
    ): Club!
    deleteClub(id: ID!): Club!

    createTeam(clubId: ID!, name: String!, ageGroup: AgeGroup!): Team!
    updateTeam(
      id: ID!
      name: String
      clubId: ID
      ageGroup: AgeGroup
      status: EntityStatus
    ): Team!
    deleteTeam(id: ID!): Team!

    createPlayer(
      teamId: ID!
      firstName: String!
      lastName: String!
      dateOfBirth: String!
      positions: [Position!]!
      preferredFoot: String!
      city: String
      region: String
      invitationType: InvitationType!
    ): Player!
    updatePlayer(
      id: ID!
      firstName: String
      lastName: String
      dateOfBirth: String
      positions: [Position!]
      preferredFoot: String
      city: String
      region: String
      status: EntityStatus
    ): Player!
    deletePlayer(id: ID!): Player!

    createCoach(
      teamId: ID!
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
    ): User!
    updateCoach(
      id: ID!
      firstName: String
      lastName: String
      email: String
      phone: String
      status: EntityStatus
    ): User!
    deleteCoach(id: ID!): User!

    createUser(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      role: UserRole!
    ): User!
    updateUser(
      id: ID!
      firstName: String
      lastName: String
      email: String
      phone: String
      role: UserRole
      status: EntityStatus
    ): User!
    deleteUser(id: ID!): User!
  }

  type Subscription {
    clubAdded: Club!
    teamAdded: Team!
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
