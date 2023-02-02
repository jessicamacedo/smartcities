var express = require('express');
var router = express.Router();
const { CreateReadingDevice, GetReadingsDevice } = require("../controllers/readings");

/**
 * APIs called on the Node-RED project
 */

/**
 * @swagger
 * /devices/readings:
 *  post:
 *    tags: ['Devices']
 *    description: Register new reading from device 
 *    security:
 *      - basicAuth: []
 *    parameters:
 *      - in: params
 *        name: deviceId
 *        schema:
 *          type: string
 *        description: Mac address of the device
 *        example: 12-32-TG-43-12-YH
 *        required: true
 *      - in: params
 *        name: type
 *        schema:
 *          type: string
 *        description: Type of the device
 *        example: solarpanel
 *        required: true
 *      - in: params
 *        name: consumption
 *        schema:
 *          type: number
 *        description: Consumption of the device on a certain timestamp
 *        example: 120
 *        required: true
 *      - in: params
 *        name: production
 *        schema:
 *          type: number
 *        description: Production of the device on a certain timestamp
 *        example: 12
 *        required: true
 *    responses:
 *      '201':
 *        description: Reading inserted with success
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: string
 *              example: Reading created successfully!
 *      '400':
 *        description: Bad request trying to insert reading, input is invalid
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: string
 *              example: The field "consumption" is required.
 *      '500':
 *        description: Error trying to create new reading
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: string
 *              example: Internal server error
 * @description: Route to register readings on database
 */
router.post('/readings', async function (req, res) {
 await CreateReadingDevice(req, res);
});


/**
 * @swagger
 * /devices/readings:
 *  get:
 *    tags: ['Devices']
 *    description: Get all readings from device 
 *    security:
 *      - basicAuth: []
 *    parameters:
 *      - in: params
 *        name: deviceId
 *        schema:
 *          type: string
 *        description: Mac address of the device
 *        example: 12-32-TG-43-12-YH
 *        required: true
 *    responses:
 *      '200':
 *        description: Readings of the device
 *        schema:
 *          type: array
 *          properties:
 *              type: object
 *              properties:
 *                  _id:
 *                  type: string
 *                  example: 63d32910784dfdb81ac991a1
 * 
 *      '400':
 *        description: Bad request trying to get readings, input is invalid
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: string
 *              example: The field "consumption" is required.
 *      '500':
 *        description: Error trying to get readings
 *        schema:
 *          type: object
 *          properties:
 *            error:
 *              type: string
 *              example: Internal server error
 * @description: Route to register readings on database
 */
router.get('/readings', async function (req, res) {
  await GetReadingsDevice(req, res);
 });
module.exports = router;
