const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 80;
const bodyparser = require('body-parser');

app.use(express.urlencoded());
app.use('/static', express.static('static'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
    
    // Define mongoSchema
    const contactSchema = new mongoose.Schema({
        name: String,
        phone: String,
        email: String,
        address: String,
        desc: String 
    });
    
    var Contact = mongoose.model('contactData', contactSchema);

    app.get('/', (req, res) => {
        res.status(200).render('home.pug', {});
    });
    
    app.get('/contact', (req, res) => {
        res.status(200).render('contact.pug', {});
    });
    
    app.post('/contact', (req, res) => {
        var myData = new Contact(req.body);
        let name = myData.name;
        console.log(name);
        myData.save();
        res.status(200).render('contact.pug', {});
    });
    
    app.listen(port, () => {
        console.log("Server is running at port 80");
    });
}
