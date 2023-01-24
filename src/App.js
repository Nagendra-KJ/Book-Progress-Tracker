import { useState } from 'react';
import './App.css';
import { BookData } from './components/BookData/BookData';
import { BookInput } from './components/BookInput/BookInput';

function App() {

  const [arrReading, setArrReading] = useState([]);

  const addNewBook = (newBook) => {
    setArrReading([...arrReading, newBook]);
  };


  const deleteBook = (event, bookIndex) => {
    console.log(event);
    const books = [...arrReading];
    books.splice(bookIndex, 1);
    setArrReading(books);
  }

  const completeBook = (bookIndex) => {
    const books = [...arrReading];
    books[bookIndex].pagesCompleted = books[bookIndex].totalPages;
    setArrReading(books);
  }

  const updatePageCount = (event, index) => {
    const newPageCount = event.target.value.replace(/\D/g, '');
    const books  = [...arrReading];
    if (newPageCount <= books[index].totalPages) {
      books[index].pagesCompleted = newPageCount;
      setArrReading(books);
    }
  }

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <BookInput addBookHandler={addNewBook}/>
      </div>
      <div className="row">
        {
        arrReading.map((book, index) => {
              return <BookData slNo={index+1} title={book.title} pagesCompleted={book.pagesCompleted} totalPages={book.totalPages} deleteHandler={(event) => deleteBook(event, index)} 
                        key={book.title} completeBook={() => completeBook(index)} updatePageCount={(event) => updatePageCount(event,index)} className="col"/>
          })
        }
      </div>
    </div>
  );
}

export default App;
