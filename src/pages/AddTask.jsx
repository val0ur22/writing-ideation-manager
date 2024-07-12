import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToList } from "../features/task/taskSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../contexts/ThemeContext';


export default function AddTask() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artType, setArtType] = useState('image');
  const [artContent, setArtContent] = useState('');
  const [tweetLinks, setTweetLinks] = useState([""]);
  const [spotifyLink, setSpotifyLink] = useState("");
  const [completed, setCompleted] = useState(false);

  const addTask = (event) => {
    event.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      description,
      artType,
      artContent,
      tweetLinks,
      spotifyLink: extractSpotifyTrackId(spotifyLink),
      completed,
    };
    localStorage.setItem(`task-${newTask.id}`, JSON.stringify(newTask));
    dispatch(addToList(newTask));
    navigate("/");
  };

  const handleTweetChange = (index, value) => {
    const newTweetLinks = [...tweetLinks];
    newTweetLinks[index] = value;
    setTweetLinks(newTweetLinks);
  };

  const addTweetField = () => {
    setTweetLinks([...tweetLinks, '']);
  };

  const extractSpotifyTrackId = (url) => {
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? match[1] : '';
  };

  const handleArtContentChange = (e) => {
    if (artType === 'image') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setArtContent(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setArtContent(e.target.value);
    }
  };

  return (
    <Container className={theme}>
      <h2 className={`my-3 ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
        Add Title
      </h2>
      <Form onSubmit={addTask}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Insert potential essay title"
            required
            className={theme}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description/Prompts</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            as="textarea"
            rows={3}
            placeholder="Braindumps 🧠 here"
            required
            className={theme}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="artType">
          <Form.Label>Art</Form.Label>
          <Form.Control
            as="select"
            value={artType}
            onChange={(e) => setArtType(e.target.value)}
            className={theme}
          >
            <option value="image">Upload Image</option>
            <option value="link">Paste Link</option>
          </Form.Control>
        </Form.Group>

        {artType === 'image' ? (
          <Form.Group className="mb-3" controlId="artContent">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleArtContentChange}
              required
              className={theme}
            />
          </Form.Group>
        ) : (
          <Form.Group className="mb-3" controlId="artContentLink">
            <Form.Label>Paste Image Link</Form.Label>
            <Form.Control
              type="text"
              value={artContent}
              onChange={(e) => setArtContent(e.target.value)}
              placeholder="Paste image link here"
              required
              className={theme}
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="tweetLinks">
          <Form.Label>Twitter/X Link</Form.Label>
          {tweetLinks.map((tweet, index) => (
            <Form.Control
              key={index}
              type="text"
              value={tweet}
              onChange={(e) => handleTweetChange(index, e.target.value)}
              placeholder="Paste tweet link here"
              className={theme}
            />
          ))}
          <Button onClick={addTweetField} className="mt-2">
            Add Tweet
          </Button>
        </Form.Group>

        <Form.Group className="mb-3" controlId="spotifyLink">
          <Form.Label>Spotify Link</Form.Label>
          <Form.Control
            type="text"
            value={spotifyLink}
            onChange={(e) => setSpotifyLink(e.target.value)}
            placeholder="Paste Spotify link here"
            required
            className="form-control"
          />
          {spotifyLink && (
            <div className="mt-3">
              <iframe
                src={`https://open.spotify.com/embed/track/${extractSpotifyTrackId(spotifyLink)}`}
                width="100%"
                height="200"
                frameBorder="0"
                allowTransparency="true"
                allow="encrypted-media"
              ></iframe>
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="completed">
          <Form.Check
            type="checkbox"
            label="Mark as Completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className={theme}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className={theme}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}
