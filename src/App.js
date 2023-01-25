import { useEffect, useState } from 'react';
import './App.css';
import { BookData } from './components/BookData/BookData';
import { BookInput } from './components/BookInput/BookInput';
import axios from 'axios';
const client = axios.create({
  baseURL: "http://localhost:3050/"
})

function App() {

  const [arrReading, setArrReading] = useState([]);

  useEffect(() => {
    loadUnreadBooks();
  }, [])

  const loadUnreadBooks = async () => {
    return await client.get('/api/book/fetchAllUnread')
                .then((response) => {
                  console.log(response.data);
                  setArrReading(response.data);
                })
                .catch((err) => {
                  console.log(err.response.data.error);
                })
  }

  const addNewBook = async (newBook) => {
    await client.post('/api/book/create/', newBook)
          .then((response) => {
            setArrReading([...arrReading, response.data]);
          })
          .catch((err)=> {
            console.log(err.response.data.error)
          });
  };


  const deleteBook = async (bookIndex) => {
    await client.post('/api/book/delete', {id: arrReading[bookIndex]._id})
                .then((response) => {
                  console.log(response.data);
                  loadUnreadBooks();
                })
                .catch((err) => {
                  console.log(err.response.data.error);
                })
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
                        key={book._id} updatePageCount={(newPageCount) => updatePageCount(newPageCount,index)} className="col"/>
          })
        }
      </div>
    </div>
  );
}

export default App;
