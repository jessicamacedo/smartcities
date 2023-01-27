var express = require('express');
var router = express.Router();
const { CreateReadingDevice, GetReadingsDevice } = require("../controllers/readings");



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
router.post('/readings', async function (req, res) {
 await CreateReadingDevice(req, res);
});


router.get('/readings', async function (req, res) {
  await GetReadingsDevice(req, res);
 });
module.exports = router;
