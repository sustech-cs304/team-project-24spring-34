# CS304 Project

A "Campus Events and Entertainment Center" system.

## Getting Started

### Installing

1. Create a database named `cs304_project` in MySQL, and run the SQL script `create_database.sql` to create the tables.
2. Install the npm packages for the client and server.

   ```bash
   # Download the npm package
   pushd client
   pnpm install
   popd
   pushd server
   pnpm install
   popd
   ```

### Running

```bash
# Run the server
cd server
node server.js

# Run the client
cd client
pnpm start
```
