import { NextRequest, NextResponse } from "next/server";
import { Notes } from "@/models/notes";

export const DELETE = async (request: NextRequest, {params}: {params: {id:string}})=>{
  try {
    console.log("params", params)
    await Notes.deleteOne({_id:params.noteId})
    return NextResponse.json({error:false, message:"Deleted"}, {status:200})
  } catch (error:any) {
    return NextResponse.json({error:true, message:error.message}, {status:400})
  }
}