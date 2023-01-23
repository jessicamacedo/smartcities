var express = require('express');
var router = express.Router();
const { CreateUser, GetUserLogin, AssociateUserDevice } = require("../controllers/users");


/**
 * @swagger
 * /users/register:
 *  post:
 *    tags: ['Smartcities']
 *    description: Register new user 
 *    security:
 *      - basicAuth: []
 *    parameters:
 *      - in: params
 *        name: name
 *        schema:
 *          type: string
 *        description: Full name of the user
 *        example: John Doe
 *        required: true
 *      - in: params
 *        name: email
 *        schema:
 *          type: string
 *        description: Email for the user register
 *        example: johndoe@test.com
 *        required: true
 *      - in: params
 *        name: password
 *        schema:
 *          type: string
 *        description: Password for the user register
 *        example: 12345678
 *        required: true
 *      - in: params
 *        name: password
 *        schema:
 *          type: string
 *        description: Password repeated for the user register
 *        example: 12345678
 *        required: true
 *      - in: params
 *        name: address
 *        schema:
 *          type: string
 *        description: Address of the user
 *        example: St John street 123
 *        required: true
 *      - in: params
 *        name: zipCode
 *        schema:
 *          type: string
 *        description: Zip code for the user address
 *        example: 4750-000
 *        required: true
 *      - in: params
 *        name: userType
 *        schema:
 *          type: string
 *          enum: [domestic, manager, admin]
 *        description: Perfil of the user
 *        example: domestic
 *        required: true
 *    responses:
 *      '201':
 *        description: User inserted with success
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: string
 *              example: Created user successfully!
 *      '400':
 *        description: Bad request trying to create new user, input is invalid
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: string
 *              example: The field "email" is required.
 *      '409':
 *        description: Conflict trying to insert new user.
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: string
 *              example: The user is already registered on the database!
 *      '500':
 *        description: Error trying to create new user
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: string
 *              example: Internal server error
 * @description: Route to register users on database
 */
router.post('/register', async function (req, res) {
 await CreateUser(req, res);
});

/**
 * @swagger
 * /users/login:
 *  get:
 *    tags: ['Smartcities']
 *    description: Login user 
 *    security:
 *      - basicAuth: []
 *    parameters:
 *      - in: params
 *        name: email
 *        schema:
 *          type: string
 *        description: Email for the user register
 *        example: johndoe@test.com
 *        required: true
 *      - in: params
 *        name: password
 *        schema:
 *          type: string
 *        description: Password for the user register
 *        example: 12345678
 *        required: true
 *    responses:
 *      '200':
 *        description: User login with success
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJeyJuYW1lIjoidXNlciA2IiwiZW1haWwiOiJ1c2VyNkBlbWFpbC5jb20iLCJhZGRyZXNzIjoiUnVhIGRlIGNpbWEiLCJ6aXBDb2RlIjoiNDc1MC0wMDAiLCJ1c2VyVHlwZSI6ImRvbWVzdGljIiwiaWF0IjoxNjc0MDgyNjc2LCJleHAiOjE2NzQxNjkwNzZ9.cwVm7cqJuN6Wm7TBczkLnFz0FpELi6qQX3i9byTqUN0
 *      '403':
 *        description: Login credencials not authorized
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: string
 *              example: User not authorized!
 *      '400':
 *        description: Bad request trying to login
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: string
 *              example: Password is required!
 *      '500':
 *        description: Error trying to login
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: string
 *              example: Internal server error
 * @description: Route to login users
 */
router.get('/login', async function (req, res) {
  await GetUserLogin(req, res);
});

/**
 * @swagger
 * /users/devices:
 *  post:
 *    tags: ['Smartcities']
 *    description: Register new device associated to a user 
 *    security:
 *      - basicAuth: []
 *    parameters:
 *      - in: params
 *        name: email
 *        schema:
 *          type: string
 *        description: Email for the user register
 *        example: johndoe@test.com
 *        required: true
 *      - in: params
 *        name: deviceName
 *        schema:
 *          type: string
 *        description: Description of the device
 *        example: Painel solar 1
 *        required: true
 *      - in: params
 *        name: location
 *        schema:
 *          type: string
 *        description: Description of the location of the device
 *        example: garage
 *        required: true
 *      - in: params
 *        name: type
 *        schema:
 *          type: string
 *          enum: [solarpanel, car-charger]
 *        description: Type of devices
 *        example: solarpanel
 *        required: true
 *    responses:
 *      '201':
 *        description: Device inserted with success
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: string
 *              example: Created device successfully!
 *      '400':
 *        description: Bad request trying to create new user, input is invalid
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: string
 *              example: The field "email" is required.
 *      '500':
 *        description: Error trying to create device
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: string
 *              example: Internal server error
 * @description: Route to register users on database
 */
router.post('/devices', async function (req, res) {
  await AssociateUserDevice(req, res);
 });

module.exports = router;
