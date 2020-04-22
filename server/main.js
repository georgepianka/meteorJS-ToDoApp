import { Meteor } from 'meteor/meteor';
import { Todos } from '../imports/todos.js';

//import '../imports/accounts-config.js';

import '../imports/methods.js';

Meteor.publish('todos', function(){
    if(this.userId){
      return Todos.find({userId: this.userId});
    }
  });


Meteor.startup(() => {
  // code to run on server at startup
});
