import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeTask } from "../features/task/taskSlice";
import { useTheme } from '../contexts/ThemeContext';

export default function TaskCard({ task }) {
  const { theme } = useTheme();
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
    console.log("Loading Twitter Widgets Script...");
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
      <Card border={border} className={`my-3 ${theme}`}>
        <Card.Header>{completed ? "Completed" : "Not Completed"}</Card.Header>
        <Card.Body >
          <Card.Title>{task.title}</Card.Title>
          <Card.Text>{task.description}</Card.Text>
          {imageSrc && (
            <img src={imageSrc} alt="Art" className="img-fluid mb-3" />
          )}
          {task.tweetLinks && task.tweetLinks.map((tweet, index) => (
            <div key={index}>
              <blockquote className="twitter-tweet">
                <a href={tweet}></a>
              </blockquote>
            </div>
          ))}
          {spotifyEmbedUrl && (
            <div>
              <iframe
                title="Spotify Embed"
                src={spotifyEmbedUrl}
                width="240"
                height="auto"
                frameBorder="0"
                allowtransparency="encrypted-media"
                style={{ marginBottom: '-50px' }}
              ></iframe>
            </div>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">
          <div>
            <span>Time spent: {timer} seconds</span>
            <div className="d-flex justify-content-start mt-4" style={{ marginLeft: '-0.5rem' }}>
              <Button variant="success" className="mx-2" onClick={startTimer}> <i className="bi bi-play"></i></Button>
              <Button variant="danger" className="mx-2" onClick={pauseTimer}><i className="bi bi-pause-fill"></i></Button>
              <Button variant="warning" className="mx-2" onClick={resetTimer}><i className="bi bi-arrow-clockwise"></i></Button>
              <Button variant="primary" className="mx-2" onClick={() => navigate(`/edit-task/${task.id}`)}><i className="bi bi-pencil"></i></Button>
              <Button variant="danger" className="mx-2" onClick={deleteTask}><i className="bi bi-trash"></i></Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}
