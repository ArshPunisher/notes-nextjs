"use client"

import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface Props{
  value: string;
  onChange: ()=> void;
  onClearSearch: ()=> void;
  handleSearch: ()=> void;
}

const SearchBar = ({value, onChange, onClearSearch, handleSearch}: Props) => {
  
  return (
    <div className="w-[10rem] md:w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        placeholder="Search Notes"
        type="text"
        value={value}
        onChange={onChange}
        className="w-full text-sm font-medium outline-none py-[11px] bg-transparent"
      />

      <div className="flex items-center justify-center">
        {value && <MdClose className="text-xl text-slate-500 hover:text-black cursor-pointer mr-1" onClick={onClearSearch}/>}
        <FaSearch className="text-slate-400 hover:text-black cursor-pointer" onClick={handleSearch}/>
      </div>
    </div>
  );
};

export default SearchBar;
