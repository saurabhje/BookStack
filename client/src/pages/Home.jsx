import React, { useEffect, useState } from 'react'
import coverImageUrl from '../assets/images/avatar.png'
import BookContainer from '../components/BookContainer';
const BASE_URL = import.meta.env.VITE_API_URL;


function Home() {
  const[books, setBooks] = useState([])
  const[isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBooks();
  }, [])

  const fetchBooks= async () => {
    try{
      const res = await fetch(`${BASE_URL}/book`, {
        credentials: 'include'
      })

      const data = await res.json();
      setBooks(data);
      setIsLoading(false)
    } catch(err){
      console.error("Error Fetching books:", err);
      alert("Error Fetching books");
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
    : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6">
        {books.map((book) => (
          <BookContainer 
            key= {book._id}
            coverImageUrl={book.coverImageUrl}
            title={book.title}
            author={book.author}
          />
        ))}
      </div>
    )
  )
}

export default Home
