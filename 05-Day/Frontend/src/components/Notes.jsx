import { useContext } from "react";
import { MyContext } from "./ContextApi";

const Notes = ({ deleteNote }) => {
  const { allData, setFormData, setIsUpdate, isLoading } =
    useContext(MyContext);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>

          <p className="text-gray-500 mt-1">
            Manage all your notes in one place
          </p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allData?.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {note?.title}
              </h2>

              <p className="text-gray-500 mt-3 leading-6">
                {note?.description}
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => {
                    setFormData(note);
                    setIsUpdate(true);
                  }}
                  className="flex-1 bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteNote(note._id)}
                  className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
