import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { store } from "./store";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import { logout } from "./features/user/userSlice";
import AuthGuard from "./components/AuthGuard";
import ErrorBoundary from "./components/ErrorBoundary";


export function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const handleLogout = () => {
      dispatch(logout());
      navigate("/login");
    };

  return (
    <>
    <Navbar bg="light" variant="light">
             <Container>
               <Navbar.Brand href="/">Writing Ideation Manager</Navbar.Brand>
               {isAuthenticated ? (
                <>
                  <Button className="ml" href="/add">Add Topic</Button>
                  <Button onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <Nav>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
              )}
            </Container>
          </Navbar>
          <Outlet />
    </>
  );
}


export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AuthGuard element={<Home />} />} />
            <Route path="add" element={<AuthGuard element={<AddTask />} />} />
            <Route path="edit-task/:id" element={<AuthGuard element={<EditTask />} />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}