const spicedPg = require("spiced-pg"),
    db = spicedPg(
        process.env.DATABASE_URL ||
            "postgres:postgres:postgres@localhost:5432/network"
    );

exports.addUser = (first, last, email, password) => {
    return db
        .query(
            `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id, email`,
            [first, last, email, password]
        )
        .then(({ rows }) => rows);
};

exports.updateImage = email => {
    return db.query(`UPDATE users SET image WHERE email = $1`, [email]);
};

exports.getUser = email => {
    return db
        .query(
            `SELECT first, last, email, password, id FROM users WHERE email = $1`,
            [email]
        )
        .then(({ rows }) => rows);
};

exports.storeCode = (email, code) => {
    return db.query(
        `INSERT INTO reset (email, code) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET code = $2, created_at = now() RETURNING id, code`,
        [email, code]
    );
};

exports.verify = email => {
    return db
        .query(
            `SELECT code FROM reset WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' AND email = $1`,
            [email]
        )
        .then(({ rows }) => rows);
};

exports.updatePassword = (password, email) => {
    return db.query(`UPDATE users SET password = $1 WHERE email = $2`, [
        password,
        email
    ]);
};
