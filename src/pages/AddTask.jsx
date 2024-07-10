import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToList } from "../features/task/taskSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artType, setArtType] = useState('image');
  const [artContent, setArtContent] = useState('');
  const [tweetLinks, setTweetLinks] = useState([""]);
  const [spotifyLink, setSpotifyLink] = useState("");
  const [completed, setCompleted] = useState(false);

  function addTask(event) {
    event.preventDefault();
    const artContentToStore = artType === 'image' ? artContent : artContent;
    const newTask = {
      id: Date.now(),
      title,
      description,
      artType,
      artContent: artContentToStore,
      tweetLinks,
      spotifyLink: extractSpotifyTrackId(spotifyLink),
      completed,
    };
    localStorage.setItem(`task-${newTask.id}`, JSON.stringify(newTask));
    dispatch(addToList(newTask));
    navigate("/");
  }

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
    <Container>
      <h1 className="my-3">Add Task</h1>
      <Form onSubmit={addTask}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Get software developer job"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            as="textarea"
            rows={3}
            placeholder="Create an amazing project"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="artType">
          <Form.Label>Art</Form.Label>
          <Form.Control
            as="select"
            value={artType}
            onChange={(e) => setArtType(e.target.value)}
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
              placeholder="Enter Twitter/X link"
              className="mb-2"
              required
            />
          ))}
          <Button type="button" variant="secondary" className="mt-2" onClick={addTweetField}>Add another Tweet</Button>
        </Form.Group>

        <Form.Group className="mb-3" controlId="spotifyLink">
          <Form.Label>Spotify Link</Form.Label>
          <Form.Control
            type="text"
            value={spotifyLink}
            onChange={(e) => setSpotifyLink(e.target.value)}
            placeholder="Enter Spotify link"
            required
            className="form-control"
          />
          {spotifyLink && (
            <div className="mt-3">
              <iframe
                src={`https://open.spotify.com/embed/track/${extractSpotifyTrackId(spotifyLink)}`}
                width="100%"
                height="300"
                frameBorder="0"
                allowTransparency="true"
                allow="encrypted-media"
              ></iframe>
            </div>
          )}
        </Form.Group>
        <Form.Check
          type="checkbox"
          id="completed"
          label="Mark as completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="mb-3"
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
