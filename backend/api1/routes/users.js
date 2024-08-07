const express = require("express");
const router = express.Router();
const User = require("../models/user");

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         phone:
 *           type: string
 *           description: Phone number of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *       example:
 *         name: "John Doe"
 *         email: "john.doe@example.com"
 *         phone: "1234567890"
 *         password: "password"
 *     UserResponse:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         phone:
 *           type: string
 *           description: Phone number of the user
 *         password:
 *           type: string
 *           description: Hashed Password of the user
 *         tickets:
 *           type: array
 *           items:
 *            type: string
 *            description: Ticket IDs
 *       example:
 *         name: "John Doe"
 *         email: "john.doe@example.com"
 *         phone: "1234567890"
 *         password: "$2b$10$olHovuYBAwJm74.8Xe2Ku.hkdrB8F7PvJgHigNEO.PNcXOW1eSmze"
 *         tickets: [
 *          "60b9b3b3b3b3b3b3b3b3b3b3",
 *          "60b9b3b3b3b3b3b3b3b3b3"
 *         ]
 * 
 *   parameters:
 *     userId:
 *       name: id
 *       in: path
 *       description: ID of the user
 *       required: true
 * 
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: API for users in the system
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve a list of users from the database
 *     tags: [Users]
 *     description: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *      - $ref: '#/components/parameters/userId'
 *     description: Retrieve a list of users from the database
 *     responses:
 *       200:
 *         description: The user with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *        description: The movie with the specified ID was not found
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *      - $ref: '#/components/parameters/userId'
 *     description: Update an user by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *        description: The user with the specified ID was not found
 *       500:
 *        description: Some server error
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.password = password || user.password;
    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete an user by ID
 *     tags: [Users]
 *     parameters:
 *      - $ref: '#/components/parameters/userId'
 *     description: Delete a movie by ID
 *     responses:
 *       200:
 *        description: The user was successfully deleted
 *       404:
 *        description: The user with the specified ID was not found
 *       500:
 *        description: Some server error
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await
    User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
);

module.exports = router;