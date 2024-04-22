import { isAuthenticated } from "@/app/utils/isAuthenticated";
import { Notes } from "@/models/notes";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/utils/dbConfig";

connect()

export const GET = async (request: NextRequest) =>{

  const userId = await isAuthenticated(request)

  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  
  try {
    if(!query){
      return NextResponse.json({error:true, message:"Search query is required"}, {status:400})
    }

    const notes = await Notes.find({createdBy: userId, $or: [
      {title: {$regex: new RegExp(query, 'i')}},
      {content: {$regex: new RegExp(query, 'i')}},
    ]})

    console.log(notes)
    return NextResponse.json({error:false, msg:"success get all notes", notes}, {status:200})
  } catch (error:any) {
    return NextResponse.json({error:true, message:error.message}, {status:404})
  }
}


