// EXPRESS //
const express = require("express");
const app = express();
const compression = require("compression");
// SECURITY //
const cookieSession = require("cookie-session");
const secrets = require("./secrets.json");
const csurf = require("csurf");
const { hashPass, compare } = require("./bcrypt");
const cryptoRandomString = require("crypto-random-string");
// FUNCTIONS //
const { addUser, getUser, storeCode, verify, updatePassword } = require("./db");
const { sendEmail } = require("./ses");

app.use(compression());
app.use(express.json());
app.use(
    cookieSession({
        secret: secrets.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(csurf());

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

// REGISTRATION PAGE //
app.get("/registration", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    console.log("post request body: ", req.body);

    let first = req.body.first,
        last = req.body.last,
        email = req.body.email,
        password = req.body.password;

    hashPass(password).then(hashedPass => {
        addUser(first, last, email, hashedPass)
            .then(result => {
                req.session.userId = result[0];

                console.log("cookie attached!: ", req.session.userId);
                res.json(result[0]);
            })
            .catch(err => {
                console.log("error in register post: ", err);
                res.json(false);
            });
    });
});

// LOGIN PAGE //
app.post("/loginUser", (req, res) => {
    let email = req.body.email,
        password = req.body.password;

    getUser(email)
        .then(data => {
            console.log("data: ", data);

            compare(password, data[0].password).then(result => {
                console.log("login result: ", result);
                if (result) {
                    req.session.userId = data[0].id;
                    console.log("login cookie: ", req.session.userId);
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

// RESET PASSWORD //

app.post("/recover", (req, res) => {
    let email = req.body.email;
    let subject = `Soc_Net: reset password`;
    const secretCode = cryptoRandomString({
        length: 6
    });

    getUser(email)
        .then(data => {
            console.log("email exists: ", data);
            let name = data[0].first;

            let message = `Hi ${name}, here is your reset code: ${secretCode}. Please use this in the reset password form.`;

            if (data) {
                res.json(data[0]);

                sendEmail(email, message, subject)
                    .then(() => {
                        console.log("sendEmail succesful!");
                    })
                    .catch(err => {
                        console.log("sendEmail failed...", err);
                        res.json(false);
                    });

                storeCode(email, secretCode)
                    .then(data => {
                        console.log("storeCode succesful!", data);
                    })
                    .catch(err => {
                        console.log("storeCode failed...", err);
                        res.json(false);
                    });
            }
        })
        .catch(err => {
            console.log("email does not exist: ", err);
            res.json(false);
        });
});

app.post("/reset", (req, res) => {
    let email = req.body.email;
    let code = req.body.code;
    let password = req.body.password;

    verify(email).then(data => {
        console.log("verify attempted: ", data);
        console.log("data: ", data[0].code);

        if (code == data[0].code) {
            hashPass(password)
                .then(hashedPass => {
                    updatePassword(hashedPass, email)
                        .then(response => {
                            console.log(
                                "updatePassword succesful!: ",
                                response
                            );
                            res.json(data[0]);
                        })
                        .catch(err => {
                            console.log("updatePassword failed...", err);
                        });
                })
                .catch(err => {
                    console.log("hashPass failed...", err);
                });
        }
    });
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
    console.log("I'm listening.");
});
