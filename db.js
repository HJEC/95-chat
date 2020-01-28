const spicedPg = require("spiced-pg"),
    db = spicedPg(
        process.env.DATABASE_URL ||
            "postgres:postgres:postgres@localhost:5432/network"
    );

exports.addUser = (first, last, email, password) => {
    return db
        .query(
            `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
            [first, last, email, password]
        )
        .then(({ rows }) => rows);
};
