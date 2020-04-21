import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './main.css';
import './main.html';
import { Todos } from '../imports/todos.js';
import '../imports/accounts-config.js';
import '../imports/methods.js';


Template.main.helpers({
  todos() {
      return Todos.find({}, {sort: {createdAt: -1}});
  }
});

Template.main.events({
  'submit .new-todo'(event){
    event.preventDefault();
    let text = event.target.text.value;
    Meteor.call('addTodo', text);
    event.target.text.value=''
  },

  'click .toggle-checked'(){
    //The helper's implementation can access the current data context as this.
    //Basically, whenever you use a block tag like #each, it creates a new data context, in which //helper methods and the block are evaluated.
    Meteor.call('setChecked', this._id, !this.checked)
  },

  'click .delete-todo'(){
    if(confirm('Are You Sure?')){
      Meteor.call('deleteTodo', this._id);
    }
  }
});



//window.Todos = Todos; // here we make it global

/*And then as long as this file is imported by client/main.js, you can use Todos on the console.

This is fine for small apps and testing stuff, but increases the likelihood of name collisions and makes it harder to understand where code is coming from in larger apps.

If you want to do things the "right" way for a module system, you can access the exports of a module in the console with require:

> Todos = require('/todos').Todos

*/

/*Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

*/
