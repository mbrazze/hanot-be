import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Admin = BaseEntity & {
  __typename?: 'Admin';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  status: EntityStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum AdminRole {
  ClubAdmin = 'CLUB_ADMIN',
  Coach = 'COACH',
  Player = 'PLAYER',
  Scout = 'SCOUT',
  SuperAdmin = 'SUPER_ADMIN',
  TeamManager = 'TEAM_MANAGER'
}

export enum AgeGroup {
  Open = 'OPEN',
  Under_7 = 'UNDER_7',
  Under_8 = 'UNDER_8',
  Under_9 = 'UNDER_9',
  Under_10 = 'UNDER_10',
  Under_11 = 'UNDER_11',
  Under_12 = 'UNDER_12',
  Under_13 = 'UNDER_13',
  Under_14 = 'UNDER_14',
  Under_15 = 'UNDER_15',
  Under_16 = 'UNDER_16',
  Under_17 = 'UNDER_17',
  Under_18 = 'UNDER_18',
  Under_19 = 'UNDER_19',
  Under_20 = 'UNDER_20',
  Under_21 = 'UNDER_21',
  Under_22 = 'UNDER_22',
  Under_23 = 'UNDER_23'
}

export type BaseEntity = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Club = BaseEntity & {
  __typename?: 'Club';
  adminAdmins?: Maybe<Array<Admin>>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: EntityStatus;
  teams?: Maybe<Array<Team>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ClubAdmin = BaseEntity & {
  __typename?: 'ClubAdmin';
  club: Club;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  status: EntityStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type Coach = BaseEntity & {
  __typename?: 'Coach';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  status: EntityStatus;
  teams?: Maybe<Array<Team>>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum EntityStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Inactive = 'INACTIVE',
  Pending = 'PENDING'
}

export type Invitation = BaseEntity & {
  __typename?: 'Invitation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  invitedBy: Scalars['ID']['output'];
  playerId: Scalars['ID']['output'];
  status: InvitationStatus;
  teamId: Scalars['ID']['output'];
  type: InvitationType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum InvitationStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

export enum InvitationType {
  DirectAdd = 'DIRECT_ADD',
  Invitation = 'INVITATION',
  Request = 'REQUEST'
}

export type Manager = BaseEntity & {
  __typename?: 'Manager';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  status: EntityStatus;
  teams: Array<Team>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAdmin: Admin;
  createClub: Club;
  createCoach: Coach;
  createPlayer: Player;
  createTeam: Team;
  deleteAdmin: Admin;
  deleteClub: Club;
  deleteCoach: Scalars['ID']['output'];
  deletePlayer: Player;
  deleteTeam: Team;
  updateAdmin: Admin;
  updateClub: Club;
  updateCoach: Coach;
  updatePlayer: Player;
  updateTeam: Team;
};


export type MutationCreateAdminArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role: AdminRole;
};


export type MutationCreateClubArgs = {
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateCoachArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};


export type MutationCreatePlayerArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  invitationType: InvitationType;
  lastName: Scalars['String']['input'];
  positions: Array<Position>;
  preferredFoot: Scalars['String']['input'];
  region?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateTeamArgs = {
  ageGroup: AgeGroup;
  clubId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationDeleteAdminArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteClubArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCoachArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePlayerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTeamArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAdminArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<AdminRole>;
  status?: InputMaybe<EntityStatus>;
};


export type MutationUpdateClubArgs = {
  id: Scalars['ID']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EntityStatus>;
};


export type MutationUpdateCoachArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EntityStatus>;
};


export type MutationUpdatePlayerArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  positions?: InputMaybe<Array<Position>>;
  preferredFoot?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EntityStatus>;
};


export type MutationUpdateTeamArgs = {
  ageGroup?: InputMaybe<AgeGroup>;
  clubId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EntityStatus>;
};

export type ParentGuardian = {
  __typename?: 'ParentGuardian';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type Player = BaseEntity & {
  __typename?: 'Player';
  city?: Maybe<Scalars['String']['output']>;
  clubs: Array<Club>;
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  parentGuardians: Array<ParentGuardian>;
  positions?: Maybe<Array<Position>>;
  preferredFoot: Scalars['String']['output'];
  region?: Maybe<Scalars['String']['output']>;
  skillsCompleted?: Maybe<Skills>;
  statistics?: Maybe<Statistics>;
  status: EntityStatus;
  teams: Array<Team>;
  updatedAt: Scalars['DateTime']['output'];
  videoHighlights: Array<VideoHighlight>;
};

export enum Position {
  Defender = 'DEFENDER',
  Forward = 'FORWARD',
  Goalkeeper = 'GOALKEEPER',
  Midfielder = 'MIDFIELDER'
}

export type Query = {
  __typename?: 'Query';
  admin?: Maybe<Admin>;
  admins: Array<Admin>;
  club?: Maybe<Club>;
  clubs: Array<Club>;
  coach?: Maybe<Coach>;
  coaches: Array<Coach>;
  manager?: Maybe<Manager>;
  managers: Array<Manager>;
  me: User;
  myTeams: Array<Team>;
  pendingInvitations: Array<Invitation>;
  player?: Maybe<Player>;
  playerRequests: Array<Invitation>;
  players: Array<Player>;
  scout?: Maybe<Scout>;
  scouts: Array<Scout>;
  team?: Maybe<Team>;
  teamPlayers: Array<Player>;
  teams: Array<Team>;
};


export type QueryAdminArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClubArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCoachArgs = {
  id: Scalars['ID']['input'];
};


export type QueryManagerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPlayerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryScoutArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTeamArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTeamPlayersArgs = {
  teamId: Scalars['ID']['input'];
};

export type Scout = BaseEntity & {
  __typename?: 'Scout';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  status: EntityStatus;
  teams?: Maybe<Array<Team>>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum SkillLevel {
  Bronze = 'BRONZE',
  Gold = 'GOLD',
  Plat = 'PLAT',
  Silver = 'SILVER'
}

export type SkillLevels = {
  __typename?: 'SkillLevels';
  completedAt: Scalars['DateTime']['output'];
  level: SkillLevel;
};

export type Skills = {
  __typename?: 'Skills';
  ballMasteryTier: Array<SkillLevels>;
  dribblingTier: Array<SkillLevels>;
  footballIqTier: Array<SkillLevels>;
  passingTier: Array<SkillLevels>;
  physicalTier: Array<SkillLevels>;
  shootingTier: Array<SkillLevels>;
};

export type Statistics = {
  __typename?: 'Statistics';
  assists?: Maybe<Scalars['Int']['output']>;
  cleanSheets?: Maybe<Scalars['Int']['output']>;
  gamesPlayed?: Maybe<Scalars['Int']['output']>;
  goalsScored?: Maybe<Scalars['Int']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  adminAdded: Admin;
  clubAdded: Club;
  playerAdded: Player;
  teamAdded: Team;
};

export type Team = BaseEntity & {
  __typename?: 'Team';
  ageGroup: AgeGroup;
  club: Club;
  coaches: Array<Coach>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  manager?: Maybe<Manager>;
  name: Scalars['String']['output'];
  players: Array<Player>;
  scouts: Array<Scout>;
  status: EntityStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type User = Admin | ClubAdmin | Coach | Manager | Player | Scout;

export type VideoHighlight = {
  __typename?: 'VideoHighlight';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  User: ( Admin ) | ( ClubAdmin ) | ( Coach ) | ( Manager ) | ( Player ) | ( Scout );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  BaseEntity: ( Admin ) | ( Club ) | ( ClubAdmin ) | ( Coach ) | ( Invitation ) | ( Manager ) | ( Player ) | ( Scout ) | ( Team );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Admin: ResolverTypeWrapper<Admin>;
  AdminRole: AdminRole;
  AgeGroup: AgeGroup;
  BaseEntity: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseEntity']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Club: ResolverTypeWrapper<Club>;
  ClubAdmin: ResolverTypeWrapper<ClubAdmin>;
  Coach: ResolverTypeWrapper<Coach>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EntityStatus: EntityStatus;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Invitation: ResolverTypeWrapper<Invitation>;
  InvitationStatus: InvitationStatus;
  InvitationType: InvitationType;
  Manager: ResolverTypeWrapper<Manager>;
  Mutation: ResolverTypeWrapper<{}>;
  ParentGuardian: ResolverTypeWrapper<ParentGuardian>;
  Player: ResolverTypeWrapper<Player>;
  Position: Position;
  Query: ResolverTypeWrapper<{}>;
  Scout: ResolverTypeWrapper<Scout>;
  SkillLevel: SkillLevel;
  SkillLevels: ResolverTypeWrapper<SkillLevels>;
  Skills: ResolverTypeWrapper<Skills>;
  Statistics: ResolverTypeWrapper<Statistics>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Team: ResolverTypeWrapper<Team>;
  User: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['User']>;
  VideoHighlight: ResolverTypeWrapper<VideoHighlight>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Admin: Admin;
  BaseEntity: ResolversInterfaceTypes<ResolversParentTypes>['BaseEntity'];
  Boolean: Scalars['Boolean']['output'];
  Club: Club;
  ClubAdmin: ClubAdmin;
  Coach: Coach;
  DateTime: Scalars['DateTime']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Invitation: Invitation;
  Manager: Manager;
  Mutation: {};
  ParentGuardian: ParentGuardian;
  Player: Player;
  Query: {};
  Scout: Scout;
  SkillLevels: SkillLevels;
  Skills: Skills;
  Statistics: Statistics;
  String: Scalars['String']['output'];
  Subscription: {};
  Team: Team;
  User: ResolversUnionTypes<ResolversParentTypes>['User'];
  VideoHighlight: VideoHighlight;
};

export type AdminResolvers<ContextType = any, ParentType extends ResolversParentTypes['Admin'] = ResolversParentTypes['Admin']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EntityStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseEntity'] = ResolversParentTypes['BaseEntity']> = {
  __resolveType: TypeResolveFn<'Admin' | 'Club' | 'ClubAdmin' | 'Coach' | 'Invitation' | 'Manager' | 'Player' | 'Scout' | 'Team', ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type ClubResolvers<ContextType = any, ParentType extends ResolversParentTypes['Club'] = ResolversParentTypes['Club']> = {
  adminAdmins?: Resolver<Maybe<Array<ResolversTypes['Admin']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EntityStatus'], ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<ResolversTypes['Team']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClubAdminResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubAdmin'] = ResolversParentTypes['ClubAdmin']> = {
  club?: Resolver<ResolversTypes['Club'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EntityStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoachResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coach'] = ResolversParentTypes['Coach']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EntityStatus'], ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<ResolversTypes['Team']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type InvitationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invitation'] = ResolversParentTypes['Invitation']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invitedBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  playerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['InvitationStatus'], ParentType, ContextType>;
  teamId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['InvitationType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManagerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Manager'] = ResolversParentTypes['Manager']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EntityStatus'], ParentType, ContextType>;
  teams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAdmin?: Resolver<ResolversTypes['Admin'], ParentType, ContextType, RequireFields<MutationCreateAdminArgs, 'email' | 'firstName' | 'lastName' | 'phone' | 'role'>>;
  createClub?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<MutationCreateClubArgs, 'name'>>;
  createCoach?: Resolver<ResolversTypes['Coach'], ParentType, ContextType, RequireFields<MutationCreateCoachArgs, 'email' | 'firstName' | 'lastName' | 'phone' | 'teamId'>>;
  createPlayer?: Resolver<ResolversTypes['Player'], ParentType, ContextType, RequireFields<MutationCreatePlayerArgs, 'dateOfBirth' | 'firstName' | 'invitationType' | 'lastName' | 'positions' | 'preferredFoot'>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'ageGroup' | 'clubId' | 'name'>>;
  deleteAdmin?: Resolver<ResolversTypes['Admin'], ParentType, ContextType, RequireFields<MutationDeleteAdminArgs, 'id'>>;
  deleteClub?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<MutationDeleteClubArgs, 'id'>>;
  deleteCoach?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteCoachArgs, 'id'>>;
  deletePlayer?: Resolver<ResolversTypes['Player'], ParentType, ContextType, RequireFields<MutationDeletePlayerArgs, 'id'>>;
  deleteTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationDeleteTeamArgs, 'id'>>;
  updateAdmin?: Resolver<ResolversTypes['Admin'], ParentType, ContextType, RequireFields<MutationUpdateAdminArgs, 'id'>>;
  updateClub?: Resolver<ResolversTypes['Club'], ParentType, ContextType, RequireFields<MutationUpdateClubArgs, 'id'>>;
  updateCoach?: Resolver<ResolversTypes['Coach'], ParentType, ContextType, RequireFields<MutationUpdateCoachArgs, 'id'>>;
  updatePlayer?: Resolver<ResolversTypes['Player'], ParentType, ContextType, RequireFields<MutationUpdatePlayerArgs, 'id'>>;
  updateTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationUpdateTeamArgs, 'id'>>;
};

export type ParentGuardianResolvers<ContextType = any, ParentType extends ResolversParentTypes['ParentGuardian'] = ResolversParentTypes['ParentGuardian']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clubs?: Resolver<Array<ResolversTypes['Club']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dateOfBirth?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentGuardians?: Resolver<Array<ResolversTypes['ParentGuardian']>, ParentType, ContextType>;
  positions?: Resolver<Maybe<Array<ResolversTypes['Position']>>, ParentType, ContextType>;
  preferredFoot?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skillsCompleted?: Resolver<Maybe<ResolversTypes['Skills']>, ParentType, ContextType>;
  statistics?: Resolver<Maybe<ResolversTypes['Statistics']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EntityStatus'], ParentType, ContextType>;
  teams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  videoHighlights?: Resolver<Array<ResolversTypes['VideoHighlight']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  admin?: Resolver<Maybe<ResolversTypes['Admin']>, ParentType, ContextType, RequireFields<QueryAdminArgs, 'id'>>;
  admins?: Resolver<Array<ResolversTypes['Admin']>, ParentType, ContextType>;
  club?: Resolver<Maybe<ResolversTypes['Club']>, ParentType, ContextType, RequireFields<QueryClubArgs, 'id'>>;
  clubs?: Resolver<Array<ResolversTypes['Club']>, ParentType, ContextType>;
  coach?: Resolver<Maybe<ResolversTypes['Coach']>, ParentType, ContextType, RequireFields<QueryCoachArgs, 'id'>>;
  coaches?: Resolver<Array<ResolversTypes['Coach']>, ParentType, ContextType>;
  manager?: Resolver<Maybe<ResolversTypes['Manager']>, ParentType, ContextType, RequireFields<QueryManagerArgs, 'id'>>;
  managers?: Resolver<Array<ResolversTypes['Manager']>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  myTeams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>;
  pendingInvitations?: Resolver<Array<ResolversTypes['Invitation']>, ParentType, ContextType>;
  player?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<QueryPlayerArgs, 'id'>>;
  playerRequests?: Resolver<Array<ResolversTypes['Invitation']>, ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  scout?: Resolver<Maybe<ResolversTypes['Scout']>, ParentType, ContextType, RequireFields<QueryScoutArgs, 'id'>>;
  scouts?: Resolver<Array<ResolversTypes['Scout']>, ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType, RequireFields<QueryTeamArgs, 'id'>>;
  teamPlayers?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<QueryTeamPlayersArgs, 'teamId'>>;
  teams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>;
};

export type ScoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Scout'] = ResolversParentTypes['Scout']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EntityStatus'], ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<ResolversTypes['Team']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillLevelsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SkillLevels'] = ResolversParentTypes['SkillLevels']> = {
  completedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['SkillLevel'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Skills'] = ResolversParentTypes['Skills']> = {
  ballMasteryTier?: Resolver<Array<ResolversTypes['SkillLevels']>, ParentType, ContextType>;
  dribblingTier?: Resolver<Array<ResolversTypes['SkillLevels']>, ParentType, ContextType>;
  footballIqTier?: Resolver<Array<ResolversTypes['SkillLevels']>, ParentType, ContextType>;
  passingTier?: Resolver<Array<ResolversTypes['SkillLevels']>, ParentType, ContextType>;
  physicalTier?: Resolver<Array<ResolversTypes['SkillLevels']>, ParentType, ContextType>;
  shootingTier?: Resolver<Array<ResolversTypes['SkillLevels']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatisticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Statistics'] = ResolversParentTypes['Statistics']> = {
  assists?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  cleanSheets?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  gamesPlayed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  goalsScored?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  adminAdded?: SubscriptionResolver<ResolversTypes['Admin'], "adminAdded", ParentType, ContextType>;
  clubAdded?: SubscriptionResolver<ResolversTypes['Club'], "clubAdded", ParentType, ContextType>;
  playerAdded?: SubscriptionResolver<ResolversTypes['Player'], "playerAdded", ParentType, ContextType>;
  teamAdded?: SubscriptionResolver<ResolversTypes['Team'], "teamAdded", ParentType, ContextType>;
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  ageGroup?: Resolver<ResolversTypes['AgeGroup'], ParentType, ContextType>;
  club?: Resolver<ResolversTypes['Club'], ParentType, ContextType>;
  coaches?: Resolver<Array<ResolversTypes['Coach']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  manager?: Resolver<Maybe<ResolversTypes['Manager']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  scouts?: Resolver<Array<ResolversTypes['Scout']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EntityStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  __resolveType: TypeResolveFn<'Admin' | 'ClubAdmin' | 'Coach' | 'Manager' | 'Player' | 'Scout', ParentType, ContextType>;
};

export type VideoHighlightResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoHighlight'] = ResolversParentTypes['VideoHighlight']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Admin?: AdminResolvers<ContextType>;
  BaseEntity?: BaseEntityResolvers<ContextType>;
  Club?: ClubResolvers<ContextType>;
  ClubAdmin?: ClubAdminResolvers<ContextType>;
  Coach?: CoachResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Invitation?: InvitationResolvers<ContextType>;
  Manager?: ManagerResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ParentGuardian?: ParentGuardianResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Scout?: ScoutResolvers<ContextType>;
  SkillLevels?: SkillLevelsResolvers<ContextType>;
  Skills?: SkillsResolvers<ContextType>;
  Statistics?: StatisticsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VideoHighlight?: VideoHighlightResolvers<ContextType>;
};

