Todos = require('/todos').Todos
Collection {_transform: null, _connection: Connection, _collection: LocalCollection, _name: "todos", _makeNewID: ƒ, …}
Todos.insert({text:"First Note", createdAt:new Date()})
"hDcvGEM2bcZM88sNx"

# Access Database through mongo terminal

> meteor mongo

> meteor:PRIMARY> db.todos.find().pretty()


# https://guide.meteor.com/security.html#secret-code

Secret business logic in your app should be located in code that is only loaded on the server. This means it is in a server/ directory of your app, in a package that is only included on the server, or in a file inside a package that was loaded only on the server.

If you have a Meteor Method in your app that has secret business logic, you might want to split the Method into two functions - the optimistic UI part that will run on the client, and the secret part that runs on the server. Most of the time, putting the entire Method on the server doesn’t result in the best user experience. Let’s look at an example, where you have a secret algorithm for calculating someone’s MMR (ranking) in a game:

// In a server-only file, for example /imports/server/mmr.js
export const MMR = {
  updateWithSecretAlgorithm(userId) {
    // your secret code here
  }
}
// In a file loaded on client and server
Meteor.users.methods.updateMMR = new ValidatedMethod({
  name: 'Meteor.users.methods.updateMMR',
  validate: null,
  run() {
    if (this.isSimulation) {
      // Simulation code for the client (optional)
    } else {
      const { MMR } = require('/imports/server/mmr.js');
      MMR.updateWithSecretAlgorithm(this.userId);
    }
  }
});
Note that while the Method is defined on the client, the actual secret logic is only accessible from the server. Keep in mind that code inside if (Meteor.isServer) blocks is still sent to the client, it is just not executed. So don’t put any secret code in there.

Secret API keys should never be stored in your source code at all, the next section will talk about how to handle them.
