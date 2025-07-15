import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
const BASE_URL = import.meta.env.VITE_API_URL;


function AddBook() {
  const titleRef = useRef();
  const authorRef = useRef();
  const descriptionRef = useRef();
  const publishDateRef = useRef();
  const [category, setCategory] = useState("");
  const coverImageRef = useRef();
  const [coverImage, setCoverImage] = useState(null);
  const pdfRef = useRef();
  const[pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageClick = (e) => {
    coverImageRef.current.click();
  }

  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    if(file){
      setCoverImage(file);
    }
  }
  const handlePdfClick = (e) => {
    pdfRef.current.click();
  }

  const handlePdfFile = (e) => {
    const file = e.target.files[0];
    if(file){
      setPdfFile(file);
    }
  }

  const handleSubmit = async (e)=> {
    e.preventDefault();

    if(uploading) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('title', titleRef.current.value);
    formData.append('author', authorRef.current.value);
    formData.append('description', descriptionRef.current.value);
    formData.append('publishDate', publishDateRef.current.value);
    formData.append('category', category);
    formData.append('coverImage', coverImage);
    formData.append('pdfFile', pdfFile);

    try{
      const res = await fetch(`${BASE_URL}/book/add-book`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message); 
        resetForm();
      } else {
        toast.error(data.error || "Adding Book Failed");
      }

    } catch(err){
      console.error(`Error uploading book ${err}`);
      toast.error("An error occurred while adding book");
    } finally{
      setUploading(false);
    }
  }

  const resetForm = () => {
    titleRef.current.value = '';
    authorRef.current.value = '';
    descriptionRef.current.value = '';
    publishDateRef.current.value = '';
    setCategory(''); 
    coverImageRef.current.value = null;
    setCoverImage(null);
    pdfRef.current.value = null;
    setPdfFile(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 pt-24">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-black text-center ">Add New Book</h2>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            ref={titleRef}
            required
            className="w-full p-3  rounded-lg bg-gray-100 black/10 focus:outline-black/40"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Author</label>
          <input
            type="text"
            ref={authorRef}
            required
            className="w-full p-3  rounded-lg bg-gray-100 black/10 focus:outline-black/40"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            ref={descriptionRef}
            required
            rows={4}
            className="w-full p-3  rounded-lg bg-gray-100 black/10 focus:outline-black/40"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Publish Date</label>
          <input
            type="date"
            ref={publishDateRef}
            required
            className="w-full p-3  rounded-lg bg-gray-100 black/10 focus:outline-black/40"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-3  rounded-lg bg-gray-100 black/10 focus:outline-black/40"
          >
            <option value="">Select a category</option>
            <option value="Crime">Crime</option>
            <option value="Fiction">Fiction</option>
            <option value="Astronomy">Astronomy</option>
            <option value="Economics">Economics</option>
            <option value="Psychology">Psychology</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <label 
            onClick={handleImageClick}
            className="block font-medium mb-2 cursor-pointer"
            >Cover Image</label>
            <input
              type="file"
              accept="image/*"
              ref={coverImageRef}
              onChange={handleCoverImage}
              className="hidden"
              required
            />
            {coverImage && (
              <p className="mt-2 text-sm text-gray-700">{coverImage.name}</p>
            )}
          </div>

          {/* PDF Upload Box */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <label 
              onClick={handlePdfClick}
              className="block font-medium mb-2 cursor-pointer"
            >Book PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfFile}
              ref={pdfRef}
              className="hidden"
              required
            />
            {pdfFile && (
              <p className="mt-2 text-sm text-gray-700">{pdfFile.name}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled= {uploading}
          className={`flex items-center justify-center gap-2 bg-black/20 text-gray-800 font-semibold py-3 rounded-lg transition duration-300 w-full ${uploading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-800 hover:text-white'} cursor-pointer`}
        >
          {!uploading 
          ? <>Add Book</>
          : 
            <>
            <span className="w-5 h-5 border-2 border-t-transparent border-black/70 rounded-full animate-spin" />
            <label>Uploading...</label>
            </>
          }
        </button>
      </form>
    </div>
  )
}

export default AddBook
