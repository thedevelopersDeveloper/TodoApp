require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const taskModel = require('./taskModel')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs")

app.get('/',async (req,res) => {
    let task = await taskModel.find()
    res.render("index",{task})
})

app.post('/create',async (req,res) => {
    let {task} = req.body
    let taskCreated = await taskModel.create({
        task
    })
    res.redirect('/')
})

app.get('/update/:id',async (req,res) => {
    let task = await taskModel.findOne({_id: req.params.id})
    res.render('update', {task})
})

app.post('/edit/:id',async (req,res) =>{
    let {task} = req.body
    let taskUpdated = await taskModel.findOneAndUpdate({_id:req.params.id},{task},{new: true})
    res.redirect('/')
})


app.get('/delete/:id',async (req,res) =>{
    let taskDeleted = await taskModel.findOneAndDelete({_id:req.params.id})
    res.redirect('/')
})

app.get('/about',(req,res) => {
    res.render('about')
})

app.listen(port, ()=>{
    console.log('the app is running')
})