import React, { useContext, useEffect, useState } from "react";
import CreateNoteForm from "./components/CreateNoteForm";
import Notes from "./components/Notes";
import { axiosInsatnce } from "./components/AxiosInstance";
import { MyContext } from "./components/ContextApi";

const App = () => {
  const { allData, setAllData } = useContext(MyContext);

  const allNotes = async () => {
    const res = await axiosInsatnce.get("/getAllNotes");
    setAllData(res.data.allNotes);
  };

  const deleteNote = async (id) => {
    const res = await axiosInsatnce.delete(`/${id}`);
    console.log(res);
    allNotes();
  };

  useEffect(() => {
    allNotes();
  }, []);

  return (
    <div>
      <CreateNoteForm />
      <Notes deleteNote={deleteNote} allData={allData} />
    </div>
  );
};

export default App;
