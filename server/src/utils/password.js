const bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {Promise<string|null>} A promise that resolves to the hashed password if successful, or null if an error occurs.
 */
const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        return null;
    }
};

/**
 * Compares a password with a hashed password using bcrypt.
 * @param {string} password - The password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to true if the passwords match, or false otherwise.
 */
const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        return false;
    }
};

module.exports = { hashPassword, comparePassword };