import React, { useEffect, useState } from 'react'
import BookContainer from '../components/BookContainer';
const BASE_URL = import.meta.env.VITE_API_URL;


function Library() {
  const[books, setBooks] = useState([]);
  const[isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLibrary();
  }, []);

  const fetchLibrary = async () => {
    try{
      const res = await fetch(`${BASE_URL}/library`, {
        credentials: 'include'
      });

      const data = await res.json();
      if(res.ok){
        setBooks(data.library);
      } else {
        console.error("Error fetching library:", data.error);
      }
    } catch(err){

    } finally{
      setIsLoading(false);
    }
  }

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
    :  books.length === 0 ? (
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your Library is Empty</h2>
        <p className="text-gray-500 mb-4">No books added to your library yet</p>
        <p className="text-gray-400 text-sm">Start exploring and add some books to your collection!</p>
      </div>
    )
    : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6">
        {books.map((book) => (
          <BookContainer 
            key= {book._id}
            bookId = {book._id}
            coverImageUrl={book.coverImageUrl}
            title={book.title}
            author={book.author}
          />
        ))}
      </div>
    )
  )
}

export default Library
