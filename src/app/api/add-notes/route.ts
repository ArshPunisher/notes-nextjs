import connect from "@/app/utils/dbConfig";
import { isAuthenticated } from "@/app/utils/isAuthenticated";
import { Notes } from "@/models/notes";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) =>{
  connect()
  const userId = await isAuthenticated(request)
  if(!userId){
    return NextResponse.json({error:true, message:"Unauthorized"}, {status:401})
  }
  try {
    const reqBody = await request.json()
    const {title, content, tags, isPinned} = reqBody
  
    const notes = await Notes.create({
      title, content, tags, isPinned, createdBy:userId
    })
  
    return NextResponse.json({error:false, message:"Notes Added", notes}, {status:200})
  } catch (error:any) {
    return NextResponse.json({error:true, message:error.message}, {status:400})
  }
}