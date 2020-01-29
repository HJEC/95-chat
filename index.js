const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const secrets = require("./secrets.json");
const csurf = require("csurf");
const { addUser, logIn } = require("./db");
const { hashPass, compare } = require("./bcrypt");

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
            .catch(err => console.log("error in register post: ", err));
    });
});

app.post("/loginUser", (req, res) => {
    let email = req.body.email,
        password = req.body.password;

    logIn(email)
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
//__THIS MUST BE THE LAST ROUTE__//
app.listen(8080, function() {
    console.log("I'm listening.");
});
