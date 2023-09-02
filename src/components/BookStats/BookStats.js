import Modal from 'react-bootstrap/Modal';
import { Bubble } from 'react-chartjs-2';

function BookStats(props) {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const options = {
        scales: {
          y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Number of Books Read'
            }
          },
          x: {
            beginAtZero: false,
            title: {
                display: true,
                text: 'Month'
            },
            ticks: {
                display: true,
                min: 1,
                max: 12,
                stepSize: 1,
                callback: (value, index, ticks) => {
                    return labels[index];
                }
            },
          }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        return (`Total Number of Books Completed: ${context.raw.y}
                        Total Number of Pages Read: ${Math.round(context.raw.r * 100)}`);
                    }
                }
            }
        }
      };
      

      const data = {
        datasets: [
          {
            data: props.data
          },
        ],
      };


    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="bg-dark">
            <Modal.Title id="contained-modal-title-vcenter">
              Your Reading Progress
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            <Bubble options={options} data={data} />
          </Modal.Body>
        </Modal>
      );

}

export {BookStats};