import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import AUTH_ENDPOINTS from "../api/auth_endpoints";
import axios from "../utils/axios";
import {useNavigate} from "react-router-dom";
import AUTH_ROUTES from "../routes/auth_paths";
import Container from "react-bootstrap/Container";
import {Alert, Card} from "react-bootstrap";

function RegisterPage() {

    const [validated, setValidated] = useState(false);
    const [data, setData] = useState({
        username: "", email: "", password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((prev) => ({
            ...prev, [name]: value,
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);

        const rout = AUTH_ROUTES.login;

        try {
            const endpoint = AUTH_ENDPOINTS.signup;
            const response = await axios({
                method: endpoint.method, url: endpoint.url, data: data
            })
            if (response.status === 201) {
                navigate(rout, { state: { successMessage: "Registration successful! Please log in." } });
            }else{
                setError("User already exists or registration failed.");
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (<Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={5}>
                    <Card className="p-4 shadow">
                        <Card.Body>
                            <h3 className="text-center mb-4">Register</h3>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group as={Col}  controlId="username" className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        value={data.username}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a username.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="email" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid email.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="password" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Email"
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid password.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">Register</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>);


}

export default RegisterPage;