import { Schema, models, model } from "mongoose";
import { useRef } from "react";

const userSchema = new Schema({
  fullname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  gender:{
    type: String
  }
}, {timestamps:true})

export const Users = models.users || model("users", userSchema)