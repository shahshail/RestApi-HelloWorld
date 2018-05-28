/**
 * This is Node Play Ground for simply practicing basic javaScript syntax and function declaration for NodeJs and Express Development
 * 
 */

 console.log("Hello from Node..")
 
 //Basic function Syntax for JavaScript
 function myFunc(){
    console.log("Hello from myFunc")
 }

 //You can also create a variable reference for the functiom
 var newFunc = function myFunc(){
    console.log("Hello from newFunc")
 }

 newFunc(); // Hello form newFunc

 // You can also create function to be called in specific time 
 var printMe = function(){
        console.log("It has been 2 secs")
 }

 setTimeout(printMe,2000)

 // you can also create javaScript Object Notation(JSON) or JavaScript Object
 var person = {
     firstName : "Shail",
     lastName : "Shah",
     age : 25

 }; // NOTE : you can not use "=" sign.. You have to use  ":" because it is a HashMap..

 console.log(JSON.stringify(person))
 