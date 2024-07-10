import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask} from "../features/task/taskSlice";

export default function EditTask() {
  const {id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const task = useSelector((state) => state.task.taskList.find((task) => task.id === parseInt(id)));

  const [title, setTitle] = useState(task.title);
  const [ description, setDescription ] = useState(task.description);
  const [ artType, setArtType] = useState(task.artType || "" );
  const [ artContent, setArtContent] = useState(task.artContent || "" );
  const [tweetLinks, setTweetLinks] = useState([""]);
  const [spotifyLink, setSpotifyLink] = useState("");
  const [ completed, setCompleted ] = useState(task.completed || false);

  function editTask(event) {
    event.preventDefault();
    const updatedTask = {
      ...task,
      id: parseInt(id),
      title,
      description,
      artType,
      artContent,
      tweetLinks,
      spotifyLink,
      completed,
    };
    dispatch(updateTask(updatedTask));
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
      setArtContent(e.target.files[0]);
    } else {
      setArtContent(e.target.value);
    }
  };
  
  return (
    <Container>
      <h1 className="my-3">Edit Task</h1>
      <Form onSubmit={editTask}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
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
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="artType">
          <Form.Label>Art Type</Form.Label>
          <Form.Select
            value={artType}
            onChange={(e) => setArtType(e.target.value)}
          >
            <option value="">Select Art Type</option>
            <option value="image">Image</option>
            <option value="link">Link</option>
          </Form.Select>
        </Form.Group>
        {artType && (
          <Form.Group className="mb-3" controlId="artContent">
            <Form.Label>Art Content</Form.Label>
            {artType === 'image' ? (
              <Form.Control
                type="file"
                onChange={handleArtContentChange}
              />
            ) : (
              <Form.Control
                type="text"
                value={artContent}
                onChange={handleArtContentChange}
                placeholder="Edit Art Link"
              />
            )}
          </Form.Group>
        )}
        
        <Form.Group className="mb-3" controlId="tweetLinks">
          <Form.Label>Tweet Links</Form.Label>
          {tweetLinks.map((tweet, index) => (
          <Form.Control
            key={index}
            type="text"
            value={tweet}
            onChange={(e) => handleTweetChange(index, e.target.value)}
            placeholder="Edit Twitter/X link"
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
            placeholder="Edit Spotify link"
            required
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
          Save Changes
        </Button>
      </Form>
    </Container>
  );
}

