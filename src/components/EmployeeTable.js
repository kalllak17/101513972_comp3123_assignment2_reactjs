import {Button} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {useNavigate} from "react-router-dom";
import EMPLOYEE_ROUTES from "../routes/employee_paths";

function EmployeeTable({data, tableHeaders}) {

    const navigate = useNavigate();

    const handleUpdate = (id) => {
        navigate(EMPLOYEE_ROUTES.edit.replace(":id", id));
    }


    const handleDetails = (id) => {
        navigate(EMPLOYEE_ROUTES.details.replace(":id", id));
    }

    const handleDelete = (id) => {
        navigate(EMPLOYEE_ROUTES.delete.replace(":id", id));
    }

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                {tableHeaders.map((key) => (
                    <th key={key}>{key}</th>
                ))}
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data?.map((item) => (
                <tr key={item._id}>
                    {tableHeaders.map((key) => (
                        <td key={`${item._id}-${key}`}>{String(item[key] ?? "")}</td>
                    ))}
                    <td>
                        <Button variant="success" onClick={() => handleUpdate(item._id)}>Update</Button>
                        <Button variant="info" onClick={() => handleDetails(item._id)}>Details</Button>
                        <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                    </td>
                </tr>
            ))}

            </tbody>
        </Table>
    )
}

export default EmployeeTable;