import { useEffect, useState } from 'react';
import './App.css';
import { BookData } from './components/BookData/BookData';
import { BookInput } from './components/BookInput/BookInput';
import axios from 'axios';
import { GoalInput } from './components/GoalInput/GoalInput';
import { GoalStats } from './components/GoalStats/GoalsStats';
import moment from 'moment/moment';

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
    loadPageProgress();
  })


  const loadBooksReadCount = async () => {
    const firstDay = moment().startOf('year').toDate();
    const lastDay = moment().endOf('year').add(1, 'days').toDate();
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
    const firstDay = moment().startOf('year').toDate();
    const lastDay = moment().endOf('year').add(1, 'days').toDate();
    await client.post('/api/goal/getGoal', {startDate: firstDay, endDate: lastDay})
                .then((result) => {
                  const goals = {
                    dailyPageGoal: result.data.dailyPageGoal,
                    weeklyPageGoal: result.data.weeklyPageGoal,
                    annualBookGoal: result.data.annualBookGoal
                  };
                  if (JSON.stringify(goals) !== JSON.stringify(readingGoal))
                    setReadingGoal(goals);
                })
                .catch(err => console.log(err.response.data.error));
  }

  const loadPageProgress = async () => {
    var currentDate = moment().startOf('day').toDate();
    var nextDate = moment().startOf('day').add(1, 'days').toDate();

    var firstDayOfWeek = moment().startOf('week').toDate();
    var lastDayOfWeek = moment().endOf('week').toDate();
    lastDayOfWeek = moment(lastDayOfWeek).add(1, 'days').toDate();

    var dailyPageProgressUpdate, weeklyPageProgressUpdate;


    await client.post('/api/pageUpdate/fetchPageCount', {startDate: currentDate, endDate:nextDate})
          .then((result) => {
            dailyPageProgressUpdate = result.data[0].pagesCompleted;

          })
          .catch(err => console.log(err.response.data.error));
  
    await client.post('/api/pageUpdate/fetchPageCount', {startDate: firstDayOfWeek, endDate:lastDayOfWeek})
          .then((result) => {
            weeklyPageProgressUpdate = result.data[0].pagesCompleted;
          })
          .catch(err => console.log(err.response.data.error));

    const annualBookGoalData = goalProgress.annualBookGoalData;
    var newProgressData = {annualBookGoalData:annualBookGoalData, dailyPageGoalData:dailyPageProgressUpdate, weeklyPageGoalData:weeklyPageProgressUpdate};

    if (JSON.stringify(goalProgress) !== JSON.stringify(newProgressData))
      setGoalProgress(newProgressData);
    
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
            loadPageProgress();

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
    var dateCompleted = moment().toDate();
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
    newGoals.date = moment().toDate();
    newGoals.startDate = moment().startOf('year').toDate();
    newGoals.endDate = moment().endOf('year').add(1, 'days').toDate();
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
        <GoalStats dailyPageGoalData={[goalProgress.dailyPageGoalData, Math.max(0, readingGoal.dailyPageGoal - goalProgress.dailyPageGoalData)]} 
                   weeklyPageGoalData={[goalProgress.weeklyPageGoalData, Math.max(0, readingGoal.weeklyPageGoal - goalProgress.weeklyPageGoalData)]} 
                   annualBookGoalData={[goalProgress.annualBookGoalData, Math.max(0, readingGoal.annualBookGoal - goalProgress.annualBookGoalData)]}/>
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
