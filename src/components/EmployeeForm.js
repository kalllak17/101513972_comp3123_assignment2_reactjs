import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../utils/axios";
import EMPLOYEE_ENDPOINT from "../api/employee_endpoints";
import EMPLOYEE_ROUTES from "../routes/employee_paths";
import {toBase64} from "../utils/base64";

const formatDateForInput = (isoDate) => isoDate ? isoDate.split('T')[0] : '';


function EmployeeForm({employee, mode = 'create'}) {


    const [data, setData] = useState({
        "_id": '',
        "first_name": '',
        "last_name": '',
        "email": '',
        "position": '',
        "salary": '',
        "date_of_joining": '',
        "department": '',
        "profile_picture": "",
    });

    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setData({
            first_name: employee.first_name || '',
            last_name: employee.last_name || '',
            email: employee.email || '',
            position: employee.position || '',
            salary: employee.salary || '',
            department: employee.department || '',
            date_of_joining: employee.date_of_joining
                ? employee.date_of_joining.split('T')[0]
                : '',
            profile_picture: employee.profile_picture || '',
        });
    }, [employee]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const base64 = await toBase64(file);

        setData((prev) => ({
            ...prev,
            profile_picture: base64,
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

        try {
            if (mode === 'create') {
                // const response = await axios.post(EMPLOYEE_ENDPOINT.create, data);
                const endpoint = EMPLOYEE_ENDPOINT.create;
                const response = await axios({
                    method: endpoint.method,
                    url: endpoint.url,
                    data: data
                })
                // console.log("Employee added:", response.data);
                if (response.status === 201) {
                    navigate(EMPLOYEE_ROUTES.list)
                }
            }
            if (mode === 'edit') {
                // const response = await axios.post(EMPLOYEE_ENDPOINT.update(employee._id), data);
                const endpoint = EMPLOYEE_ENDPOINT.update;
                const response = await axios({
                    method: endpoint.method,
                    url: endpoint.url(employee._id),
                    data: data
                })
                // console.log("Employee added:", response.data);
                if (response.status === 200) {
                    navigate(EMPLOYEE_ROUTES.details(employee._id));
                }
            }

        } catch (error) {
            // console.error("Error adding employee:", error);
        }
    };


    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        name="first_name"
                        value={data.first_name}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a first name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        name="last_name"
                        value={data.last_name}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a last name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="position">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Position"
                        name="position"
                        value={data.position}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a position.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="salary">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Salary"
                        name="salary"
                        value={data.salary}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid salary.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Department"
                        name="department"
                        value={data.department}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a department.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="date_of_joining">
                    <Form.Label>Date of Joining</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        name="date_of_joining"
                        value={data.date_of_joining}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid date.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="profile_picture">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    {data.profile_picture && (
                        <img
                            src={data.profile_picture}
                            alt="Preview"
                            style={{ width: "150px", marginTop: "10px" }}
                        />
                    )}
                </Form.Group>
            </Row>

            <Button type="submit">Add Employee</Button>
        </Form>
    );
}

export default EmployeeForm;