import { Meteor } from 'meteor/meteor';
import { Todos } from '../imports/todos.js';

// Meteor Methods
Meteor.methods({

  addTodo(text){
    if(!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    Todos.insert({
        text: text,
        createdAt: new Date(),
        userId: Meteor.userId(),
        username: Meteor.user().username
      });
  },
  deleteTodo(todoId){
     var todo = Todos.findOne(todoId);
     if(todo.userId !== Meteor.userId()){
       throw new Meteor.Error('not-authorized');
     }
     Todos.remove(todoId);
  },
  setChecked(todoId, setChecked){
     var todo = Todos.findOne(todoId);
     if(todo.userId !== Meteor.userId()){
       throw new Meteor.Error('not-authorized');
     }
    Todos.update(todoId, {$set:{checked: setChecked}});
  }

});
