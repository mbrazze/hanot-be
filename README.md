# HANOT Backend

HANOT is the backend component for a grassroots football management application. This project implements a GraphQL API using Apollo Server, providing endpoints to manage clubs, teams, managers, coaches, scouts, and players. It includes in‑memory test data for rapid development and testing in the Apollo Playground.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [Usage](#usage)
  - [Sample Queries](#sample-queries)
  - [Sample Mutations](#sample-mutations)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **GraphQL API**: Query, mutation, and subscription endpoints to manage all aspects of the football clubs.
- **Comprehensive Data Model**: Types include Club, Team, Manager, Coach, Scout, and Player, complete with custom scalars, enums (e.g., `EntityStatus`, `AgeGroup`, and `Position`), and interfaces.
- **In-Memory Test Data**: Two clubs, each with two teams (in different age groups), where every team includes:
  - 1 Manager
  - 2 Coaches
  - 1 Scout
  - 15 Players (each with full details like parent guardians, statistics, video highlights, and skills)
- **Mutation Endpoints**: Add new players and coaches via GraphQL mutations.
- **Apollo Server**: Standalone Apollo Server setup for ease of development and testing.

## Technologies

- **Node.js**: JavaScript runtime.
- **TypeScript**: Superset of JavaScript with static typing.
- **Apollo Server**: GraphQL server implementation.
- **GraphQL**: Query language for APIs.

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mbrazze/hanot-backend.git
   cd hanot-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Server

You can run the server directly using TypeScript with `ts-node`:

```bash
npx ts-node index.ts
```

Alternatively, compile the TypeScript files and run the compiled JavaScript:

```bash
tsc
node dist/index.js
```

Once running, you should see a message like:

```
🚀 Server ready at: http://localhost:4000
```

## Usage

### Sample Queries

You can access the Apollo Playground at [http://localhost:4000](http://localhost:4000) to run queries. For example:

```graphql
query {
  clubs {
    id
    name
    location
    teams {
      id
      name
      ageGroup
      manager {
        firstName
        lastName
      }
      coaches {
        firstName
        lastName
      }
      scouts {
        firstName
        lastName
      }
      players {
        id
        firstName
        lastName
        dateOfBirth
      }
    }
  }
}
```

### Sample Mutations

**Create a New Player:**

```graphql
mutation {
  createPlayer(
    teamId: "club1-team1"
    name: "New Player"
    dateOfBirth: "2013-05-05"
    positions: [MIDFIELDER]
    preferredFoot: "LEFT"
    region: "Region X"
  ) {
    id
    firstName
    lastName
    dateOfBirth
  }
}
```

**Create a New Coach:**

```graphql
mutation {
  createCoach(
    teamId: "club2-team2"
    name: "New Coach"
    contactNumber: "999-999-9999"
    email: "newcoach@example.com"
  ) {
    id
    firstName
    lastName
    email
    phone
  }
}
```

## Project Structure

```
hanot-backend/
├── index.ts          # Main entry point for the Apollo Server with schema and resolvers
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── README.md         # Project documentation
```

## Future Enhancements

- **Persistent Storage**: Integrate with a database (e.g., MongoDB, PostgreSQL) to persist data.
- **Authentication & Authorization**: Implement security features to protect sensitive data.
- **Expanded Mutations and Subscriptions**: Add more operations and real‑time updates.
- **Enhanced Error Handling & Validation**: Improve input validation and error management.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.  
For major changes, please open an issue first to discuss what you would like to change.

## Contact

For any questions or feedback, please contact [bryan.beale88@gmail.com].

---

Happy coding with HANOT!
