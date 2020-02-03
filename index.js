// EXPRESS / COMPRESSION //
const express = require("express"),
    app = express(),
    compression = require("compression"),
    url = require("url"),
    querystring = require("querystring");

// SECURITY //
const cookieSession = require("cookie-session"),
    secrets = require("./secrets.json"),
    csurf = require("csurf"),
    cryptoRandomString = require("crypto-random-string"),
    { hashPass, compare } = require("./bcrypt");
// FUNCTIONS //
const {
    addUser,
    getUser,
    getReqUser,
    storeCode,
    verify,
    updatePassword,
    updateImage,
    updateBio
} = require("./db");
const { sendEmail } = require("./ses");
const { upload } = require("./s3");

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

app.use(
    cookieSession({
        secret: secrets.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
app.use(csurf());

// SERVE FILE IN DEVELOPMENT OR PRODUCTION //
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static("./public"));
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
// __USE__

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
        res.json(result[0]);
        console.log("cookie attached!: ", req.session.userId);
    } catch (err) {
        console.log("error in register post: ", err);
        res.json(false);
    }
});

// LOGIN PAGE //
app.post("/loginUser", (req, res) => {
    let { email, password } = req.body;
    getUser(email)
        .then(data => {
            compare(password, data[0].password).then(isTrue => {
                if (isTrue) {
                    req.session.userId = data[0].id;
                    req.session.email = data[0].email;
                    res.json(data[0]);
                } else {
                    console.log("login compare failed");
                    res.json(false);
                }
            });
        })
        .catch(err => {
            console.log("Error in login: ", err);
            res.json(false);
        });
});

// GET USER INFO //

app.get("/user", async (req, res) => {
    let email = req.session.email;
    //get user image, info, first, last, bio
    try {
        let rows = await getUser(email);
        res.json({
            first: rows[0].first,
            last: rows[0].last,
            id: rows[0].id,
            image: rows[0].image || "/default.jpg",
            bio: rows[0].bio
        });
    } catch (err) {
        console.log("failed to get user on app load", err);
    }
});

// GET OTHER USER //
app.get("/api/user/:id", async (req, res) => {
    console.log("req id: ", req.params.id);

    let data = await getReqUser(req.params.id);
    console.log("req user data: ", data[0]);
    res.json({
        friendFirst: data[0].first,
        friendlast: data[0].last,
        friendid: data[0].id,
        friendimage: data[0].image || "/default.jpg",
        friendbio: data[0].bio
    });
});

// UPLOAD NEW PROFILE PHOTO //
app.post("/upload", uploader.single("file"), upload, async (req, res) => {
    let imageUrl = config.s3Url + req.file.filename;
    let email = req.session.email;
    try {
        let image = await updateImage(imageUrl, email);
        console.log("update image result: ", image[0].image);
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
        let data = await updateBio(email, bio);
        console.log("update bio result: ", data[0]);
        res.sendStatus(200);
    } catch (err) {
        console.log("failed to update bio - index-178: ", err);
        res.sendStatus(500);
    }
});

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
            console.log("sendEmail succesful.");
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
        console.log("data: ", data[0].code);
        if (code == data[0].code) {
            let hash = await hashPass(newPassword);
            let response = await updatePassword(hash, email);
            console.log("async updatePassword success: ", response);
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

//__router__//
app.listen(8080, function() {
    console.log("See you space cowboy");
});
