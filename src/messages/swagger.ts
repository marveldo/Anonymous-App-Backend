/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - id
 *         - userId
 *         - content
 *         - recorded_message
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the message
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         userId:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the user
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         content:
 *           type: string
 *           description: The content of the message
 *           example: "This is a sample message content"
 *         recorded_message:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the message was recorded
 *           example: "2023-10-05T14:30:00Z"
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error type
 *         message:
 *           type: string
 *           description: Detailed error message
 *         status:
 *           type: integer
 *           description: HTTP status code
 *     SettingsResponse:
 *           type: array
 *           items:
 *           $ref: '#/components/schemas/Message'
 *           example:
 *             - id: "123e4567-e89b-12d3-a456-426614174000"
 *               userId: "550e8400-e29b-41d4-a716-446655440000"
 *               content: "First message content"
 *               recorded_message: "2023-10-05T14:30:00Z"
 *             - id: "223e4567-e89b-12d3-a456-426614174001"
 *               userId: "550e8400-e29b-41d4-a716-446655440000"
 *               content: "Second message content"
 *               recorded_message: "2023-10-05T15:30:00Z"
 */

/**
 * @swagger
 * /messages/{user_Id}/send/:
 *   post:
 *     summary: Sumbits a new message for a specific user
 *     description: Retrieves a specific message using the user ID query parameter
 *     tags: [Messages]
 *     parameters:
 *       - name: user_Id
 *         in: path
 *         description: The UUID of the user to retrieve the message for
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               recorded_file :
 *                 type: string
 *                 format: binary
 *               message:
 *                 type: string
 *                 nullable : true
 *     responses:
 *       201:
 *         description: Successfully retrieved the message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               id: "123e4567-e89b-12d3-a456-426614174000"
 *               userId: "550e8400-e29b-41d4-a716-446655440000"
 *               content: "This is a sample message content"
 *               recorded_message: "2023-10-05T14:30:00Z"
 *       400:
 *         description: Bad Request - Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: 400
 *               message: "Validation Error"

 *       404:
 *         description: Not Found - Message not found for the given user ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: 404
 *               message: "No user with the given ID"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example: 
 *               status: 500
 *               message: "An unexpected error occurred while processing your request"
 *
 */

/**
 * @swagger
 * /messages/:
 *   get:
 *     summary: Get messages for authenticated user
 *     description: Retrieves messages for the currently authenticated user using Bearer token
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       401:
 *         description: Unauthorized - authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized user"
 *       404:
 *         description: Resource is not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Not Found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */
export function __forceImport() {}
export default {};