const express = require('express');
const helper = require('./api/hashHelpers');
const bcrypt = require('bcryptjs');
require('dotenv');

const server = express();

server.use(express.json());

const port = process.env.PORT || 5000;

//Some bcrypt voodoo inside





//an api called users. When we query it, it returns all the users in the db we created


// server.get('/', (req, res) => {
//     res.status(200).send('<img src="https://media.giphy.com/media/d3Kq5w84bzlBLVDO/giphy.gif" alt="it\'s alive"/>')
// });

server.get('/api/users', (req, res) => {
    helper.getAllData()
        .then(data => {
        res.send(data)
    });
});
server.post('/api/register', (req, res) => {
let credentials = req.body;
const hash = bcrypt.hashSync(credentials.password, 14);
credentials.password = hash;
    helper.add(credentials)
    .then(data => {
        if (!data && !bcrypt.compareSync(hash, credentials.password)) {
            return res.status(401).json({message: "Failed to authenticate"})
        }
        else {
            return res.status(201).json({message: `Welcome to the good life, ${credentials.username}!`})
        }
    });
})

server.post('/api/login', (req, res) => {
    let credentials = req.body;
    helper.login(credentials)
    .then(data => {
        res.status(200).json({message: `Welcome ${credentials.username}!`})
    })
})

server.listen(port, () => console.log(`Listening on ${port}!`));