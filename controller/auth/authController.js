const pool = require("../../database/connection");

function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return email !== '' && email.match(emailFormat);
}

const userSignUP = async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({
            message: 'Email, username, and password are required',
        });
    }

    // Validate email format
    if (!isEmail(email)) {
        return res.status(400).json({
            message: 'Invalid email format',
        });
    }

    try {
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const createTable = `
        //     CREATE TABLE IF NOT EXISTS users (
        //         id INT PRIMARY KEY AUTO_INCREMENT,
        //         username VARCHAR(255) NOT NULL,
        //         image VARCHAR(255),
        //         email VARCHAR(255) NOT NULL UNIQUE,
        //         password VARCHAR(255) NOT NULL,
        //         created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        //         updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        //     )
        // `;
        // await pool.query(createTable);

        const checkUserExistQuery = `SELECT email FROM users WHERE email = ?`;
        const [isUserExist] = await pool.query(checkUserExistQuery, [email]);

        if (isUserExist.length > 0) {
            return res.status(409).json({
                message: 'User already exists with this email',
            });
        }

        const createNewUser = `
            INSERT INTO users(name, email, password)
            VALUES (?, ?, ?)
        `;
        const [result] = await pool.query(createNewUser, [username, email, password]);
        return res.status(201).json({
            message: 'User successfully created',
            data: { userId: result.insertId, username, email },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

module.exports = {
    userSignUP,
};
