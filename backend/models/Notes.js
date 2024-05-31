const moongose=require("mongoose")
const NotesSchema={
    user:{
        type:moongose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
}
const notes=moongose.model('notes',NotesSchema)
module.exports=notes