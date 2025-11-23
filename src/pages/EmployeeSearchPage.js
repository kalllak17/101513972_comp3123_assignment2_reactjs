import axios from "../utils/axios";
import {useEffect, useState} from "react";
import EMPLOYEE_ENDPOINT from "../api/employee_endpoints";
import {useLocation} from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";
import {Alert} from "react-bootstrap";


const tableHeaders = ["_id", "first_name", "last_name", "email"]

function EmployeeSearchPage(props) {

    const location = useLocation();
    const keyword = location.state?.keyword || "";

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoint = EMPLOYEE_ENDPOINT.search;
                const response = await axios({
                    method: endpoint.method,
                    url: endpoint.url(keyword),
                })
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [keyword]);



    return (
        <div>
            <Alert variant="primary">Search result for: {keyword}</Alert>
            <EmployeeTable data={data} tableHeaders={tableHeaders}/>
        </div>
    )
}

export default EmployeeSearchPage;