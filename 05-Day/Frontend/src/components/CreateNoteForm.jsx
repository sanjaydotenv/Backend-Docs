import React, { useContext, useState } from "react";
import { axiosInsatnce } from "./AxiosInstance";
import { MyContext } from "./ContextApi";

const CreateNoteForm = () => {
  const [formData, setFormData] = useState({});
  const { setAllData } = useContext(MyContext);

  const handleFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosInsatnce.post("/create", formData);
    setAllData((prev) => [...prev, res.data.Note]);
  };

  

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 space-y-5"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="font-medium">
          Title
        </label>

        <input
          onInput={handleFormData}
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          className="border rounded-lg px-4 py-2 outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="font-medium">
          Description
        </label>

        <textarea
          onInput={handleFormData}
          id="description"
          name="description"
          rows="5"
          placeholder="Enter description"
          className="border rounded-lg px-4 py-2 outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateNoteForm;
