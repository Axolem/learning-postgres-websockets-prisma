const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';
/**
 * Greet the given name.
 * @param {Object} data - The tocken.
 * @param {string} data.id - The user id.
 * @param {string} data.name - The user name.
 * @returns {string} The tocken that expires in 7d.
 */
const createToken = (data = { id: "", name: "" }) => {
    return jwt.sign(data, secretKey, { expiresIn: '7d' });
}

/**
 * Greet the given name.
 * @param {string} token - The tocken.
 * @returns {boolean} The success or failure of the operation.
 */

const validationToken = (token) => {
    return jwt.verify(token, secretKey, (error, decoded) => {
        return error ? false : true;
    });
}

module.exports = { createToken, validationToken };