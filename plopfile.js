const { NETWORK, BACKEND_DIR_NAME, CONTRACT_NAME, FRONTEND_DIR_NAME } = require('./constant')
const {toPascalCase} = require('./helper')
module.exports = function (plop) {
    plop.setGenerator('init', {
        description: 'preparing shell scripts',
        prompts: [
            {
                type: 'input',
                name: 'backendDirName',
                message: 'Enter backend directory name:',
                default: 'hardhat-tutorial'
            },
            {
                type: 'input',
                name: 'contractName',
                message: 'Enter contract name:'
            },
            {
                type: 'list',
                name: 'network',
                message: 'Choose the network!:',
                choices: ["Rinkeby", "Ropsten", "Mumbai", "Ceramic", "The Graph"]
            },
            {
                type: 'input',
                name: 'frontendDirName',
                message: 'Enter frontend directory name:',
                default: 'my-app'
            }

        ],
        actions: [
            {
                type: "add",
                path: "./constant.js",
                templateFile: 'plop-templates/constant/constant.hbs'
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
        ]
    });

    plop.setGenerator('backend-generator', {
        description: 'installing and generating backend dependencies and file',

        prompts: [],

        actions: [
            {
                type: 'add',
                path: `../${BACKEND_DIR_NAME}/.env`,
                templateFile: 'plop-templates/backend/env.hbs',
                data:{
                    network: NETWORK
                }
            },
            {
                type: 'add',
                path: `../${BACKEND_DIR_NAME}/hardhat.config.js`,
                templateFile: 'plop-templates/backend/hardhat.config.hbs',
                data:{
                    network: NETWORK
                }
            },
            {
                type: 'add',
                path: `../${BACKEND_DIR_NAME}/contracts/${toPascalCase(CONTRACT_NAME)}.sol`,
                templateFile: 'plop-templates/backend/contract.hbs',
                data:{
                    contractName: CONTRACT_NAME
                }
            },
            {
                type: 'add',
                path: `../${BACKEND_DIR_NAME}/scripts/deploy.js`,
                templateFile: 'plop-templates/backend/deploy.hbs',
                data:{
                    contractName: CONTRACT_NAME
                }
            },
        ]
    });

    plop.setGenerator('frontend-generator', {
        description: "installing and generating frontend dependencies and file",
        prompts: [],
        actions: [
            {
                type: 'add',
                path: `../${FRONTEND_DIR_NAME}/constants/index.js`,
                templateFile: 'plop-templates/frontend/constant.hbs',
                data:{
                    contractName: CONTRACT_NAME
                }
            },
            {
                type: 'add',
                path: `../${FRONTEND_DIR_NAME}/pages/index.js`,
                templateFile: 'plop-templates/frontend/index.hbs',
                data:{
                    contractName: CONTRACT_NAME,
                    network: NETWORK
                }
            },
        ]
    })
};