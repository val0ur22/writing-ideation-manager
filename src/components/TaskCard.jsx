// import { useEffect, useState } from "react";
// import { Button, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { removeTask } from "../features/task/taskSlice";

// export default function TaskCard({ task }) {
//   const completed = task.completed;
//   const border = completed ? "success" : "danger";
//   const [timer, setTimer] = useState(0);
//   const [timerInterval, setTimerInterval] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const startTimer = () => {
//     if (timerInterval === null) {
//       const intervalID = setInterval(() => {
//         setTimer((prevTimer) => prevTimer + 1);
//       }, 1000)
//       setTimerInterval(intervalID);
//     }
//   };

//   const pauseTimer = () => {
//     clearInterval(timerInterval);
//     setTimerInterval(null);
//   };

//   const resetTimer = () => {
//     clearInterval(timerInterval);
//     setTimerInterval(null);
//     setTimer(0);
//   };

//   const deleteTask = () => {
//     dispatch(removeTask(task.id));
//   }

//   useEffect(() => {
//     if (window.twttr) {
//       window.twttr.widgets.load();
//     } else {
//       const script = document.createElement('script');
//       script.src = 'https://platform.twitter.com/widgets.js';
//       script.async = true;
//       script.onload = () => window.twttr.widgets.load();
//       document.body.appendChild(script);
//     }
//   }, [task.tweetLinks]);

//   const spotifyEmbedUrl = task.spotifyLink ? `https://open.spotify.com/embed/track/${task.spotifyLink}` : '';

//   let imageSrc = '';
//   if (task.artContent) {
//     if (typeof task.artContent === 'string') {
//       imageSrc = task.artContent;
//     } else if (task.artContent instanceof Blob) {
//       imageSrc = URL.createObjectURL(task.artContent);
//   }
// }


//   return (
//     <>
//       <Card border={border} className="my-3">
//         <Card.Header>{!completed && "Not"}</Card.Header>
//         <Card.Body>
//           <Card.Title>{task.title}</Card.Title>
//           <Card.Text>{task.description}</Card.Text>
//           {imageSrc && (
//             <img src={imageSrc} alt="Art" style={{ maxWidth: '100%' }} />
//           )}
//           {task.tweetLinks && task.tweetLinks.map((tweet, index) => (
//             <div key={index}>
//               <blockquote className="twitter-tweet">
//                 <a href={tweet}></a>
//               </blockquote>
//             </div>
//           ))}
//           {spotifyEmbedUrl && (
//             <div className="embed-responsive embed-responsive-16by9 mt-2">
//               <iframe
//                 title="Spotify Embed"
//                 src={spotifyEmbedUrl}
//                 width="300"
//                 height="80"
//                 frameBorder="0"
//                 allowtransparency="true" //no camel-case here
//                 allow="encrypted-media"
//               ></iframe>
//             </div>
//           )}
//           <p>Timer: {timer} seconds</p>
//           <Button size="sm" onClick={startTimer}>
//             <i className="bi bi-play"></i>
//           </Button>
//           <Button size="sm" onClick={pauseTimer} className="ms-2">
//             <i className="bi bi-pause-fill"></i>
//           </Button>
//           <Button size="sm" onClick={resetTimer} className="ms-2">
//             <i className="bi bi-arrow-clockwise"></i>
//           </Button>
//           <Button size="sm" variant="secondary"
//             onClick={() => navigate(`/edit/${task.id}`)}
//             className="ms-2">
//             <i className="bi bi-pencil"></i>
//           </Button>
//           <Button size="sm" variant="danger" onClick={deleteTask} className="ms-2">
//             <i className="bi bi-trash"></i>
//           </Button>
//         </Card.Body>
//       </Card>
//     </>
//   );
// }

// import { useEffect, useState } from "react";
// import { Button, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { removeTask } from "../features/task/taskSlice";

// export default function TaskCard({ task }) {
//   const completed = task.completed;
//   const border = completed ? "success" : "danger";
//   const [timer, setTimer] = useState(0);
//   const [timerInterval, setTimerInterval] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const startTimer = () => {
//     if (timerInterval === null) {
//       const intervalID = setInterval(() => {
//         setTimer((prevTimer) => prevTimer + 1);
//       }, 1000);
//       setTimerInterval(intervalID);
//     }
//   };

//   const pauseTimer = () => {
//     clearInterval(timerInterval);
//     setTimerInterval(null);
//   };

//   const resetTimer = () => {
//     clearInterval(timerInterval);
//     setTimerInterval(null);
//     setTimer(0);
//   };

//   const deleteTask = () => {
//     dispatch(removeTask(task.id));
//   };

//   useEffect(() => {
//     if (window.twttr) {
//       window.twttr.widgets.load();
//     } else {
//       const script = document.createElement('script');
//       script.src = 'https://platform.twitter.com/widgets.js';
//       script.async = true;
//       script.onload = () => window.twttr.widgets.load();
//       document.body.appendChild(script);
//     }
//   }, [task.tweetLinks]);

