import React, { useEffect, useState } from 'react'
import { createEmployee, deleteEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {
    const [firstName,setfirstname] = useState("")
    const [lastName,setlastname] = useState("")
    const [email,setemail] = useState("")
    const navigator = useNavigate();
    const [errors,seterrors] = useState({
        firstName:'',
        lastName:'',
        email:''
    })
    const {id} = useParams();
    useEffect(()=>{
        if(id){
            getEmployee(id).then((res)=>{
                setfirstname(res.data.firstName);
                setlastname(res.data.lastName);
                setemail(res.data.email);
            }).catch((error)=>{
                console.error(error)
            })
        }
    },[id])

    function saveOrUpdateEmployee(e){
        e.preventDefault();
        if(validateForm()){
            
            const employee ={firstName,lastName,email}
            console.log(employee)
            if(id){
                updateEmployee(id,employee).then((res)=>{
                    console.log(res.data)
                    navigator('/employees')
                }).catch(error=>{
                    console.error(error)
                })
            }else{
                createEmployee(employee).then((res)=>{
                    console.log(res.data);
                    navigator('/employees')
               }).catch(error=>{
                console.error(error)
                })
            }
            
            
        }
        
    }
    function validateForm(){
        let valid = true;
        const errorscopy = {...errors};
        if(firstName.trim()){
            errorscopy.firstName =''
        }
        else{
            errorscopy.firstName = 'FirstName is required';
            valid = false;
        }
        if(lastName.trim()){
            errorscopy.lastName =''
        }
        else{
            errorscopy.lastName = 'LastName is required';
            valid = false;
        }
        if(email.trim()){
            errorscopy.email =''
        }
        else{
            errorscopy.email = 'email is required';
            valid = false;
        }
        seterrors(errorscopy);
        return valid;
    }
    
    function pageTitle(){
        if(id){
            return ( <h2 className='text-center'>Update Employee</h2>)
        }
        else{
            return (<h2 className='text-center'>Add Employee</h2>)
        }
    }
  return (
    <div className='container'>
        <br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name</label>
                            <input type="text" placeholder='First Name' name='firstName' value={firstName} 
                            className={`form-control ${errors.firstName?'is-invalid':''}`} onChange={(e)=>setfirstname(e.target.value)}></input>
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name</label>
                            <input type="text" placeholder='Last Name' name='lastName' value={lastName}
                             className={`form-control ${errors.lastName?'is-invalid':''}`}onChange={(e)=>setlastname(e.target.value)}/>
                             {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email</label>
                            <input type="text" placeholder='Email' name='email'  value={email}
                             className={`form-control ${errors.email?'is-invalid':''}`}onChange={(e)=>setemail(e.target.value)}/>
                             {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>

                </div>
            </div>
        </div>
      
    </div>
  )
}

export default EmployeeComponent
