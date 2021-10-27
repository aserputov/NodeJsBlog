const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost') 
mongoose.connect('mongodb+srv://serputov:serputov@cluster0.ftpdg.mongodb.net/ads?retryWrites=true&w=majority', {useNewUrlParser: true});
// BlogPost.create({
//     Name: "Anatoliy",
//     Phone: "4168331987",
//     Email: "serputoff@gmail.com",
//     Description: "Find Me",
//     Title: "Find",
//     Category: "ineedwork",
// }, (error, blogpost) =>{ console.log(error,blogpost)
// })

