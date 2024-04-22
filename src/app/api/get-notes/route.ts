import connect from "@/app/utils/dbConfig";
import { isAuthenticated } from "@/app/utils/isAuthenticated";
import { Notes } from "@/models/notes";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest) =>{
  connect()
  const userId = await isAuthenticated(request)
  if(!userId){
    return NextResponse.json({error:true, message:"Unauthorized"}, {status:401})
  }
  try {
    const notes = await Notes.find({createdBy:userId}).sort({isPinned: -1})
    console.log("GOTT NOTESS", notes)
    return NextResponse.json({error:false, message:"Got all Notes", notes}, {status:200})
  } catch (error:any) {
    return NextResponse.json({error:true, message:error.message}, {status:400})
  }
}