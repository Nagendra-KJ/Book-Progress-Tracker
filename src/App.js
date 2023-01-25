import { useEffect, useState } from 'react';
import './App.css';
import { BookData } from './components/BookData/BookData';
import { BookInput } from './components/BookInput/BookInput';
import axios from 'axios';
import { GoalInput } from './components/GoalInput/GoalInput';
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
                  loadUnreadBooks();
                })
                .catch((err) => {
                  console.log(err.response.data.error);
                })
  }

  const updatePageCount = async (newPageCount, index) => {
    var dateCompleted = new Date().toISOString();
    var pageProgress = newPageCount - arrReading[index].pagesCompleted;
    var book = arrReading[index];

    const bookUpdateBody = {};
    const pageUpdateBody = {};

    bookUpdateBody.id = book._id;
    bookUpdateBody.pageCount = newPageCount;
    if (newPageCount === arrReading[index].totalPages)
      bookUpdateBody.dateCompleted = dateCompleted;


    pageUpdateBody.title = book.title;
    pageUpdateBody.pagesCompleted = pageProgress;
    pageUpdateBody.date = dateCompleted;
    
    
    await client.post('/api/book/updatePageCount', bookUpdateBody)
                .then(() => {
                  loadUnreadBooks();
                })
                .catch((err) => {
                  console.log(err.response.data.error);
                });
    await client.post('/api/pageUpdate/create', pageUpdateBody)
                .then((result) => {
                  console.log(result);
                })
                .catch(err => {
                  console.log(err.response.data.error);
                })
  }

  const updateGoals = (newGoals) => {
    console.log('Updated Goals', newGoals);
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between">
        <GoalInput dailyPageGoal={1} weeklyPageGoal={10} annualBookGoal={100} updateGoals={updateGoals}/>
        <BookInput addBookHandler={addNewBook}/>
        <GoalInput dailyPageGoal={1} weeklyPageGoal={10} annualBookGoal={100} updateGoals={updateGoals}/>
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
