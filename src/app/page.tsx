"use client";

import Navbar from "@/components/Navbar";
import NoteCard from "@/components/NoteCard";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import AddNewNotes from "@/components/AddNewNotes";
import axios from "axios";
import Toast from "@/components/Toast";
import Empty from "@/components/Empty";
import addimg from '@/assets/images/add_img.svg'
import noteimg from '@/assets/images/search_img.svg'

export default function Home() {
  const [userInfo, setUserInfo] = useState<object>();

  const [userNotes, setUserNotes] = useState([]);

  const [isSearch, setIsSearch] = useState<boolean>(false)

  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToast, setShowToast] = useState({
    isShown: false,
    message:'',
    type: 'add'
  })

  const setToastMsg = (message:string, type:string)=>{
    setShowToast({
      isShown: true,
      message,
      type
    })
  }

  const handleCloseToast = () =>{
    setShowToast({
      isShown: false,
      message:'',
      type:'add'
    })
  }
  
  const getUserInfo = async () => {
    try {
      const response = await axios.get("/api/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      }
    }
  };

  const getUserNotes = async () => {
    try {
      const response = await axios.get("/api/get-notes");
      if (response.data && response.data.notes) {
        setUserNotes(response.data.notes);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    getUserNotes();
  }, []);

  const onSearchNotes = async (query: any) =>{
    try {
      const response = await axios.get('/api/search-notes',{
        params: {query}
      })

      if(response.data && response.data.notes){
        setIsSearch(true)
        setUserNotes(response.data.notes);
      }
    } catch (error: any) {
      if(error.response && error.response.data && error.response.data.message){
        console.log("heyy",error.response.data.message)
      }
    }
  }

  const handleClearSerach = () => {
    setIsSearch(false)
    getUserNotes()
  };

  const handleEdit = async (noteDetails: any) => {
    setOpenModal({isShown: true, type: "edit", data: noteDetails})
  }

  const updatedPinned = async (noteDetails: any) =>{
    const noteId = noteDetails._id;
    try {
      const response = await axios.put(`/api/update-pinned/${noteId}`, {
        isPinned: !noteDetails.isPinned
      });
      if (response.data && !response.data.error) {
        console.log(response);
        getUserNotes();
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("Error",error.response.data.message);
      }
    }
  };

  const handleDelete = async (noteDetails: any) => {
    const noteId = noteDetails._id;
    try {
      const response = await axios.delete(`/api/delete-notes/${noteId}`);
      if (response.data && !response.data.error) {
        console.log(response);
        getUserNotes();
        setToastMsg("Notes Deleted Successfully.", "delete")
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("Error",error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar userInfo={userInfo} onSearchNotes={onSearchNotes} handleClearSerach={handleClearSerach} />

      <div className="p-2 md:px-8 mx-auto">
        {userNotes.length > 0 ? <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-3 mt-4 md:mt-8">
          {userNotes && userNotes.map((note: any) => (
              <NoteCard
                title={note.title}
                content={note.content}
                isPinned={note.isPinned}
                date={note.createdAt}
                tags={note.tags}
                onEdit={() => handleEdit(note)}
                onDelete={() => handleDelete(note)}
                onPinned={() => updatedPinned(note)}
              />
            ))}
        </div> : <Empty imgSrc={isSearch ? noteimg: addimg} message={isSearch? 'Oops! No notes found matching your search.':"Start crafting notes today, shaping your knowledge into tools that will sculpt a better tomorrow for you"}/>}

      </div>

      <div
        className="md:w-16 md:h-16 md:right-10 md:bottom-10 w-14 h-14 flex items-center justify-center fixed right-8 bottom-8 rounded-2xl cursor-pointer bg-indigo-500 hover:bg-indigo-700"
        onClick={() => setOpenModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-[3rem] text-white font-semibold" />
      </div>

      <Modal
        ariaHideApp={false}
        isOpen={openModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[26rem] md:w-[36rem] max-h-3/4 bg-white rounded-md mx-auto mt-14 md:mt-[5rem] p-5"
      >
        <AddNewNotes
          type={openModal.type}
          noteData={openModal.data}
          setToastMsg={setToastMsg}
          getUserNotes={getUserNotes}
          onClose={() =>
            setOpenModal({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>
      <Toast isShown={showToast.isShown} message={showToast.message} type={showToast.type} onClose={handleCloseToast} />
    </div>
  );
}
