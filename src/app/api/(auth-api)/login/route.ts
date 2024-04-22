import connect from "@/app/utils/dbConfig";
import { createToken } from "@/app/utils/jwt";
import { Users } from "@/models/users";
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (request: NextRequest) =>{
  try {
    const reqBody = await request.json()
    const {email, password} = reqBody;
  
    const user = await Users.findOne({email})
    if(!user){
      return NextResponse.json({error:true, message:"User doesn't exist"}, {status:404})
    }
  
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword){
      return NextResponse.json({error:true, message:"Incorrect Password"}, {status:400})
    }

    const payload = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email
    }

    const token = createToken(payload)

    const response = NextResponse.json({error:false, message:"Login Successful", token}, {status:200})

    response.cookies.set("token", token)

    return response;

  } catch (error:any) {
    return NextResponse.json({error:true, message:error.message}, {status:400})
  }
}