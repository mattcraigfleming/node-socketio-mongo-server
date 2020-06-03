to access protected route use header with jwt token

auth-token: djm,smabjkasdbkjasdbkjasbdkjasbdkjasbdkj

```
MONGO_URI=
MONGO_NAME=
MONGO_PASS=
JWT_SECRET=

```

```sh
api/
├── migrations     # Migrations for seeding the database with some initial data
├── models         # Handle talking to the database
├── mutations      # Mutation     resolvers
├── queries        # Query        resolvers
├── subscriptions  # Subscription resolvers
├── types          # The schema, split up into many smaller parts
│   └── scalars.js # The custom scalars we use in our schema and their resolvers
├── README.md
├── index.js       # Runs the actual servers (GraphQL + WebSocket for subscriptions)
└── schema.js      # Combines the types from types/ and the resolvers together with graphql-tools
```
