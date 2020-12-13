const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

let employees = [];
let id= 0;

function addEmployee (){

    id ++;

    inquirer.prompt([
        {
            type:"input",
            name: "name",
            message: "What is the employee's name?"
        },
        {
            type:"input",
            name: "email",
            message: "What is the employee's email?"
        },
        {
            type:"list",
            name: "position",
            message: "What is the employee's position?",
            choices:["Manager", "Engineer", "Intern"],
    
        },

    ])

    .then((data) =>{
        
        let titleQuestion = "";
        let employee_name = "";
        let employee_title = "";
        let employee_titleInput = "";
        let employee_email = "";

    if(data.position === "Manager"){
        titleQuestion = "What is their office number?";
        employee_name = data.name;
        employee_title = data.position;
        employee_email = data.email;

    } else if(data.position === "Engineer"){
        titleQuestion = "What is their GitHub?";
        employee_name = data.name;
        employee_title = data.position;
        employee_email = data.email;

    }else if(data.position === "Intern"){
        titleQuestion = "Where do/did they go to School?";
        employee_name = data.name;
        employee_title = data.position;
        employee_email = data.email;
    };
inquirer.prompt([
    {
        name: "titleInput",
        type: "input",
        message: titleQuestion 
    }
])
    .then((data2) =>{

        employee_titleInput = data2.titleInput;

        switch(employee_title){
            case "Manager":
                employee = new Manager (employee_name, id, employee_email, employee_titleInput);

            case "Engineer":
                    employee = new Engineer (employee_name, id, employee_email, employee_titleInput);

            case "Intern":
                employee = new Intern (employee_name, id, employee_email, employee_titleInput );
        }
        employees.push(employee)
        console.log(employees);

    })


    )


    })




}

// let questions = [
//     {
//         type:"input",
//         name: "name",
//         message: "What is the employee's name?"
//     },
//     {
//         type:"list",
//         name: "position",
//         message: "What is the employee's position?",
//         choices:["Manager", "Engineer", "Intern"]

//     },

// ]

addEmployee();