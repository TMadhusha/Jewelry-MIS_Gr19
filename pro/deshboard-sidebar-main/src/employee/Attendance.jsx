import React, { useEffect, useState } from 'react'
import EmployeeBar from '../components/EmployeeBar'
import '../css/employee.css';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Attendance() {
  const [attendance,setAttendance]=useState([]);
  const [searchQuery,setSearchQuery]=useState('');

  const {att_id}=useParams();

  useEffect(()=>{
    loadAttendance();
  },[]);

  const loadAttendance=async()=>{
    const result=await axios.get("http://localhost:8080/attendanceG")
    setAttendance(result.data)
    }

  const handleSearchInputChange=(e)=>{
    setSearchQuery(e.target.value);
  }

  const filteredAttendance = attendance.filter(attendance =>
    attendance.emp_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendance.att_id.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  if (searchQuery.trim() !== '' && filteredAttendance.length === 0) {
    alert("No search results found");
  }



  return (
    <div className='container'>
      <EmployeeBar>
        <div className='main-container'>
          <div className='section'>
            <div>
          <div className='main-title'>
          <h2>Attendance</h2>
          </div>
          <div className='search-bar-container'>
            <FaSearch className='search-icon' />
            <input type='text' placeholder='Search here...' className='search-input' value={searchQuery} onChange={handleSearchInputChange}/>
          </div>
          <div>
          <table class="table">
            <thead>
             <tr>
                <th scope="col">Attendance ID</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Date</th>
                <th scope="col">Check In</th>
                <th scope="col">Check Out</th>
                <th scope="col" colSpan={'2'}>Action</th>
            </tr>
            </thead>
            <tbody>
              {
                filteredAttendance.map((attendance,index)=>(
                  <tr key={index}>
                    <td>{attendance.att_id}</td>
                    <td>{attendance.emp_id}</td>
                    <td>{attendance.date}</td>
                    <td>{attendance.check_In}</td>
                    <td>{attendance.check_Out}</td>
                    <td><Link className='small-button' to={'/addattendance'}> Add </Link></td>
                    <td><button className='small-button'>Update</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          </div>
          </div>
          <div>
            <div>
            <h2>Add Attendance</h2>
            </div>
            <div>
              <form className='form'>
                <table>
                  <tr>
                    <th><label>Employee ID: </label></th>
                    <td><input type={'text'} name='emp_id'  placeholder={'Employee ID'}/></td>
                  </tr>
                  <tr>
                    <th><label>Attendance ID: </label></th>
                    <td><input type={'text'} name='att_id'  placeholder={'Attendance ID'}/></td>
                  </tr>
                  <tr>
                    <th><label>Date: </label></th>
                    <td><input type={'text'} name='date'  placeholder={'Date'}/></td>
                  </tr>
                  <tr>
                    <th><label>Check In: </label></th>
                    <td><input type={'text'} name='checkIn'  placeholder='Check In'/></td>
                  </tr>
                  <tr>
                    <th><label>Check Out: </label></th>
                    <td><input type={'text'} name='checkOut'  placeholder='Check Out'/></td>
                  </tr>
                  <tr>
                    <td><button className='small-button'>Add</button></td>
                    <td><button className='small-button'>Cancel</button></td>
                  </tr>
                </table>
              </form>
            </div>

          </div>
          </div>
        </div>
      </EmployeeBar>
    </div>
  )
}

