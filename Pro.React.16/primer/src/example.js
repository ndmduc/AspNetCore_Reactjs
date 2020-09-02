import oddOnly, {sumValues} from './sum';
// import { multiply, subtract as deduct } from './operations';
import * as ops from './operations';
import {asyncAdd} from './async';


console.log("From example.js");
console.log("Apples");
console.log("This is a statement");
console.log("This is also a statement");

//// Function
function myFunc(name, weather='raining'){
    console.log("Hello " + name + ".");
console.log("It is " + weather + " today.");
}

console.log('This is statement outside the function');

function myFunc1(name, weather, ...extraArgs){
    console.log("Hello " + name + ".");
    console.log("It is " + weather + " today.");
    for(let i=0; i<extraArgs.length; i++){
        console.log("Extra Arg: " + extraArgs[i]);
    }
}

myFunc1('adama', 'raining', 'one', 'two');

function myFunc2(nameFunction){
    return ('Hello ' + nameFunction() + '.');
}

console.log(myFunc2(function () {
    return 'Adam';
}))

const myFunc3 = (nameFunction) => ('Hello ' + nameFunction() + '.');
const printName = (nameFunction, printFunction) => 
    printFunction(myFunc3(nameFunction));
printName(function () { return 'Adam'; }, console.log);

//// Variable and Types
/*The let keyword is used to declare variables and, optionally, assign a value to the variable in a single
statement—as opposed to the const keyword I used in earlier examples, which creates a constant value that
cannot be modified*/
// function messageFunction(name, weather){
//     let message = 'Hello, Adam';
//     if(weather === 'sunny'){
//         let message = 'It is a nice day';
//         console.log(message);
//     } else {
//         let message = 'It is ' + weather + ' today';
//         console.log(message);
//     }
//     console.log(message);
// }
function messageFunction(name, weather) { 
    //var keyword creates variables whose scope is the containing function
    var message = "Hello, Adam";
    if (weather === "sunny") {
        var message = "It is a nice day";
        console.log(message);
    } else {
        var message = "It is " + weather + " today";
        console.log(message);
    }
    console.log(message);
    }
messageFunction("Adam", "raining");

/*
if you define a function inside another function—creating inner and outer functions—then the inner
function is able to access the outer function’s variables, using a feature called closure, like this:
*/
function myFunc4(name){
    let myLocalVar = 'sunny';
    const innerFunction = function(){
        return ('Hello ' + name + '. Today is ' + myLocalVar + '.');
    }

    return innerFunction();
}
console.log(myFunc4("Adam"));

//// Template string
let weather = 'raining';
let message = `Today is ${weather} day`;

//// Equality vs Indentity (== vs ===)
/*
The equality and identity operators are of particular note. The equality operator will attempt to coerce
(convert) operands to the same type to assess equality
*/
let firstVal = 5;
let secondVal = '5';
if (firstVal == secondVal){
    console.log("They are the same");
} else {
    console.log("They are NOT the same");
}

////Explicitly Converting Types
let myData1 = 5 + 5;
let myData2 = 5 + "5";
console.log("Result 1: " + myData1);
console.log("Result 2: " + myData2);

////Enumerating the Contents of an Array
let myArray = [100, "Adam", true];
for (let i = 0; i < myArray.length; i++) {
    console.log(`Index ${i}: ${myArray[i]}`);
}
console.log("---");
myArray.forEach((value, index) => console.log(`Index ${index}: ${value}`));

// Using the spread operator (...)
function printItems(numValue, stringValue, boolValue) {
    console.log(`Number: ${numValue}`);
    console.log(`String: ${stringValue}`);
    console.log(`Boolean: ${boolValue}`);
}

printItems(myArray[0], myArray[1], myArray[2]);
printItems(...myArray); //the array to be unpacked and passed to the printItems

let myOtherArray = [200, "Bob", false, ...myArray];
myOtherArray.forEach((value, index) => console.log(`Index ${index}: ${value}`));

//// Using Functions as Methods
let myData = {
    name: 'Adam',
    weather: 'sunnu',
    printMessage: function() {
        console.log(`Hello ${myData.name}.`);
        console.log(`Today is ${myData.weather}.`); 
    }
}

//// Copy properties from one object to another
class MyData3 {
    constructor() {
        this.name = "Adam";
        this.weather = "sunny";
    }
    printMessages = () => {
        console.log(`Hello ${this.name}.`);
        console.log(`Today is ${this.weather}.`);
    }
}
let myDataa = new MyData3();
let secondObject = {};
Object.assign(secondObject, myDataa);
secondObject.printMessages();

let secondObject1 = {...myDataa, weather:'cloudy'};
console.log(`myData: ${myDataa.name} + ${secondObject1.weather}`);

//// Capturing parameter name of Object
const myData4 = {
    name: 'Bob',
    location: {
        city: 'Paris',
        country: 'France'
    },
    employment: {
        title: 'Manager',
        dept: 'Sales'
    }
}

// function printDetails(data){
//     console.log(`Name: ${data.name}, City: ${data.location.city},
//                 Role: ${data.employment.title}`);
// }
function printDetails({ name, location: {city}, employment: {title}}){
    console.log(`Name: ${name}, City: ${city}, Role: ${title}`);
}
printDetails(myData4);

//// Module
let values = [10, 20, 30, 40 ,50];
let total = sumValues(values);
let odd = oddOnly(values);
console.log(`Total: ${total}, OddTotal: ${odd}`);
console.log(`Multiply: ${ops.multiply(values)}`);
console.log(`Subtract: ${ops.subtract(1000, values)}`);


//// Promise
// let total1 = asyncAdd(values);
// console.log(`Main Total: ${total1}`);
asyncAdd(values).then(total1 => console.log(`MainTotal: ${total1}`));

////Async Await
async function doTask(){
    let total = await asyncAdd(values);
    console.log(`Main Total: ${total}`);
}

doTask();