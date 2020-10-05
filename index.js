// EXPRESS / COMPRESSION //
const express = require("express");
const app = express();
const compression = require("compression");
const axios = require("axios");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 hjec-95-chat.herokuapp.com:*"
}); //<-Add heroku origin here: hjec.network.herokuapp:*

// SECURITY //
const cookieSession = require("cookie-session"),
    csurf = require("csurf"),
    cryptoRandomString = require("crypto-random-string"),
    { hashPass, compare } = require("./bcrypt");
// FUNCTIONS //
const {
    addUser,
    deleteAccount,
    updateImage,
    updateBio,
    getUser,
    getReqUser,
    newUsers,
    findUsers,
    isFriend,
    requestFriendship,
    cancelFriendship,
    acceptFriendship,
    friendships,
    verify,
    storeCode,
    updatePassword,
    postMessage,
    getMessages,
    chatPoster
} = require("./db");
const { sendEmail } = require("./ses");
const { upload } = require("./s3");
const { createProxyMiddleware } = require("http-proxy-middleware");

// IMAGE UPLOAD BOILER PLATE //
const multer = require("multer"),
    uidSafe = require("uid-safe"),
    path = require("path"),
    config = require("./config");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
// __IMAGE UPLOAD__//

// APP USE //
app.use(compression());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);

let secrets;
process.env.NODE_ENV === "production"
    ? (secrets = process.env)
    : (secrets = require("./secrets.json"));

