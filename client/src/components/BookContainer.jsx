import React from 'react'
import { useNavigate } from 'react-router-dom'


function BookContainer({bookId, coverImageUrl, title, author}) {
  const navigate = useNavigate()

  const handleBookClick = () => {
    navigate(`/book/${bookId}`) 
  }

  return (  
    <div 
      className="w-70 bg-gray-50 shadow-lg overflow-hidden mt-20 cursor-pointer" 
      onClick={handleBookClick}
    >
      <div className='p-4'>
        <img
          src={coverImageUrl}
          className="w-full h-80 object-fill"
        />
      </div>
      <hr></hr>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{author}</p>
      </div>
    </div>
  )
}

export default BookContainer
