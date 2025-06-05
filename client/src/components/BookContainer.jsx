import React from 'react'


function BookContainer({coverImageUrl, title, author}) {
  return (
    <div className="w-70 bg-gray-200 shadow-lg rounded-2xl overflow-hidden mt-20" >
      <div className='p-4'>
        <img
          src={coverImageUrl}
          className="w-full h-80 object-fill"
        />
      </div>
      
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{author}</p>
      </div>
    </div>
  )
}

export default BookContainer