const cookieSessionMiddleware = cookieSession({
    secret: secrets.SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

let options = {
    target: "http://localhost:8081/",
    changeOrigin: true
};
// SERVE FILE IN DEVELOPMENT OR PRODUCTION //
if (process.env.NODE_ENV != "production") {
    app.use("/bundle.js", createProxyMiddleware(options));
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static("./public"));
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
// __USE__

// Find users location

app.get("/find-ip", async (req, res) => {
    let response;
    if (process.env.NODE_ENV === "production") {
        console.log("INSIDE PROCESS!");
        response = await axios.post(
            "http://api.ipstack.com/" +
                req.headers["x-forwarded-for"] +
                "?access_key=" +
                secrets.IP_STACK
        );
        response.data = {
            ...response.data,
            country: response.data.country_name,
            city: response.data.city,
            region: response.data.region_code,
            zip: response.data.zip,
            lat: response.data.latitude,
            lon: response.data.longitude,
            query: `Heroku application port ip: ${response.data.ip}`
        };
    } else {
        response = await axios.get("http://ip-api.com/json");
    }
    res.json(response.data);
});

// REGISTRATION PAGE //
app.get("/registration", (req, res) => {
    if (req.session.userId) {
        res.redirect("/login");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
app.post("/register", async (req, res) => {
    let { first, last, email, password } = req.body;
    try {
        const hash = await hashPass(password);
        const result = await addUser(first, last, email, hash);

        req.session.userId = result[0].id;
        req.session.email = result[0].email;
        res.json({ success: true, data: result[0] });
    } catch (err) {
        console.log("error in register post: ", err);
        res.json({ success: false });
    }
});
// LOGIN PAGE //
app.post("/loginUser", async (req, res) => {
    let { email, password } = req.body;
    try {
        const data = await getUser(email);
        const isTrue = await compare(password, data[0].password);
        if (isTrue) {
            req.session.userId = data[0].id;
            req.session.email = data[0].email;
            res.json({ success: true });
        }
    } catch (err) {
        console.log("login compare failed", err);
        res.json({ success: false });
    }
});
// LOGOUT //
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/register");
});
// GET USER INFO //
app.get("/user", async (req, res) => {
    let email = req.session.email;
    try {
        let rows = await getUser(email);
        res.json({
            first: rows[0].first,
            last: rows[0].last,
            id: rows[0].id,
            email: req.session.email,
            image: rows[0].image || "/default.jpg",
            bio: rows[0].bio
        });
    } catch (err) {
        console.log("failed to get user on app load", err);
    }
});
// DELETE USER ACCOUNT //
app.post("/delete-account", async (req, res) => {
    let email = req.session.email;
    try {
        deleteAccount(email).then(() => {
            req.session = null;
            res.json({ success: true });
        });
    } catch (err) {
        console.log("failed to delete account:", err);
        res.json({ success: false });
    }
});

//       GET/FIND OTHER USERS       //
// GET OTHER USER //
app.get("/api/user/:id", async (req, res) => {
    let data = await getReqUser(req.params.id);
    res.json(data[0]);
});
// FIND USERS //
app.get("/api/find/start", async (req, res) => {
    try {
        let data = await newUsers();
        res.json(data);
    } catch (err) {
        console.log("ERR /api/find/start", err);
    }
});
app.get("/api/find/:user", async (req, res) => {
    try {
        let data = await findUsers(req.params.user);
        res.json(data);
    } catch (err) {
        console.log("Error in /api/find:user :", err);
    }
});

//      FRIEND REQUESTS            //
app.get("/is-friend/:friend", async (req, res) => {
    let { friend } = req.params,
        { userId } = req.session;
    try {
        let data = await isFriend(userId, friend);
        console.log("is friend data: ", data[0]);
        res.json(data[0]);
    } catch (err) {
        console.log("ERR is-friend", err);
        res.json({ success: false });
    }
});

app.post("/request-friendship/:friend", async (req, res) => {
    await requestFriendship(req.session.userId, req.params.friend);
    res.json({ requestState: "requested" });
});

app.post("/cancel-friendship/:friend", async (req, res) => {
    await cancelFriendship(req.session.userId, req.params.friend);
    res.json({ requestState: "cancelled" });
});

app.post("/accept-friendship/:friend", async (req, res) => {
    await acceptFriendship(req.params.friend, req.session.userId);
    res.json({ requestState: "accepted" });
});

//          FRIENDSHIPS          //
// FRIEND/WANNABE DATA //
app.get("/friends-wannabes", async (req, res) => {
    let data = await friendships(req.session.userId);
    if (data) {
        res.json(data);
    } else {
        res.json({ data: "empty" });
    }
});

//      UPDATE USER       //
// UPLOAD NEW PROFILE PHOTO //
app.post("/upload", uploader.single("file"), upload, async (req, res) => {
    let imageUrl = config.s3Url + req.file.filename;
    let email = req.session.email;
    try {
        let image = await updateImage(imageUrl, email);
        let url = image[0].image;
        if (image) {
            res.json(url);
        }
    } catch (err) {
        console.log("failed to upload image: ", err);
        res.json(false);
    }
});
// UPDATE BIOGRAPHY //
app.post("/change-bio", async (req, res) => {
    let email = req.session.email;
    let bio = req.body.bio;
    try {
        await updateBio(email, bio);
        res.sendStatus(200);
    } catch (err) {
        console.log("failed to update bio: ", err);
        res.sendStatus(500);
    }
});

//       RESET PASS      //
// RESET PASSWORD //
app.post("/recover", async (req, res) => {
    let email = req.body.email;
    let subject = `Soc_Net: reset password`;
    const secretCode = cryptoRandomString({
        length: 6
    });
    try {
        let data = await getUser(email);
        let name = data[0].first;
        let message = `Hi ${name}, here is your reset code: ${secretCode}.`;
        if (data) {
            res.json(data[0]);
            await sendEmail(email, message, subject);
            await storeCode(email, secretCode);
        }
    } catch (err) {
        console.log("sendEmail failed: ", err);
        res.json(false);
    }
});
// SET NEW PASSWORD //
app.post("/reset", async (req, res) => {
    let { email, code, newPassword } = req.body;
    try {
        let data = await verify(email);

        if (code == data[0].code) {
            let hash = await hashPass(newPassword);
            await updatePassword(hash, email);
            res.json(data[0]);
        } else {
            console.log("verify failed");
            res.json(false);
        }
    } catch (err) {
        console.log("async updatePassword failed: ", err);
        res.json(false);
    }
});

// ERROR HANDLER //
process.on("uncaughtException", function(err) {
    console.log("uncaught error:", err);
});
// THIS MUST BE THE LAST ROUTE //
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/registration");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//__ ROUTER __//
server.listen(process.env.PORT || 8080, () =>
    console.log("See you space cowboy")
);

// __ SOCKETS __ //
io.on("connection", async function(socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    console.log("socket id:", socket.id);
    let logged_in_time = Date.now();
    io.to(socket.id).emit("check intro time", logged_in_time);

    const userId = socket.request.session.userId;

    let messageData = await getMessages();
    messageData = messageData.reverse();

    io.sockets.emit("chatMessages", messageData);

    socket.on("post message", async msg => {
        const data = await chatPoster(userId);

        await postMessage(userId, msg);
        let content = {
            sender_id: userId,
            message: msg,
            first: data.first,
            last: data.last,
            image: data.image
        };
        io.sockets.emit("incoming message", content);
    });
});
