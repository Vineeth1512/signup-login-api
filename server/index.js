const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userModel = require("./models/user.model")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.json("welcome to vercel");
})


app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already have an account")
            } else {
                userModel.create({ name: name, email: email, password: password })
                    .then(result => res.json(result))
                    .catch(err => res.json(err))
            }
        }).catch(err => res.json(err))
})





mongoose.connect('mongodb+srv://dbUser:dbUserPassword@atlascluster.w6sb48g.mongodb.net/UserRegister?retryWrites=true&w=majority');

app.listen(3001, () => {
    console.log("Server is Running")
})
