1. build out context provider

- load firebase admin sdk firestore (either per collection or just pass in say, {storage: firebase.firestore()})
- get authorisation header from gql request
  - check jwt is valid against firebase.auth().verifyToken(<token>)
- add relevant (or whole) user data to the context
  This will let you do `context.user.uid` and `context.user.role` and check specific if needed in any resolver without requerying who is logged in

2. build out top level resolvers (queries and mutations)

- check user role if needed
- get data from firestore, scoped to specific user
- return data

3. build out any field resolvers

- skills on player? See example of `fullName` made of .firstName and .lastName
