import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_API_URL;


function BookDetails() {
  const {bookId} = useParams();
  const [book, setBook] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchBook()
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
      alert("Something went wrong.");
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
       <div className="max-w-4xl mx-auto p-8">
        <img src={book.coverImageUrl} className="w-200 h-196 object-cover mb-6" alt="Book cover" />
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
        <p className="text-gray-800">{book.description}</p>
      </div>
    )
  )
}

export default BookDetails
