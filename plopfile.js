const config = require('./config.json')
const { toPascalCase, getChainID } = require('./helper')

module.exports = function (plop) {
    // timInput: removing extra spaces from user inputs
    plop.setHelper('trimInput', function (input) {
		return input.trim();
    });
    
    // Init generator generates some scripts that will make directories, install dependencies,
    // and runs commands to generate common code required by a project in our backend 
    // according to operating system that chose earlier
    plop.setGenerator('init', {
        description: 'preparing shell scripts',
        prompts: [
            {
                type: 'list',
                name: 'os',
                message: 'Choose Operating system:',
                choices:["Linux/MacOS", "Windows"] 
            },
            {
                type: 'input',
                name: 'backendDirName',
                message: 'Enter backend directory name:',
                default: 'hardhat-tutorial',
            },
            {
                type: 'input',
                name: 'contractName',
                message: 'Enter contract name:',
            },
            {
                type: 'list',
                name: 'network',
                message: 'Choose the network!:',
                choices: ["Rinkeby", "Ropsten", "Mumbai", "Ceramic", "Graph"],
            },
            {
                type: 'input',
                name: 'frontendDirName',
                message: 'Enter frontend directory name:',
                default: 'my-app'
            }

        ],
        actions: function(data) {
            var actions = [];

            if(data.os == "Windows") {
                actions.push(
                    {
                        type: "add",
                        path: "./config.json",
                        templateFile: 'plop-templates/config.hbs'
                    },
                    {
                        type: "add",
                        path: "./backend.bat",
                        templateFile: 'plop-templates/scripts/windows/backend.hbs'
                    },
                    {
                        type: "add",
                        path: "./frontend.bat",
                        templateFile: 'plop-templates/scripts/windows/frontend.hbs'
                    },
                    {
                        type: 'add',
                        path: './package.json',
                        templateFile: 'plop-templates/package.hbs',               
                    },
                );
            } else {
                actions.push(
                    {
                        type: "add",
                        path: "./config.json",
                        templateFile: 'plop-templates/config.hbs'
                    },
                    {
                        type: "add",
                        path: "./backend.sh",
                        templateFile: 'plop-templates/scripts/backend.hbs'
                    },
                    {
                        type: "add",
                        path: "./frontend.sh",
                        templateFile: 'plop-templates/scripts/frontend.hbs'
                    }
                );
            }
            return actions;
        }
    });

    // backend-generator: create files and generates code for backend
    // that is required by a common project
    plop.setGenerator('backend-generator', {
        description: 'installing and generating backend dependencies and file',

        prompts: [],

        actions: [
            {
                type: 'add',
                path: `../${config.backendDirName}/.env`,
                templateFile: 'plop-templates/backend/env.hbs',
                data:{
                    network: config.network
                }
            },
            {
                type: 'add',
                path: `../${config.backendDirName}/hardhat.config.js`,
                templateFile: 'plop-templates/backend/hardhat.config.hbs',
                data:{
                    network: config.network
                }
            },
            {
                type: 'add',
                path: `../${config.backendDirName}/contracts/${toPascalCase(config.contractName)}.sol`,
                templateFile: 'plop-templates/backend/contract.hbs',
                data:{
                    contractName: config.contractName
                }
            },
            {
                type: 'add',
                path: `../${config.backendDirName}/scripts/deploy.js`,
                templateFile: 'plop-templates/backend/deploy.hbs',
                data:{
                    contractName: config.contractName
                }
            },
        ]
    });
    
    // backend-generator: create files and generates code for frontend
    // that is required by a common project
    plop.setGenerator('frontend-generator', {
        description: "installing and generating frontend dependencies and file",
        prompts: [],
        actions: [
            {
                type: 'add',
                path: `../${config.frontendDirName}/constants/index.js`,
                templateFile: 'plop-templates/frontend/constant.hbs',
                data:{
                    contractName: config.contractName,
                }
            },
            {
                type: 'add',
                path: `../${config.frontendDirName}/pages/index.js`,
                templateFile: 'plop-templates/frontend/index.hbs',
                data:{
                    contractName: config.contractName,
                    network: config.network,
                    chainID: getChainID(config.network)

                }
            },
        ]
    })
    
    plop.setGenerator('set-windows-env', {
        description: "Setting package to run in windows computer",
        prompts: [],
        actions: [
            {
                type: 'add',
                path: './package.json',
                templateFile: 'plop-templates/package.hbs',               
            },
         
        ]
    })
};