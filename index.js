const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// CREATE: Add a new user
app.post('/users', async (req, res) => {
    const { email, firstname, lastname, age, address } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                email,
                firstname,
                lastname,
                age,
                address,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// READ: Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users' });
    }
});

// READ: Get a user by ID
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user' });
    }
});

// UPDATE: Update a user's information
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { email, firstname, lastname, age, address } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                email,
                firstname,
                lastname,
                age,
                address,
            },
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
});

// DELETE: Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'User deleted', user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

module.exports = app;