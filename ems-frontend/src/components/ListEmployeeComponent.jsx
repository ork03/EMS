import React,{useEffect,useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
   const [employee,setemployee] = useState([])
    useEffect(()=>{
        getallEmployees();
    },[])
    function getallEmployees(){
        listEmployees().then((res)=>{
            setemployee(res.data)
        }).catch(error =>{
            console.error(error);
        })
    }
    
    
const navigator = useNavigate();

const addnewemployee =()=>{
    navigator('/add-employee')
}
function updateEmployee(id){
    navigator(`/edit-employee/${id}`)
}
function deleteEmployeerow(id){
    console.log(id)
    deleteEmployee(id).then((res)=>{
        getallEmployees();
    }).catch(error=>{
        console.error(error)
        })  
    }
  return (
    <div className='container'>
        <h2 className='text-center'>List Of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addnewemployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Email Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employee.map( emp=>
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.firstName}</td>
                            <td>{emp.lastName}</td>
                            <td>{emp.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={()=>updateEmployee(emp.id)}>Update</button>
                                <button className='btn btn-danger' onClick={()=>deleteEmployeerow(emp.id)} style={{marginLeft:'10px'}}>Delete</button>

                            </td>
                        </tr>
                    )
                }
                <tr>

                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent
