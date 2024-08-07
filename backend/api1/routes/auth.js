const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SECRET_KEY = process.env.SECRET_KEY;
console.log(SECRET_KEY);

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - password
 *       properties:
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
 *     AuthenticationResponse:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token for authentication
 *         message:
 *           type: string
 *           description: Message for the user
 *       example:
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTU0OWIwMTIwMWUyZjMz"
 *         message: "User created successfully"
 *     AuthenticationRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *       example: 
 *        email: "john.doe@example.com"
 *        password: "password"
 */ 

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: APIs for user authentication
 * 
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *      required: true  
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RegisterRequest'
 * 
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 *       500:
 *         description: Some server error 
 */

router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  const user = new User({ name, email, phone, password });
  try {
    await user.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  let token
  try {
     token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        fullName: user.name,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.status(201).json({
    message: "User created successfully",
    data: {
      token: token,
    },
  });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Some server error
 */

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  if (!existingUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  try {
    const isPasswordCorrect = await existingUser.comparePassword(password);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    const token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
        fullName: existingUser.name,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.status(200).json({
    message: "Logged in successfully",
    data: {
      token: token,
    },
  });
});

module.exports = router;