import { useEffect, useState } from 'react';
import './App.css';
import { BookData } from './components/BookData/BookData';
import { BookInput } from './components/BookInput/BookInput';
import axios from 'axios';
import { GoalInput } from './components/GoalInput/GoalInput';
import { GoalStats } from './components/GoalStats/GoalsStats';

const client = axios.create({
  baseURL: "http://localhost:3050/"
})

function App() {

  const [arrReading, setArrReading] = useState([]);
  const [readingGoal, setReadingGoal] = useState({dailyPageGoal: 0, weeklyPageGoal: 0, annualBookGoal: 0});
  const [goalProgress, setGoalProgress] = useState({annualBookGoalData: 0, dailyPageGoalData: 0, weeklyPageGoalData: 0});

  useEffect(() => {
    loadUnreadBooks();
    loadGoals();
    loadBooksReadCount();
  },)


  const loadBooksReadCount = async () => {
    const currentYear = new Date().getFullYear();
    const firstDay = new Date(Date.UTC(currentYear, 0, 1)).toISOString();
    const lastDay = new Date(Date.UTC(currentYear+1, 0, 1)).toISOString();
    const {dailyPageGoalData, weeklyPageGoalData} = goalProgress
    await client.post('/api/book/fetchReadBooksCount', {startDate: firstDay, endDate: lastDay})
                .then(result => {
                  if (goalProgress.annualBookGoalData !== result.data.count)
                    setGoalProgress({annualBookGoalData: result.data.count, dailyPageGoalData:dailyPageGoalData, weeklyPageGoalData: weeklyPageGoalData})
                })
                .catch(err => console.log(err.response.data.error));
  }


  const loadUnreadBooks = async () => {
    return await client.get('/api/book/fetchAllUnread')
                .then((response) => {
                  if (JSON.stringify(response.data) !== JSON.stringify(arrReading))
                      setArrReading(response.data);
                })
                .catch((err) => {
                  console.log(err.response.data.error);
                })
  }

  const loadGoals = async () => {
    const currentYear = new Date().getFullYear();
    const firstDay = new Date(Date.UTC(currentYear, 0, 1,)).toISOString();
    const lastDay = new Date(Date.UTC(currentYear+1, 0, 1)).toISOString();
    await client.post('/api/goal/getGoal', {startDate: firstDay, endDate: lastDay})
                .then((result) => {
                  const goals = {
                    dailyPageGoal: result.data.dailyPageGoal,
                    weeklyPageGoal: result.data.weeklyPageGoal,
                    annualBookGoal: result.data.annualBookGoal
                  };
                  if (JSON.stringify(goals) !== JSON.stringify(readingGoal))
                    setReadingGoal(goals);
                  else
                    console.log(JSON.stringify(goals), JSON.stringify(readingGoal));
                })
                .catch(err => console.log(err.response.data.error));
  }

  const loadPageProgress = () => {
    var previousDate = new Date(new Date().getTime() - 24*60*60*1000);
    var currentDate = new Date(new Date());
    console.log(currentDate.getD);

    client.post('/api/pageUpdate/fetchPageCount', {startDate: previousDate, endDate:currentDate})
          .then((result) => {
            const {annualBookGoalData, weeklyPageGoalData} = goalProgress;
            setGoalProgress({annualBookGoalData: annualBookGoalData, weeklyPageGoalData: weeklyPageGoalData, dailyPageGoalData: result});

          });
  }

  const addNewBook = async (newBook) => {
    const pageUpdateBody = {};
    pageUpdateBody.title = newBook.title;
    pageUpdateBody.pagesCompleted = newBook.pagesCompleted;
    pageUpdateBody.date = newBook.dateAdded;

    await client.post('/api/book/create/', newBook)
          .then((response) => {
            setArrReading([...arrReading, newBook]);
          })
          .catch((err)=> {
            console.log(err.response.data.error)
          });

    await client.post('/api/pageUpdate/create', pageUpdateBody)
          .then((result) => {
            /*Need to call endpoints for goalchecks*/ 

          })
          .catch(err => {
            console.log(err.response.data.error);
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
                  /*Need to call endpoints for goalchecks*/
                  loadPageProgress(); 
                })
                .catch(err => {
                  console.log(err.response.data.error);
                })
  }

  const updateGoals = async (newGoals) => {
    newGoals.date = new Date().toISOString();
    const currentYear = new Date().getFullYear();
    newGoals.startDate = new Date(Date.UTC(currentYear, 0, 1,));
    newGoals.endDate = new Date(Date.UTC(currentYear + 1, 0, 1,));
    await client.post('/api/goal/updateGoal', newGoals)
                .then((result)=>{
                  setReadingGoal((({ dailyPageGoal, weeklyPageGoal, annualBookGoal }) => ({ dailyPageGoal, weeklyPageGoal, annualBookGoal }))(newGoals))
                })
                .catch(err => {
                  console.log(err.response.data.error);
                });
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between">
        <GoalInput dailyPageGoal={readingGoal.dailyPageGoal} weeklyPageGoal={readingGoal.weeklyPageGoal} annualBookGoal={readingGoal.annualBookGoal} updateGoals={updateGoals}/>
        <BookInput addBookHandler={addNewBook}/>
        <GoalStats dailyPageGoalData={goalProgress.dailyPageGoalData} weeklyPageGoalData={[2,2]} annualBookGoalData={[goalProgress.annualBookGoalData, Math.max(0, readingGoal.annualBookGoal - goalProgress.annualBookGoalData)]}/>
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
