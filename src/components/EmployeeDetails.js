import {Button, Card} from "react-bootstrap";
import EMPLOYEE_ROUTES from "../routes/employee_paths";
import {useNavigate} from "react-router-dom";
import Image from 'react-bootstrap/Image';

function Capitalize(str_param) {
    return (str_param.charAt(0).toUpperCase() + str_param.slice(1)).trim();
}

function EmployeeDetails({employee}) {

    const navigate = useNavigate();

    const handleUpdate = (id) => {
        navigate(EMPLOYEE_ROUTES.edit.replace(":id", id));
    }

    const handleDelete = (id) => {
        navigate(EMPLOYEE_ROUTES.delete.replace(":id", id));
    }


    return (
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Card.Title>{employee.first_name} {employee.last_name}</Card.Title>
                <Card.Subtitle>{employee.position}</Card.Subtitle>
                <Card.Img variant="top" src={employee.profile_picture} />
                <Card.Text>
                    {Object.entries(employee)
                        .filter(([key]) => key !== "profile_picture")
                        .map(([key, value]) => (
                        <div key={key}>
                            <strong>{Capitalize(key)}:</strong> {String(value ?? "")}
                        </div>
                    ))}
                </Card.Text>
                <Button variant="success" onClick={() => handleUpdate(employee._id)}>Update</Button>
                <Button variant="danger" onClick={() => handleDelete(employee._id)}>Delete</Button>
            </Card.Body>
        </Card>
    )

}

export default EmployeeDetails;