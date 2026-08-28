import { useForm } from "react-hook-form";
import axios from "axios";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("age", data.age);

    for (let i = 0; i < data.image.length; i++) {
      formData.append("image", data.image[i]);
    }

    console.log("Form Data -> ", formData);

    await axios.post("http://localhost:3000/uploadFile", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create Profile
        </h2>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                       outline-none focus:border-blue-500 focus:ring-2
                       focus:ring-blue-100 transition"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Age */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>

          <input
            type="number"
            placeholder="Enter your age"
            {...register("age", {
              required: "Age is required",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                       outline-none focus:border-blue-500 focus:ring-2
                       focus:ring-blue-100 transition"
          />

          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        {/* Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Image
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            {...register("image", {
              required: "Image is required",
            })}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl
                       cursor-pointer text-sm
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:bg-blue-50 file:text-blue-600
                       hover:file:bg-blue-100"
          />

          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl
                     font-semibold hover:bg-blue-700
                     active:scale-[0.98] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
