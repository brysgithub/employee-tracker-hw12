// const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');

async function selectionMenu() {

    const userOptions = await inquirer.prompt([
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
                return updateEmployeeRole();
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
            message: 'Enter name of Department:'
        }
    ])
    .then((answer) => {
        let listDepartments = ('INSERT INTO departments (department_name) VALUES (?)');
        db.query(listDepartments, answer.department_name, (err, res) => {
            if (err) throw err; 
        })
    })
    selectionMenu();
};

// Add role - CREATE -
async function addRole() {
    // SELECT the existing departments out of the `roles` table
    const departments = await db.query('SELECT * FROM departments');

    // .map the results fom `roles` to the question for inquirer data
    const choices = departments.map((department) => {
        return {
            name: department.department_name,
            value: department.id
        }
    })

    // THEN prompt the user for role information (inquirer)
    const addRoleAnswer = await inquirer.prompt([
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
            message: 'Enter role salary:'
        },
    ]);

    // Take the user's answers and INSERT them into the `roles` table
    await db.query(
        "INSERT INTO roles (role_title, salary, department_id) VALUES (?, ?, ?)",
        [addRoleAnswer.role_title, addRoleAnswer.salary, addRoleAnswer.department_id]
    )
    selectionMenu();
}

// Add employee - CREATE -
async function addEmployee() {
    // SELECT the existing employees out of the `employees` table
    const employees = await db.query('SELECT * FROM employees');

    // SELECT the existing roles out of the `roles` table
    const roles = await db.query('SELECT * FROM roles');

    const displayRoles = roles.map((role) => {
        return {
            name: role.role_title,
            value: role.id
        }
    })

    const displayManagers = employees.map((employees) => {
        return {
            name: [employees.first_name + " " + employees.last_name],
            value: employees.id
        }
    })

    // THEN prompt the user for employee information (inquirer)
    const addEmployeeAnswer = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter last name:'
        },
        {
            type: 'list',
            name: 'roles_id',
            message: 'Assign role:',
            choices: displayRoles,
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Assign manager:',
            choices: displayManagers,
        }
    ]);

    await db.query(
        "INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)",
        [addEmployeeAnswer.first_name, addEmployeeAnswer.last_name, addEmployeeAnswer.roles_id, addEmployeeAnswer.manager_id]
    )
    selectionMenu();
}


// Update an employee
async function updateEmployeeRole () {
    // SELECT the existing employees out of the `employees` table
    const employees = await db.query('SELECT * FROM employees');

    // SELECT the existing roles out of the `roles` table
    const roles = await db.query('SELECT * FROM roles');

    const displayEmployees = employees.map((employees) => {
        return {
            name: [employees.first_name + " " + employees.last_name],
            value: employees.id
        }
    })
    const displayRoles = roles.map((role) => {
        return {
            name: role.role_title,
            value: role.id
        }
    })

    const updateEmployeeAnswer = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Choose employee to update:',
            choices: displayEmployees,
        },
        {
            type: 'list',
            name: 'roles_id',
            message: 'Assign role:',
            choices: displayRoles,
        },
    ])

    await db.query(
        "UPDATE employees SET roles_id = (?) WHERE employees.id = (?)",
        [updateEmployeeAnswer.roles_id, updateEmployeeAnswer.employee_id]
    )
    selectionMenu();
}


selectionMenu();