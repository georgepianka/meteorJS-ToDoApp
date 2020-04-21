Todos = require('/todos').Todos
Collection {_transform: null, _connection: Connection, _collection: LocalCollection, _name: "todos", _makeNewID: ƒ, …}
Todos.insert({text:"First Note", createdAt:new Date()})
"hDcvGEM2bcZM88sNx"

# Access Database through mongo terminal

> meteor mongo

> meteor:PRIMARY> db.todos.find().pretty()
