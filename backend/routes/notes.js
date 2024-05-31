const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const Notes = require('../models/Notes')
const { decodeAccessToken } = require('../token')
const app = express()
app.use(express.json())

// uploading a note 
const validator = [
    body('title').notEmpty(),
    body('desc').notEmpty()
]
router.post('/uploadNotes', validator, async (req, res) => {
    console.log(req.headers.authorization)
    const decodedToken =await decodeAccessToken(req.headers.authorization)
    if (!decodedToken) {
        console.log("invalid authorization")
        res.status(400).send("invalid authorization")
    }
    else {
        const userid=decodedToken.user
        if(!userid){
            console.log("userid is not present")
            res.status(400).send('Unauthorized user')
        }
        // console.log(userid)
        const result = await validationResult(req)
        if (!result.isEmpty()) {
            res.status(400).send('Input Not Validated')
        }
        else {
            const { title, desc } = req.body;
            const tag = req.body.tag == undefined ? "General" : req.body.tag
            const user = new Notes({ user:userid,title, desc, tag })
            await user.save()
            res.status(200).send('Notes Saved')
        }
    }
})

// deleting a note 
router.get('/delete', async (req, res) => {
    const decodedToken = decodeAccessToken(req.headers.authorization)
    if (!decodedToken) {
        console.log("invalid authorization")
        res.send("invalid authorization")
    }
    else {
        const userid=decodedToken.user
        const notes_id=req.query.id
        console.log(userid)
        console.log('notesid: ',notes_id)
        Notes.deleteOne({id:notes_id})
        res.status(200).send("deleted")
    }
})

// fetching all notes 
router.get('/fetchNotes',async(req,res)=>{
    const decodedToken =await decodeAccessToken(req.headers.authorization)
    if (!decodedToken) {
        console.log("invalid authorization")
        res.send("invalid authorization")
    }
    else {
        const userid=decodedToken.user
        console.log("userid: ",userid)
        const allNotes=await Notes.find({user:userid})
        res.status(200).json(allNotes)
    }
})

// displaying notes 
// app.get('display',()=>{
    
// })

module.exports = router