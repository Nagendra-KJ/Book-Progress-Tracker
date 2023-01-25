import 'chart.js/auto'
import { Card } from 'react-bootstrap';
import { Doughnut } from "react-chartjs-2";
function GoalStats(props) {

    const data = {
        labels: ['Progress Completed', 'Progress Remaining'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: 'Annual Book Goal Progress',
              data: props.annualBookGoalData,
              backgroundColor: [
                '#244e96',
                'rgba(0, 0, 0, 1)',
              ],
            },
            {
                label: 'Weekly Page Goal',
                data: props.weeklyPageGoalData,
                backgroundColor: [
                  '#0e8f57',
                  'rgba(0, 0, 0, 1)',
                ],
              },
              {
                label: ['Daily Page Goal'],
                data:   props.dailyPageGoalData,
                backgroundColor: [
                  '#e66a0b',
                  'rgba(0, 0, 0, 1)',
                ],
              }
        ],
    };

    return (
        <Card className="bg-dark text-light mt-3" style={{width:'25rem'}}>
            <Card.Body>
                <Card.Title className='text-center'>Your Progress So Far</Card.Title>
                <div className="container">
                    <Doughnut
                        data={data}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Here is your daily, weekly, and annual reading progress",
                                    color: 'rgba(248, 249, 250, 1)'
                                },
                                legend: {
                                    display: false
                                }
                            }
                        }}
                    />
                </div>
            </Card.Body>
        </Card>
    );

}

export {GoalStats};