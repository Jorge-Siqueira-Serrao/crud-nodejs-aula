const mongoose = require("mongoose");

//const MONGODB_URI = 'mongodb://localhost/node-app';
const MONGODB_URI = 'mongodb+srv://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASSWORD+'@cluster0.cdrib.mongodb.net/'+process.env.MONGODB_DATA+'?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log("Database in connected to", db.connection.host))
    .catch(err => console.log(err));