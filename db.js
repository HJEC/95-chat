const spicedPg = require("spiced-pg"),
    db = spicedPg(
        process.env.DATABASE_URL ||
            "postgres:postgres:postgres@localhost:5432/network"
    );
// NEW USER
exports.addUser = (first, last, email, password) => {
    return db
        .query(
            `INSERT INTO users (first, last, email, password)
             VALUES ($1, $2, $3, $4)
             RETURNING id, email`,
            [first, last, email, password]
        )
        .then(({ rows }) => rows);
};
// UPDATE USER PROFILE IMAGE
exports.updateImage = (image, email) => {
    return db
        .query(
            `UPDATE users
                SET image = $1
                WHERE email = $2
                RETURNING image`,
            [image, email]
        )
        .then(({ rows }) => rows);
};
// UPDATE USERS BIO
exports.updateBio = (email, bio) => {
    return db
        .query(
            `UPDATE users
                SET bio = $2
                WHERE email = $1
                RETURNING bio`,
            [email, bio]
        )
        .then(({ rows }) => rows);
};
//GET USERS DATA ON LOGIN
exports.getUser = email => {
    return db
        .query(
            `SELECT *
            FROM users
            WHERE email = $1`,
            [email]
        )
        .then(({ rows }) => rows);
};
// FIND USER WITH REQ PARAMS
exports.getReqUser = id => {
    return db
        .query(
            `SELECT *
            FROM users
            WHERE id = $1`,
            [id]
        )
        .then(({ rows }) => rows);
};
// FIND MOST RECENT USERS
exports.newUsers = () => {
    return db
        .query(
            `SELECT *
            FROM users
            ORDER BY id
            DESC LIMIT 3`
        )
        .then(({ rows }) => rows);
};
// QUERY SEARCH FOR FRIENDS
exports.findUsers = name => {
    return db
        .query(
            `SELECT *
            FROM users
            WHERE first ILIKE $1
            OR last ILIKE $1
            OR CONCAT(first, ' ', last) ILIKE $1
            ORDER BY id LIMIT 4`,
            [name + "%"]
        )
        .then(({ rows }) => rows);
};

//   FRIEND REQUEST QUERIES    //
exports.isFriend = (sender, recipient) => {
    return db
        .query(
            `SELECT *
             FROM friendships
             WHERE (sender_id = $1
             AND recipient_id = $2)
             OR (sender_id = $2
            AND recipient_id = $1)`,
            [sender, recipient]
        )
        .then(({ rows }) => rows);
};

exports.requestFriendship = (userId, recipient) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id)
        VALUES ($1, $2)`,
        [userId, recipient]
    );
};

exports.cancelFriendship = (userId, recipient) => {
    return db.query(
        `DELETE FROM friendships
        WHERE (sender_id = $1
        AND recipient_id = $2)
        OR (sender_id = $2
        AND recipient_id = $1)`,
        [userId, recipient]
    );
};

exports.acceptFriendship = (sender, recipient) => {
    return db.query(
        `UPDATE friendships
        SET accepted = true
        WHERE sender_id = $1
        AND recipient_id = $2`,
        [sender, recipient]
    );
};

//     GET FRIENDSHIPS        //

exports.friendships = userId => {
    return db
        .query(
            `
    SELECT users.id, first, last, image, sender_id, accepted
    FROM friendships
    JOIN users
    ON (recipient_id = $1 AND sender_id = users.id)
    OR (true AND recipient_id = $1 AND sender_id = users.id)
    OR (sender_id = $1 AND recipient_id = users.id)
    OR (true AND sender_id = $1 AND recipient_id = users.id)
`,
            [userId]
        )
        .then(({ rows }) => rows);
};
//    RESET PASSWORD QUERIES   //
exports.storeCode = (email, code) => {
    return db.query(
        `INSERT INTO reset (email, code)
        VALUES ($1, $2)
        ON CONFLICT (email)
        DO UPDATE SET code = $2, created_at = now()
        RETURNING id, code`,
        [email, code]
    );
};

exports.verify = email => {
    return db
        .query(
            `SELECT code
            FROM reset
            WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
            AND email = $1`,
            [email]
        )
        .then(({ rows }) => rows);
};

exports.updatePassword = (password, email) => {
    return db.query(
        `UPDATE users
        SET password = $1
        WHERE email = $2`,
        [password, email]
    );
};

//     CHAT QUERIES     //

exports.postMessage = (userId, message) => {
    return db.query(
        `INSERT INTO globalchat (sender_id, message) VALUES ($1, $2)`,
        [userId, message]
    );
};

exports.getMessages = () => {
    return db
        .query(
            `SELECT globalchat.id as id, sender_id, message, first, last, image
            FROM globalchat JOIN users
            ON globalchat.sender_id = users.id
            ORDER BY globalchat.id DESC LIMIT 10`
        )
        .then(({ rows }) => rows);
};

exports.chatPoster = id => {
    return db
        .query(`SELECT * FROM users WHERE id = $1`, [id])
        .then(({ rows }) => rows[0]);
};
