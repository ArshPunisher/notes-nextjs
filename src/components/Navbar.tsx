"use client"

import { useState } from "react";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import Image from "next/image";
import logo from '@/assets/images/post-it.svg'

interface Props{
  userInfo?: object
  handleClearSerach: () => void
  onSearchNotes: () => void
}

const Navbar = ({handleClearSerach, userInfo, onSearchNotes}: Props) => {
  const [searchVal, setSearchVal] = useState<string>("");

  const handleSearch = () => {
    if(searchVal){
      onSearchNotes(searchVal);
    }
  };

  const onClearSearch = () => {
    setSearchVal('');
    handleClearSerach()
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-lg">
      <div className="flex items-center justify-center"> 
      <Image src={logo} alt="Logo" width={40} height={40}/><p className="hidden md:flex md:items-center font-semibold">Notes</p> 
      </div>
      {userInfo && <SearchBar
        value={searchVal}
        onChange={(e: any) => setSearchVal(e.target.value)}
        onClearSearch={onClearSearch}
        handleSearch={handleSearch}
      /> }
      {userInfo && <Profile userInfo={userInfo}/> }
    </div>
  );
};

export default Navbar;
