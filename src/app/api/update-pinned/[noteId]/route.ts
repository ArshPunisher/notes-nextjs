import { Notes } from "@/models/notes";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest, {params}: {params: {id:string}}) =>{

  const reqBody = await request.json()
  const {isPinned} = reqBody;
  try {
    const notes = await Notes.findOneAndUpdate({_id:params.noteId}, {isPinned})

    return NextResponse.json({error:false, message:"Notes Updated", notes}, {status:200})
  } catch (error:any) {
    return NextResponse.json({error:true, message:error.message}, {status:400})
  }
}