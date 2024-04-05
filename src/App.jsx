// import React, { useCallback, useEffect, useState } from 'react'
// import './App.css'
// import {Form} from 'react-bootstrap'
// import './App.css'
// import {  useRef } from 'react'
// import axios from 'axios'
// import Button from 'react-bootstrap/Button'

// const API_URL = `https://api.unsplash.com/search/photos`;
// const IMAGES_PER_PAGE =20;


// function App() {
//   console.log( `key`,import.meta.env.VITE_API_KEY);
//   const searchInput = useRef(null);
//   const [images, setImages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);


//   const fetchImages = useCallback( async () =>{
//     try {
//       if(searchInput.current.value){
//       const {data} = await axios.get(` ${API_URL}?query=${
//         searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
//         import.meta.env.VITE_API_KEY}`
//       )
//         setImages(data.results);
//         setTotalPages(data.total_pages);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//    },[page])


//   useEffect(() => {
//     fetchImages();
//   }, [fetchImages]);



//  const resetSearch = () =>{
//    setPage(1)
//   fetchImages()
//  }

//  const handleSearch = (e) =>{
//    e.preventDefault()
//     console.log(searchInput.current.value);
//     resetSearch()

//  }
//  const handleSelection = (selection) =>{
//   searchInput.current.value = selection;
//   resetSearch()
//  }

//   return (
//     <>
//      <div className='container'>
//        <h1 className='title'>Image Search</h1>
//        <div className='search-section'>
//           <Form onSubmit={handleSearch}>
//           <Form.Control
//           type="search"
//           placeholder="Type something to search..."
//           className="search-input"
//           ref={searchInput}/>
//           </Form>
//        </div>
//        <div className='filters'>
//           <button className='btn-nature' onClick={ ()=>handleSelection('nature')}>Nature</button>
//           <button className='btn-birds' onClick={ ()=>handleSelection('birds')}>Birds</button>
//           <button className='btn-cats' onClick={ ()=>handleSelection('cats')}>Cats</button>
//           <button className='btn-shoes' onClick={()=>handleSelection('shoes')}>Shoes</button>
//        </div>
//        <div className='images'>
//          {
//           images?.map((image)=>{
//             return(
//               <img
//               key={image.id}
//               src={image.urls.small}
//               alt={image.alt_description}
//               className='image'/>
//             )
//           })
//          }
//        </div>
//        <div className='buttons'>
//          {
//           page> 1 && (
//             <Button onClick={()=> setPage(page-1)}>Previous</Button>
//           )
//          }{""}
//          {
//           page < totalPages && (
//             <Button onClick={()=> setPage(page+1)}>Next</Button>
//           )
//          }
//        </div>
//      </div>
//     </>
//   )
// }

// export default App

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './App.css';

const API_URL = `https://api.unsplash.com/search/photos`;
const IMAGES_PER_PAGE = 20;

function App() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        const { data } = await axios.get(
          `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
        );
        setImages(data.results);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const resetSearch = () => {
    setPage(1);
    fetchImages();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    resetSearch();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };

  return (
    <div className='container'>
      <div className='search-item'>
      <h1 className='title'>Image Search</h1>
      <div className='search-section'>
        <Form onSubmit={handleSearch}>
          <Form.Control
            type='search'
            placeholder='Type something to search...'
            className='search-input'
            ref={searchInput}
          />
        </Form>
      </div>
      </div>
      <div className='filters'>
        <button className='btn-nature' onClick={() => handleSelection('nature')}>
          Nature
        </button>
        <button className='btn-birds' onClick={() => handleSelection('birds')}>
          Birds
        </button>
        <button className='btn-cats' onClick={() => handleSelection('cats')}>
          Cats
        </button>
        <button className='btn-shoes' onClick={() => handleSelection('shoes')}>
          Shoes
        </button>
      </div>
      <div className='images'>
        {images?.map((image) => (
          <img key={image.id} src={image.urls.small} alt={image.alt_description} className='image' />
        ))}
      </div>
      <div className='buttons'>
        {page > 1 && <Button onClick={() => setPage(page - 1)}>Previous</Button>}
        {''}
        {page < totalPages && <Button onClick={() => setPage(page + 1)}>Next</Button>}
      </div>
    </div>
  );
}

export default App;