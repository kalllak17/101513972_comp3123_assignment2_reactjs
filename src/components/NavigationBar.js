import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate} from 'react-router-dom';
import EMPLOYEE_ROUTES from '../routes/employee_paths';
import AUTH_ROUTES from '../routes/auth_paths';
import {useAuth} from "../context/AuthContext";

function NavigationBar() {
    const {isLoggedIn, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(AUTH_ROUTES.logout);
    };

    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to={AUTH_ROUTES.home}>Assignment02</Navbar.Brand>
                <Nav className="me-auto">
                    {isLoggedIn ? (
                        <>
                            <Nav.Link as={Link} to={AUTH_ROUTES.home}>Home</Nav.Link>
                            <Nav.Link as={Link} to={EMPLOYEE_ROUTES.list}>Employees</Nav.Link>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to={AUTH_ROUTES.login}>Login</Nav.Link>
                            <Nav.Link as={Link} to={AUTH_ROUTES.register}>Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;