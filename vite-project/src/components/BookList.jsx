// src/components/BookList.js
import React, { useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Library Management</h1>
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-3xl opacity-1 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <li key={book.id} className="bg-white p-4 rounded shadow-md">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="w-full h-40 object-cover mb-4"
            />
            <p className="text-xl font-semibold mb-2">{book.volumeInfo.title}</p>
            <p className="text-gray-600">{book.volumeInfo.authors?.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
