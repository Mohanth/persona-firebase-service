const functions = require("firebase-functions");
const axios = require("axios");

exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});

exports.getAllInquiries = functions.https.onRequest(async (req, res) => {
    let config = {
        method: 'get',
        url: 'https://withpersona.com/api/v1/inquiries/',
        headers: {
            'Authorization': 'Bearer persona_sandbox_ab49108f-a8d3-4a4a-9ce0-d8b57fb4d613'
        }
    };

    await axios(config)
        .then((response) => {
            res.set('Access-Control-Allow-Origin', '*');
            res.send(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
});
exports.getInquiryById = functions.https.onRequest(async (req, res) => {
    let inquiryId = req.query.id;
    let config = {
        method: 'get',
        url: 'https://withpersona.com/api/v1/inquiries/' + inquiryId,
        headers: {
            'Authorization': 'Bearer persona_sandbox_ab49108f-a8d3-4a4a-9ce0-d8b57fb4d613'
        }
    };

    await axios(config)
        .then((response) => {
            res.send(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
});