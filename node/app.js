const https = require('https');
const express = require('express');


const app = express();

app.get('/spellcheck', (req, res) => {

    const { term } = req.query;

    const host = 'localhost:8080';
    const path = '/api/v1/single/spellcheck/' + term;
    
    const request_params = {
        method : 'POST',
        hostname : host,
        path : path,
    };

    const response_handler = function(response) {
        let body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            res.status(200).send(body);
        });
        response.on('error', function(e) {
            res.status(500).send(e);
        });
    };
    
    const request = https.request(request_params, response_handler);
    request.write('term=' + term);
    request.end();

});

app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log('Running Port On: http://localhost:8080')
    console.log('TRY THIS: http://localhost:8080/spellcheck?term=<YOUR-TERM-HERE>')
})

