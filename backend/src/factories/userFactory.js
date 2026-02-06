const { faker } = require('@faker-js/faker');

/**
 * User Factory
 * Generates dummy user data for seeding the database
 */
const createUserData = () => {
    return {
        email: faker.internet.email().toLowerCase(),
        username: faker.internet.username(),
        isActive: faker.datatype.boolean()
    };
};

/**
 * Generate multiple users
 * @param {number} count - Number of users to generate
 * @returns {Array} Array of user objects
 */
const createMultipleUsers = (count = 10) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(createUserData());
    }
    return users;
};

module.exports = {
    createUserData,
    createMultipleUsers
};
