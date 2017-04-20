class Person {
    constructor(fullName, favColor){
        this.name = fullName;
        this.favoriteColor = favColor;
    }

    greet () {
        console.log('Hi there!!, my name is ' + this.name + ' and my favorite color is ' + this.favoriteColor);
    }
}

// module.exports = Person;
export default Person;

console.log('Hello from person.js');