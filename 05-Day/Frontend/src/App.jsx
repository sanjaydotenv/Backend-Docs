import React, { useContext, useEffect } from "react";
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
    await axiosInsatnce.delete(`/${id}`);
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
