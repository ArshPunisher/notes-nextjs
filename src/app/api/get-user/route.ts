import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/models/users";
import { isAuthenticated } from "@/app/utils/isAuthenticated";
import connect from "@/app/utils/dbConfig";

export const GET = async (request: NextRequest) =>{
  connect()
  try {
    const userId = await isAuthenticated(request)

    const user = await Users.findById({_id:userId})
    if(user){
      return NextResponse.json({error:false, message:"Got user data", user}, {status:200})
    }else{
      return NextResponse.json({error:true, message:"Not got user data"}, {status:404})
    }
  } catch (error:any) {
    return NextResponse.json({error:true, message:error.message})
  }
}
