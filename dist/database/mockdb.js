// mockData/data.ts
const now = new Date().toISOString();
function createManager(clubId, teamId, suffix) {
    return {
        id: `${teamId}-manager`,
        createdAt: now,
        updatedAt: now,
        status: 'ACTIVE',
        firstName: 'John',
        lastName: suffix,
        email: `manager@${clubId}.com`,
        phone: '111-111-1111',
        teams: [],
    };
}
function createCoach(clubId, teamId, coachNum) {
    return {
        id: `${teamId}-coach${coachNum}`,
        createdAt: now,
        updatedAt: now,
        status: 'ACTIVE',
        firstName: 'Alice',
        lastName: `Coach${coachNum}`,
        email: `coach${coachNum}@${clubId}.com`,
        phone: '222-222-2222',
        teams: [],
    };
}
function createScout(clubId, teamId, ageGroup) {
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
        teams: [],
    };
}
function createPlayer(clubId, teamId, playerNum) {
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
            ballMasteryTier: ['Tier1'],
            passingTier: ['Tier1'],
            shootingTier: ['Tier1'],
            physicalTier: ['Tier1'],
            dribblingTier: ['Tier1'],
            footballIqTier: ['Tier1'],
        },
    };
}
export const clubs = [
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
                club: null, // will be set later
                manager: createManager('club1', 'club1-team1', 'One'),
                coaches: [
                    createCoach('club1', 'club1-team1', 1),
                    createCoach('club1', 'club1-team1', 2),
                ],
                scouts: [createScout('club1', 'club1-team1', 'UNDER_10')],
                players: Array.from({ length: 15 }, (_, i) => createPlayer('club1', 'club1-team1', i + 1)),
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
                players: Array.from({ length: 15 }, (_, i) => createPlayer('club1', 'club1-team2', i + 1)),
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
                players: Array.from({ length: 15 }, (_, i) => createPlayer('club2', 'club2-team1', i + 1)),
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
                players: Array.from({ length: 15 }, (_, i) => createPlayer('club2', 'club2-team2', i + 1)),
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
