import EmployeeForm from "../components/EmployeeForm";


const initialEmployee = {

    "_id": '',
    "first_name": '',
    "last_name": '',
    "email": '',
    "position": '',
    "salary": '',
    "date_of_joining": '',
    "department": ''

}


function EmployeeAddPage() {


    return (
        <EmployeeForm employee={initialEmployee}/>
    );


}

export default EmployeeAddPage;