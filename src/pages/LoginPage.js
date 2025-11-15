import React, {useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import axios from '../utils/axios'
import {useLocation, useNavigate} from "react-router-dom";
import AUTH_ROUTES from "../routes/auth_paths";
import AUTH_ENDPOINTS from "../api/auth_endpoints";
import {useAuth} from '../context/AuthContext'


function LoginPage() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const {login} = useAuth();
    const location = useLocation();
    const msg = location.state?.successMessage || "";

    const handleLogin = async (e) => {
        e.preventDefault();
        const rout = AUTH_ROUTES.home;

        try {
            if (!user.email) {
                user.email = user.username;
            } else {
                user.username = user.email;
            }
            const endpoint = AUTH_ENDPOINTS.login;
            const response = await axios({
                method: endpoint.method,
                url: endpoint.url,
                data: user
            })
            if (response.status === 200) {
                login();
                navigate(rout)
            }
        } catch (error) {
            console.log(error);
        }


    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={5}>
                    <Card className="p-4 shadow">
                        <Card.Body>
                            <h3 className="text-center mb-4">Login</h3>
                            {msg && <Alert variant="success">{msg}</Alert>}
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="formBasicEmail" className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={user.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={user.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
