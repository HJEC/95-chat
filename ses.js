const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-central-1"
});

exports.sendEmail = function(recipient, message, subject) {
    return ses
        .sendEmail({
            Source: "dev_test <hjec92+amazon@gmail.com>",
            Destination: {
                ToAddresses: [recipient]
            },
            Message: {
                Body: {
                    Text: {
                        Data: message
                    }
                },
                Subject: {
                    Data: subject
                }
            }
        })
        .promise()
        .then(() => console.log("ses: good"))
        .catch(err => console.log(err));
};
