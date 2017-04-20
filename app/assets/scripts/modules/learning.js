var $ = require('jquery');

 //var Person = require('./modules/Person');
 import Person from './modules/Person'; //ES6 WAY!!

 class Adult extends Person {
 payTaxes(){
 console.log(this.name + ' now owes $0 in taxes.');
 }
 }

 var john = new Person('John Doe', 'blue');
 john.greet();

 var jane = new Adult('Jane smith', 'lightBlue');
 jane.greet();
 jane.payTaxes();

 alert('test 0001abcde');

 console.log('test');

 $('h1').remove();