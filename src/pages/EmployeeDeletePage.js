import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "../utils/axios";
import EMPLOYEE_ENDPOINT from "../api/employee_endpoints";
import EMPLOYEE_ROUTES from "../routes/employee_paths";

function EmployeeDeletePage() {
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const deleteEmployee = async () => {
            try {
                // const response = await axios.delete(EMPLOYEE_ENDPOINT.delete(id));
                const endpoint = EMPLOYEE_ENDPOINT.delete;
                const response = await axios({
                    method: endpoint.method,
                    url: endpoint.url(id),
                })
                if (response.status === 204) {
                    navigate(EMPLOYEE_ROUTES.list)
                }
            } catch (error) {
                console.log(error);
            }
        };
        deleteEmployee();
    }, [id, navigate]);

    return <p>Deleting employee...</p>;
}

export default EmployeeDeletePage;