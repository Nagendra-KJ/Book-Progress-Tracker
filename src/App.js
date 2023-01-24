import { useState } from 'react';
import './App.css';
import { BookData } from './components/BookData/BookData';
import { BookInput } from './components/BookInput/BookInput';
import axios from 'axios';
const client = axios.create({
  baseURL: "http://localhost:3050/"
})

function App() {

  const [arrReading, setArrReading] = useState([]);

  const addNewBook = (newBook) => {
    client.post('/api/book/create/', newBook)
          .then((response) => {
            setArrReading([...arrReading, response.data]);
          })
          .catch((err)=> {
            console.log(err.response.data.error)
          });
  };


  const deleteBook = (bookIndex) => {
    const books = [...arrReading];
    books.splice(bookIndex, 1);
    setArrReading(books);
  }

  const updatePageCount = (newPageCount, index) => {
    const books  = [...arrReading];
    books[index].pagesCompleted = newPageCount;
    setArrReading(books);
  }

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <BookInput addBookHandler={addNewBook}/>
      </div>
      <div className="row">
        {
        arrReading.map((book, index) => {
              return <BookData slNo={index+1} title={book.title} pagesCompleted={book.pagesCompleted} totalPages={book.totalPages} deleteHandler={() => deleteBook(index)} 
                        key={book.title} updatePageCount={(newPageCount) => updatePageCount(newPageCount,index)} className="col"/>
          })
        }
      </div>
    </div>
  );
}

export default App;
