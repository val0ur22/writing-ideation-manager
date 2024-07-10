import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import TaskCard from "../components/TaskCard";

export default function Home() {
  const { taskList } = useSelector((state) => state.task);

  return (
    <Container>
      <h1 className="my-3">Topics</h1>
      <Row>
        <CardGroup tasks={taskList} />
      </Row>
    </Container>
  );
}

function CardGroup({ tasks }) {
  return tasks.map((task) => {
    return (
      <Col md={4} key={task.id}>
        <TaskCard task={task} />
      </Col>
    );
  });
}