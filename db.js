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

exports.updateImage = (image, email) => {
    return db
        .query(`UPDATE users SET image = $1 WHERE email = $2 RETURNING image`, [
            image,
            email
        ])
        .then(({ rows }) => rows);
};

exports.updateBio = (email, bio) => {
    return db
        .query(`UPDATE users SET bio = $2 WHERE email = $1 RETURNING bio`, [
            email,
            bio
        ])
        .then(({ rows }) => rows);
};
exports.getUser = email => {
    return db
        .query(`SELECT * FROM users WHERE email = $1`, [email])
        .then(({ rows }) => rows);
};

exports.getReqUser = id => {
    return db
        .query(`SELECT * FROM users WHERE id = $1`, [id])
        .then(({ rows }) => rows);
};

exports.newUsers = () => {
    return db.query(
        `SELECT * FROM users ORDER BY id DESC LIMIT 3`.then(({ rows }) => rows)
    );
};

exports.findUsers = search => {
    return db
        .query(
            `SELECT * FROM users WHERE first ILIKE = $1 OR last ILIKE = $1 ORDER BY id LIMIT 4`,
            [search + "%"]
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
