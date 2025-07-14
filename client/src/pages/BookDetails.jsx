import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_API_URL;
// import { toast } from 'react-toastify';

function BookDetails() {
  const {bookId} = useParams();
  const [book, setBook] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isInLibrary, setIsInLibrary] = useState(false);
  const [isLibraryLoading, setIsLibraryLoading] = useState(false);
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    fetchBook();
    checkIfInLibrary();
  },[])
  
  async function fetchBook(){
    try{
      const res = await fetch(`${BASE_URL}/book/${bookId}`, {
        credentials: 'include'
      })

      const data = await res.json();
      if(res.ok){
        setBook(data);
        setIsLoading(false)
      }
      else{
        alert(data.error);
      }

    } catch(err){
      console.error("Error during fetching book detail:", err);
      alert("Error fetching book");
    }
  }

  async function checkIfInLibrary(){
    try{
      const res = await fetch(`${BASE_URL}/library`, {
        credentials: 'include'
      })

      const data = await res.json();
      if(res.ok){
        const bookInLibrary = data.library.some(libraryBook => libraryBook._id === bookId);
        setIsInLibrary(bookInLibrary);
      } else {
        console.error("Error fetching library:", data.error);
      }

    } catch(err){
      console.error("Error checking library:", err);
      alert("Error checking library");
    }
  }

  async function handleAddToLibrary(){
    if(!user){
      alert("Please login to add to library");
      return;
    }
    setIsLibraryLoading(true);
    try{
      const res = await fetch(`${BASE_URL}/library/add/${bookId}`, {
        method: 'POST',
        credentials: 'include'
      })

      const data = await res.json();
      if(res.ok){
        setIsInLibrary(true);
        alert(data.message);

      } else {
        alert(data.error || "Failed to add book to library");
      }

    } catch(err){
      console.error("Error adding to library:", err);
      alert("Error adding to library.");

    } finally {
      setIsLibraryLoading(false);
    }
  }
  
  async function handleRemoveFromLibrary(){
    setIsLibraryLoading(true);
    try{
      const res = await fetch(`${BASE_URL}/library/remove/${bookId}`, {
        method: 'POST',
        credentials: 'include'
      });

      const data = await res.json();
      if(res.ok){
        setIsInLibrary(false);
        alert(data.message);

      } else {
        alert(data.error || "Failed to remove book from library");
      }
    } catch(err){
      console.error("Error removing from library:", err);
      alert("Error removing from library.");

    } finally {
      setIsLibraryLoading(false);
    }
  }

  async function handleReadBook(){
    if(!user){
      alert("Please login to continue reading the book");
      return;
    }
    window.open(book.pdfFileUrl, '_blank');
  }

  const formattedDate = book
  ? new Date(book.publishDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  : '';

  return (
    isLoading ? (
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-red-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    ) 
    : (
      <div className=" mx-auto px-6 py-10 mt-20">
        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <img 
              src={book.coverImageUrl} 
              alt="Book cover" 
              className="w-full max-w-xs h-auto object-cover rounded-md"
            />

            <button 
              className="mt-4 px-6 py-2 bg-teal-100 text-teal-500 font-semibold hover:bg-teal-500 hover:text-teal-100 rounded-lg transition duration-300 cursor-pointer"
              onClick={handleReadBook}  
            >
              Read Book
            </button>


            {isInLibrary ? (
              <button 
                className="mt-4 px-6 py-2 bg-red-100 text-red-500 font-semibold hover:bg-red-500 hover:text-red-100 rounded-lg transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleRemoveFromLibrary}
                disabled={isLibraryLoading}
              >
                {isLibraryLoading ? 'Removing...' : 'Remove from Library'}
              </button>
            ) : (
              <button 
                className="mt-4 px-6 py-2 bg-green-100 text-green-500 font-semibold hover:bg-green-500 hover:text-green-100 rounded-lg transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToLibrary}
                disabled={isLibraryLoading}
              >
                {isLibraryLoading ? 'Adding...' : 'Add To Library'}
              </button>
            )}

            {/* <button 
              className="mt-4 px-6 py-2 bg-teal-500 text-teal-100 font-semibold hover:bg-teal-100 hover:text-teal-500 rounded-lg transition duration-300 cursor-pointer"
              onClick={() => window.open(book.pdfFileUrl, '_blank')}  
            >
              Read Book
            </button>

            <button 
              className="mt-4 px-6 py-2 bg-green-500 text-green-100 font-semibold hover:bg-green-100 hover:text-green-500 rounded-lg transition duration-300 cursor-pointer"
              onClick={() => window.open(book.pdfFileUrl, '_blank')}  
            >
              Add To Library
            </button> */}
          </div>


          <div className="lg:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-2xl text-gray-600 mb-8">by <span className="font-bold">{book.author}</span></p>

            <div className="mb-4">
              <h2 className="text-md font-semibold text-gray-500 mb-1">Description</h2>
              <p className="text-gray-800 text-base leading-relaxed">{book.description}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Publish Date</p>
                <p className="text-base font-medium text-gray-700">{formattedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="text-base font-medium text-gray-700">{book.category}</p>
              </div>
            </div>

          </div>

        </div>
      </div>


    )
  )
}

export default BookDetails
