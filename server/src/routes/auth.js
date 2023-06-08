const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const { hashPassword, comparePassword } = require('../utils/password');
const { createToken, validationToken } = require('../utils/token');

const prisma = new PrismaClient();

//Will still add validator library

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate',
    (req, res, next) => {//route middleware to verify a token
        //Verify request body
        const { username, password, token, scope } = req.body;

        if (scope === "verify") {
            //Verify token
            const validToken = validationToken(token);
            if (!validToken) return res.status(404).send({ error: 'Invalid token' });

            return res.send({ valid: true });
        }

        if (!username || !password) return res.status(404).send({ error: 'Username and password required' });

        next();
    },
    async (req, res) => {
        const { username, password } = req.body;

        //Find user
        const user = await prisma.user.findUnique({ where: { name: username } });

        if (!user) return res.status(404).send({ error: 'User not found' });

        //Compare password
        const validPassword = await comparePassword(password, user.password);

        if (!validPassword) return res.status(401).send({ error: 'Invalid password' });

        //Delete password from user object
        delete user.password;

        //Create token
        user.token = createToken({ id: user.id, name: user.name });

        res.send(user);

    }
);

//route to create a new user (POST http://localhost:8080/api/users)
router.post('/create',
    (req, res, next) => { //validate request body
        const { username, password } = req.body;
        if (!username || !password) return res.status(404).send({ error: 'Username and password required' });
        next();
    },
    async (req, res, next) => { //user exists?
        const { username } = req.body;
        const userExists = await prisma.user.findUnique({ where: { name: username } });

        if (userExists) {
            return res.status(404).send({ error: 'User already exists' });
        }
        next();
    },
    async (req, res) => {

        const { username, password } = req.body;

        const hashedPassword = await hashPassword(password);

        if (!hashedPassword) return res.status(500).send({ error: 'Error creating user please try again.' });

        const user = await prisma.user.create({ data: { name: username, password: hashedPassword } });

        //Delete password from user object	
        delete user.password;

        //Create token
        user.token = createToken({ id: user.id, name: user.name });

        res.send(user);
    }
);

module.exports = router;