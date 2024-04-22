import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/utils/dbConfig";
import { Users } from "@/models/users";
import bcrypt from 'bcryptjs'
import { createToken } from "@/app/utils/jwt";

connect();

export const POST = async (request: NextRequest) =>{
  try {
    const reqBody = await request.json()
    const {fullname, email, password, gender} = reqBody;

    const isExist = await Users.findOne({email})
    if(isExist){
      return NextResponse.json({error:true, message:"Email already exists"}, {status:401})
    }
    const hashPassword = await bcrypt.hash(password, 12)
    const user = new Users({
      fullname, email, password:hashPassword, gender
    })
    const savedUser = await user.save()
    const payload = {
      _id: savedUser._id,
      fullname: savedUser.fullname,
      email: savedUser.email,
    }

    const token = createToken(payload)

    const response = NextResponse.json({error:false, message:"Registered Successfully.", token}, {status:201})

    response.cookies.set("token", token)

    return response;

  } catch (error:any) {
    return NextResponse.json({error:true, message:error.message}, {status:400})
  }
} 