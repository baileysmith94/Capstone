const db = require('./client')
const bcrypt = require('bcrypt');
const { getReviewById } = require('./review');
const SALT_COUNT = 10;

const createUser = async({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user ] } = await db.query(`
        INSERT INTO users(name, email, password)
        VALUES($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword]);

        return user;
    } catch (err) {
        throw err;
    }
}

const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

const getAllUsers = async () => {
    try {
        const { rows } = await db.query('SELECT * FROM users');
        return rows;
    } catch (error) {
        throw error;
    }
}

const getUserById = async () => {
    try{
        const { rows: [user] } = await db.query(
            `
            SELECT id, name, email, password, is_admin
            FROM users
            WHERE id= $1
            `
        );
        if (!user) {
            throw {
                name:"UserNotFoundError",
                message: "User with that id does not exist"
            }
        }
        user.reviews = await getReviewById(id);
        return user;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers, 
    getUserById
};