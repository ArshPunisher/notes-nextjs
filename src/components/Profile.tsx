"use client"

import { getInitials } from "@/app/utils/helper"
import axios from "axios"
import { useRouter } from "next/navigation"

interface Props{
  userInfo:any
}


const Profile = ({userInfo}: Props) => {
  const router = useRouter()

  const onLogout = async () =>{
    try {
      await axios.get('/api/logout')
      localStorage.clear()
      router.replace('/login')
    } catch (error:any) {
      console.log(error.response.data.message)
    }
  }

  return (
    <div className="flex items-center  gap-3">
      <div className="w-10 h-10 md:w-12 md:h-12 text-slate-900 font-medium bg-slate-100 cursor-pointer rounded-full flex items-center justify-center">
        {getInitials(userInfo.fullname)}
      </div>

      <div className="text-center">
        <p className="hidden md:flex text-sm font-medium text-center">
          {userInfo.fullname}
        </p>
        <button className="text-sm text-slate-800 font-medium hover:text-black hover:underline hover:underline-offset-2" onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Profile
