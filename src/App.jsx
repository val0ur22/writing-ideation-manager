import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
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
import { ThemeProvider, useTheme } from './contexts/ThemeContext';


export function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
      dispatch(logout());
      navigate("/login");
    };

  return (
    <div className={theme}>
    <Navbar bg={theme === 'light' ? 'light' : 'dark'} variant={theme}>
             <Container>
               <Navbar.Brand href="/">Writing Ideation Manager</Navbar.Brand>
               {isAuthenticated ? (
                <div className="d-flex">
                  <Button className="mx-2" href="/add"><i className="bi bi-plus"/> </Button>
                  <Button className="mx-2" onClick={handleLogout}>Logout</Button>
                  <Button className="mx-2" onClick={toggleTheme}>
                    <i className={`bi bi-${theme === 'light' ? 'moon' : 'sun'}-fill`} />
                  </Button>
                </div>
              ) : (
                <Nav>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
              )}
            </Container>
          </Navbar>
          <Outlet />
    </div>
  );
}


export default function App() {
  return (
    <Provider store={store}>
       <ThemeProvider>
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
       </ThemeProvider>
    </Provider>
  );
}