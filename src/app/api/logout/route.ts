import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) =>{
  try {
    cookies().delete('token')
    return NextResponse.json({error:false, message:"Logged Out!"}, {status:200})
  } catch (error:any) {
    return NextResponse.json({error:true, message:error.message}, {status:400})
  }
}