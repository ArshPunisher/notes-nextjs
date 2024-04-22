"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";
import Tags from "./Tags";
import axios from "axios";

interface Props {
  type: string
  noteData: any
  getUserNotes?: any
  setToastMsg?: any
  onClose: () => void;
}

const AddNewNotes = ({getUserNotes, setToastMsg, type, noteData, onClose }: Props) => {
  const [title, setTitle] = useState<string>(noteData?.title || '')
  const [content, setContent] = useState<string>(noteData?.content || '')
  const [tags, setTags] = useState(noteData?.tags || [])

  const [error, setError] = useState("");

  const addNewNote = async () =>{
    try {
      const response = await axios.post('/api/add-notes',{title, content, tags})
      if(response.data && response.data.notes){
        console.log(response.data.notes)
        getUserNotes();
        onClose();
        setToastMsg("Notes Added Successfully")
      }
    } catch (error:any) {
      console.log(error.response.data.message)
    }
  }

  const editNote = async () =>{
    const noteId = noteData._id
    try {
      const response = await axios.put(`/api/edit-notes/${noteId}`,{title, content, tags})
      if(response.data && response.data.notes){
        console.log(response.data.notes)
        getUserNotes();
        onClose();
        setToastMsg("Notes Updated Successfully")
      }
    } catch (error:any) {
      console.log(error.response.data.message)
    }
  }

  const handleNotes = () =>{
    setError("")
    if(!title){
      setError("Please enter the title")
      return
    }
    if(!content){
      setError("Please enter the content")
      return
    }

    if(type === 'edit'){
      editNote()
    }
    else{
      addNewNote()
    }
  }

  return (
    <div className="p-8 relative">
        <div className="flex flex-col gap-2 mb-3">
          <label className="text-sm text-slate-400 font-semibold tracking-tighter">
            TITLE
          </label>
          <div className="w-full bg-slate-50 rounded-md">
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e:any)=> setTitle(e.target.value)}
              placeholder="Have to study till 12pm"
              className="text-xl font-medium w-full px-4 py-2 bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <button
          className="flex items-center justify-center w-8 h-8 absolute top-2 right-3 rounded-full bg-slate-50 hover:bg-slate-100 cursor-pointer"
          onClick={onClose}
        >
          <MdClose className="text-slate-600 font-semibold" />
        </button>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-400 font-semibold tracking-tighter">
            CONTENT
          </label>
          <div className="w-full bg-slate-50 rounded-md">
            <textarea
              name="content"
              value={content}
              onChange={(e:any)=> setContent(e.target.value)}
              placeholder='"Juggling caffeine and textbooks until the clock strikes midnight."'
              className="text-sm w-full px-4 py-2 bg-transparent outline-none placeholder:text-slate-400"
              rows={10}
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="text-xs text-slate-400 font-medium">TAGS</label>
          <Tags tags={tags} setTags={setTags}/>
        </div>

        {error && <p className="text-xs text-red-500 pt-4">{error}</p>}

        <button onClick={handleNotes} className="w-full py-3 mt-9 text-sm text-white font-medium bg-indigo-500 hover:bg-indigo-700 rounded-md">
        {type === "edit" ? "UPDATE" : "ADD"}
        </button>
      </div>
  );
};

export default AddNewNotes;
