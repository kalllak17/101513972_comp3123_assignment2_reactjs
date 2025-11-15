import EmployeeDetails from "../components/EmployeeDetails";
import {useEffect, useState} from "react";
import axios from "../utils/axios";
import EMPLOYEE_ENDPOINT from "../api/employee_endpoints";
import {useParams} from "react-router-dom";


function EmployeeDetailsPage() {

    const [employee, setEmployee] = useState({});
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(EMPLOYEE_ENDPOINT.getById(id));
                const endpoint = EMPLOYEE_ENDPOINT.getById;
                const response = await axios({
                    method: endpoint.method,
                    url: endpoint.url(id),
                })
                setEmployee(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <EmployeeDetails employee={employee}/>
    )
}


export default EmployeeDetailsPage;