import { Schema, models, model } from "mongoose";

const notesSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  content:{
    type: String,
    required: true
  },
  tags:{
    type: [String],
    default: []
  },
  isPinned:{
    type: Boolean,
    default: false
  },
  createdBy:{
    type: Schema.Types.ObjectId,
    ref: "users"
  }
}, {timestamps:true})

export const Notes = models.notes || model("notes", notesSchema)