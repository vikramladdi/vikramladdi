const express =  require('express');
const fetchUser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Note = require('../models/Notes');


/***
 * @Create new note end point:Login User
 * @POST @Route 1
 * /api/notes/createnote
 */
router.post('/createnote',fetchUser,[
    body('title').isLength({ min: 4 }),
    body('description').isLength({ min: 10 })
], async (req,res)=>{
    
        const {title,description,tag} = req.body;
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).send({ error: errors.array() })
        }

        const createNote = new Note({ title,description,tag,user:req.user.id});
        const savedata = await createNote.save();

        res.status(200).send({data:savedata,message:"Note successfully Created"})
        
    } catch (error) {
        res.status(500).send({error:error.message})
    }
})

/***
 * @Get Route 2: All Notes end point:Login User //api/notes/fetchallnotes
 */
router.get('/fetchallnotes',fetchUser, async (req,res)=>{
     
    try {

        //get User by (fetchUser) middleware
        const userdata = req.user;
        //console.log(userdata.id)
        const getNote = await Note.find({user:userdata.id});

        res.status(200).send({data:getNote,message:"Get note successfully"});

    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

/***
 * @Put Route 3: update note end point:Login User //api/notes//updatenote/:id
 */
router.put('/updatenote/:id',fetchUser, async (req,res)=>{
     
    try {

        const {title,description,tag } = req.body;

        //Making a user object to parse to the update 
        let updateNote = {}
        if(title){updateNote.title = title};
        if(description){updateNote.description = description}
        if(tag){updateNote.tag = tag}

        //Find the note by Note table id
        let note = await Note.findById(req.params.id);
        if(!note){res.status(404).send('Not found')}

        //get User by (fetchUser) middleware OR token auth
        const userdata = req.user;
        //console.log(userdata.id)

        //check note of reated to User
        if(note.user.toString() !== userdata.id){
            res.status(401).send("Not Allowed")
        }

        const checkUpdate = await Note.findByIdAndUpdate(req.params.id,updateNote,{new:true})

        res.status(200).send({data:checkUpdate,message:`note Id {${checkUpdate._id}} successfully updated`});

    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


/***
 * @Delete Route 4: Delete note end point:Login User //api/notes/delete/:id
 */
router.delete('/delete/:id',fetchUser, async (req,res)=>{
     
    try {

        //Find the note by Note table id
        let note = await Note.findById(req.params.id);
        if(!note){res.status(404).send('Not found')}

        //get User by (fetchUser) middleware OR token auth
        const userdata = req.user;
        //console.log(userdata.id)

        //check note of reated to User
        if(note.user.toString() !== userdata.id){
            res.status(401).send("Not Allowed")
        }

        const checkUpdate = await Note.findByIdAndDelete(req.params.id)


        res.status(200).send({data:checkUpdate,message:`note Id {${checkUpdate._id}} successfully Deleted`});

    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
module.exports = router;