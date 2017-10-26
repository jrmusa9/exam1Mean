let express = require('express');
let app = express();
let session = require('express-session')


//SESSION
app.use(session({secret:'SecretCode'}))

//BODY PARSER
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//STATIC FOLDER
app.use(express.static(__dirname + '/examTest2/dist'));




//MONGO DB
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pollSchema');

const path = require('path')

var Schema = mongoose.Schema;

let UserSchema = new mongoose.Schema({
    name: {type: String, required:true},
    _questions: [{type: Schema.Types.ObjectId, ref: 'Question'}]
})

let QuestionSchema = new mongoose.Schema({
    question: {type: String, required:true},
    option1: {type:{text:String,required:true, score:0}},
    option2: {type:{text:String, score:0}},
    option3: {type:{text:String, score:0}},
    option4: {type:{text:String, score:0}},
    _userID: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

mongoose.model('User', UserSchema);
mongoose.model('Question', QuestionSchema);
    
let User = mongoose.model('User');
let Question = mongoose.model('Question');





//ROUTER

//CREATE QUESTION/POLL
app.post("/questions", function (req, response){
    console.log('@server Rout /Question', req.body)
    User.findOne({_id:req.body._userID}, function(err, user){
        console.log('found the user!', user)
        var newQuestion = new Question(
            {
                question:req.body.question, 
                option1:req.body.option1, 
                option2:req.body.option2, 
                option3:req.body.option3, 
                option4:req.body.option4, 
            })

        newQuestion._userID = req.body._userID

        newQuestion.save(function(err){
            if(err){
                console.log(err)
            } else {
                user._questions.push(newQuestion)
                user.save(function(err){
                if(err){
                    console.log("error saving user")
                    
                }else{
                    return response.json(newQuestion)
                }
            })
        }
        });
    })
})


//CREATE USER
app.post('/users',(req, res)=>{
    User.findOne({name:req.body.name},(err, user)=>{
        if(user){
            return res.json(user)

        }else if(user == null){
            User.create(req.body, (err,user)=>{
                if(err){
                    console.log(err)
                }else{
                    return res.json(user)
                }
            })
        }else{
            console.log(err)
        }
    })
}) 


//GET ALL QUESTIONS
app.get('/getQuestions',(req,res)=>{
    Question.find({},(err, questions)=>{
        if(err){
            console.log(err)
        }else{
            return res.json(questions);
        }
    })
})


//GET ONE QUESTION
app.get('/getOneQuestion/:id',(req,res)=>{
    console.log('question ID', req.params.id)
    Question.findOne({_id:req.params.id},(err, question)=>{
        if(err){
            console.log(err)
        }else{
            return res.json(question);
        }
    })
})

//UPDATE ONE QUESTION's VOTES
app.post('/update',(req,res)=>{
    console.log('at server, updating', req.body)
    Question.update({_id:req.body._id},req.body,function (err, data){
        if(err){
            console.log(err)
        }else{
            return res.json(data)
        }
    })
})



// GET ALL USERS
app.get('/getAllUsers',(req,res)=>{
    User.find({},(err, users)=>{
        if(err){
            console.log(err)
        }else{
            return res.json(users);
        }
    })
})

// DELETE QUESTIONS
app.delete('/delete/:id',(req,res, next)=>{
    console.log('@ server deleting',req.params.id)
    Question.deleteOne({_id:req.params.id },(err, data)=>{
        if(err){
            console.log(err)
        }else{
            console.log('deleting')
            return res.json(data);
        }
    })
})



app.all('*', (req, res, next)=>{
    res.sendfile(path.resolve('./examTest2/dist/index.html'))    
})

app.listen(1337, ()=> console.log("Connected to port 1337"))