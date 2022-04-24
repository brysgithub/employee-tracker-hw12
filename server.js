// const fs = require('fs');
const mysql = require('mysql2');
// const path = require('path');
const inquirer = require('inquirer');
const db = require('./db/connection');
const utils = require('util');

// const answers = await inquirer.prompt([{
//     type:"list",
//     name:"department",
//     question:"Choice of Department",
//     choices: [
//         { name: "Sales", value: 1 },
//         { name: "Accounting", value: 2 },
//     ]
// }])
async function selectionMenu() {

    const {userOptions} = await inquirer.prompt([
        {
            name: 'userOptions',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                "View all Employees",
                // "View all Employees by Department",
                // "View all Employees by Manager",
                "View all Roles",
                "View all Departments",
                "Add Employee",
                "Add Role",
                "Add Department",
                // "Remove Employee",
                // "Remove Role",
                // "Remove Department",
                "Update Employee Role",
                // "Update Employee Manager",
                // "View budget by Department",
                "Exit"
            ]
        }
    ])
    
    .then(res => {
        switch(res.userOptions) {
            case 'View all Employees':
                return viewAllEmployees();
            case 'View all Roles':
                return viewAllRoles();
            case 'View all Departments':
                return viewAllDepartments();
            case 'Add Employee':
                return addEmployee();
            case 'Add Role':
                return addRole();
            case 'Add Department':
                return addDepartment();
            case 'Update Employee Role':
                return viewAllRoles();
            case 'Exit':
                process.exit();
    }
})
}
// View all department - READ - "SELECt * FROM [table_name];"
async function viewAllDepartments() {
    const departments = await db.query('SELECT * FROM departments');
    console.table(departments);
    selectionMenu();
};

// View all roles - READ - "SELECt * FROM [table_name];"
async function viewAllRoles() {
    const roles = await db.query('SELECT * FROM roles');
    console.table(roles);
    selectionMenu();
};

// view all employees - READ - "SELECt * FROM [table_name];"
async function viewAllEmployees() {
    const employees = await db.query('SELECT * FROM employees');
    console.table(employees);
    selectionMenu();
};

// - Add - //
// Add department - CREATE - "INSERT INTO [table_name] (col1, col2) VALUES (value1, value2) ("
async function addDepartment() {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Enter name of Department.'
        }
    ])
    .then((answer) => {
        let listDepartments = ('INSERT INTO departments (department_name) VALUES (?)');
        db.query(listDepartments, answer.department_name, (err, res) => {
            if (err) throw err;
            console.log("Department added to DB")
        })
    })
    selectionMenu();
};

// Add role - CREATE -
async function addRole() {
    // SELECT the existing departments out of the `roles` table
    const departments = ('SELECT * FROM role');

    // .map the results fom `roles` to the question for inquirer data
    const choices = departments.map(departments => {
        return {
            name: departments.department_name,
            value: departments.id
        }
    })
    
    const roleAnswer = await inquirer.prompt([
        {
            type: "list",
            name: "department_id",
            message: "Select a Department.",
            choices: choices
        },
        {
            type: 'input',
            name: 'role_title',
            message: 'Enter role Title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Input role salary:'
        },
    ])
    selectionMenu();
}


        const departments = {
            
        }


        // THEN prompt the user for role information (inquirer)

            // Take the user's answers and INSERT them into the `roles` table

// Add employee - CREATE -
async function addEmployee() {

}


// Update an employee