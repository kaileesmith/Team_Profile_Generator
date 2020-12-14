const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

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
                break;
            case "Engineer":
                    employee = new Engineer (employee_name, id, employee_email, employee_titleInput);
                    break;
            case "Intern":
                employee = new Intern (employee_name, id, employee_email, employee_titleInput );
                break;
                default:
                break;
        }
        employees.push(employee)
        console.log(employees);

    })
    .then((ask) =>{
        addAnother();

        })
    });
}

function addAnother(){
    inquirer.prompt([
        {
            type:"list",
            name: "addAnother",
            message:" Do you want to add another person to your team?",
            choices: ["yes","no"],
        },
    ])

    

    .then((data3) =>{
        if (data3.addAnother === "yes"){
            addEmployee();
        }else{
            renderMain();
            return;
        }
    })
}

function renderMain (){
    let HTML = render(employees);
    fs.writeFile(outputPath, HTML, (err) => {
        if (err) throw err
    })
};

addEmployee();