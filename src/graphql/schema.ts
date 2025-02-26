import { gql } from 'graphql-tag';

const typeDefs = gql`
  scalar DateTime

  enum EntityStatus {
    ACTIVE
    INACTIVE
    DELETED
    PENDING
  }

  union User = Admin | Manager | Coach | Scout | Player

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

  enum AdminRole {
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
    adminAdmins: [Admin!]
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
    coaches: [Coach!]!
    players: [Player!]!
    scouts: [Scout!]!
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
    clubs: [Club!]!
    teams: [Team!]!
    city: String
    region: String
    parentGuardians: [ParentGuardian!]!
    statistics: Statistics
    videoHighlights: [VideoHighlight!]!
    skillsCompleted: Skills
  }

  type Admin implements BaseEntity {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    status: EntityStatus!
    firstName: String!
    lastName: String!
    email: String!
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
    teams: [Team!]!
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
    teams: [Team!]
  }

  enum InvitationType {
    DIRECT_ADD
    INVITATION
    REQUEST
  }

  enum InvitationStatus {
    PENDING
    ACCEPTED
    DECLINED
  }

  type Invitation implements BaseEntity {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    playerId: ID!
    teamId: ID!
    invitedBy: ID!
    type: InvitationType!
    status: InvitationStatus!
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
    admins: [Admin!]!
    admin(id: ID!): Admin
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
    ): Coach!
    updateCoach(
      id: ID!
      firstName: String
      lastName: String
      email: String
      phone: String
      status: EntityStatus
    ): Coach!
    deleteCoach(id: ID!): ID!

    createAdmin(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      role: AdminRole!
    ): Admin!
    updateAdmin(
      id: ID!
      firstName: String
      lastName: String
      email: String
      phone: String
      role: AdminRole
      status: EntityStatus
    ): Admin!
    deleteAdmin(id: ID!): Admin!
  }

  type Subscription {
    clubAdded: Club!
    teamAdded: Team!
    playerAdded: Player!
    adminAdded: Admin!
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

export default typeDefs;
