import axios from "../utils/axios";
import {useEffect, useState} from "react";
import EMPLOYEE_ENDPOINT from "../api/employee_endpoints";
import {useNavigate} from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";
import {Button} from "react-bootstrap";
import EMPLOYEE_ROUTES from "../routes/employee_paths";

// const tableHeaders = ["_id", "first_name", "last_name", "email", "position", "salary", "date_of_joining", "department", "created_at", "updated_at"]
const tableHeaders = ["_id", "first_name", "last_name", "email"]

function EmployeeListPage(props) {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(EMPLOYEE_ENDPOINT.getAll);
                const endpoint = EMPLOYEE_ENDPOINT.getAll;
                const response = await axios({
                    method: endpoint.method,
                    url: endpoint.url
                })
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleCreation = () => {
        navigate(EMPLOYEE_ROUTES.add);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => handleCreation()}>Add Employee</Button>
            <EmployeeTable data={data} tableHeaders={tableHeaders}/>
        </div>
    )
}

export default EmployeeListPage;