//   const spotifyEmbedUrl = task.spotifyLink ? `https://open.spotify.com/embed/track/${task.spotifyLink}` : '';

//   let imageSrc = '';
//   if (task.artContent) {
//     if (typeof task.artContent === 'string') {
//       imageSrc = task.artContent;
//     } else if (task.artContent instanceof Blob) {
//       imageSrc = URL.createObjectURL(task.artContent);
//     }
//   }

//   return (
//     <>
//       <Card border={border} className="my-3">
//         <Card.Header>{!completed && "Not Completed"}</Card.Header>
//         <Card.Body>
//           <Card.Title>{task.title}</Card.Title>
//           <Card.Text>{task.description}</Card.Text>
//           {imageSrc && (
//             <img src={imageSrc} alt="Art" style={{ maxWidth: '100%' }} />
//           )}
//           {task.tweetLinks && task.tweetLinks.map((tweet, index) => (
//             <div key={index}>
//               <blockquote className="twitter-tweet">
//                 <a href={tweet}></a>
//               </blockquote>
//             </div>
//           ))}
//           {spotifyEmbedUrl && (
//             <div className="embed-responsive embed-responsive-16by9 mt-2">
//               <iframe
//                 title="Spotify Embed"
//                 src={spotifyEmbedUrl}
//                 width="300"
//                 height="80"
//                 frameBorder="0"
//                 allowTransparency="true"
//                 allow="encrypted-media"
//               ></iframe>
//             </div>
//           )}
//           <p>Timer: {timer} seconds</p>
//           <Button size="sm" onClick={startTimer}>
//             <i className="bi bi-play"></i>
//           </Button>
//           <Button size="sm" onClick={pauseTimer} className="ms-2">
//             <i className="bi bi-pause-fill"></i>
//           </Button>
//           <Button size="sm" onClick={resetTimer} className="ms-2">
//             <i className="bi bi-arrow-clockwise"></i>
//           </Button>
//           <Button
//             size="sm"
//             variant="secondary"
//             onClick={() => navigate(`/edit/${task.id}`)}
//             className="ms-2"
//           >
//             <i className="bi bi-pencil"></i>
//           </Button>
//           <Button
//             size="sm"
//             variant="danger"
//             onClick={deleteTask}
//             className="ms-2"
//           >
//             <i className="bi bi-trash"></i>
//           </Button>
//         </Card.Body>
//       </Card>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeTask } from "../features/task/taskSlice";

export default function TaskCard({ task }) {
  const completed = task.completed;
  const border = completed ? "success" : "danger";
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startTimer = () => {
    if (timerInterval === null) {
      const intervalID = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setTimerInterval(intervalID);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setTimer(0);
  };

  const deleteTask = () => {
    dispatch(removeTask(task.id));
    localStorage.removeItem(`task-${task.id}`);
  };

  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
    } else {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = () => window.twttr.widgets.load();
      document.body.appendChild(script);
    }
  }, [task.tweetLinks]);

  const spotifyEmbedUrl = task.spotifyLink ? `https://open.spotify.com/embed/track/${task.spotifyLink}` : '';

  let imageSrc = '';
  if (task.artContent) {
    if (typeof task.artContent === 'string') {
      imageSrc = task.artContent;
    } else if (task.artContent instanceof Blob) {
      imageSrc = URL.createObjectURL(task.artContent);
    }
  }

  return (
    <>
      <Card border={border} className="my-3">
        <Card.Header>{!completed && "Not Completed"}</Card.Header>
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          <Card.Text>{task.description}</Card.Text>
          {imageSrc && (
            <img src={imageSrc} alt="Art" style={{ maxWidth: '100%' }} />
          )}
          {task.tweetLinks && task.tweetLinks.map((tweet, index) => (
            <div key={index}>
              <blockquote className="twitter-tweet">
                <a href={tweet}></a>
              </blockquote>
            </div>
          ))}
          {spotifyEmbedUrl && (
            <div className="embed-responsive embed-responsive-16by9 mt-2">
              <iframe
                title="Spotify Embed"
                src={spotifyEmbedUrl}
                width="300"
                height="80"
                frameBorder="0"
                allowtran="encrypted-media"
              ></iframe>
            </div>
          )}
          <div className="d-flex justify-content-between mt-3">
            <Button variant="primary" onClick={() => navigate(`/edit-task/${task.id}`)}>Edit</Button>
            <Button variant="danger" onClick={deleteTask}>Delete</Button>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="d-flex justify-content-between">
            <span>Time spent: {timer} seconds</span>
            <div>
              <Button variant="success" className="me-2" onClick={startTimer}>Start</Button>
              <Button variant="warning" className="me-2" onClick={pauseTimer}>Pause</Button>
              <Button variant="danger" onClick={resetTimer}>Reset</Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}
