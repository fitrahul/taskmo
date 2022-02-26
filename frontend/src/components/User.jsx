import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';


const User = () => {
  const [search,setSearch] = useState("");
  const [showsearch,setShow] = useState({});
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);

  const handleMinus = () => {
    if (page !== 1) setPage(page - 1);
  }

  const handleSearch = () => {
    // console.log(search);
      axios.get(`http://localhost:8000/user/name/${search}`).then((res) => {
        // console.log("res: ",res.data.user);
        var data = res.data.user;
        setShow(data);
      })
    setSearch("");
    setShow({});
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/user?page=${page}&limit=${2}`).then((res) => {
      var data = res.data;
      // console.log(data.user);
      console.log(page);
      setUser(data.user);
    })
  }, [page])
  return (
    <div>
      {/* 1. SEARCH BY NAME */}
      <br />
      <TextField onChange={(e) => {setSearch(e.target.value)}} value={search} id="outlined-basic" label="Outlined" variant="outlined" />
      <Button onClick={handleSearch} variant="contained">Search</Button>
      <br />
      {showsearch !== null ? 
      <div>
        {/* <div>{showsearch.name}</div> */}
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
              <TableRow
                key={showsearch.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row"><img src={showsearch.profile_photo} alt="" /></TableCell>
                <TableCell align="right">{showsearch.name}</TableCell>
                <TableCell align="right">{showsearch.phone}</TableCell>
                <TableCell align="right">{showsearch.email}</TableCell>
                <TableCell align="right">{showsearch.gender}</TableCell>
                <TableCell align="right">{showsearch.dob}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      </div> : 
      <div></div>}

      {/* 2. SHOWING DATA OF USERS */}
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* name, phone, email, gender, dob, profile_photo, register date */}
              <TableCell>Profile Photo</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">DOB</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row"><img src={row.profile_photo} alt="" /></TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.dob}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />

      {/* 3. PAGINATION */}
      <Button onClick={handleMinus} variant="contained">-</Button>
      <Button onClick={() => { setPage(page + 1) }} variant="contained">+</Button>
    </div>
  )
}

export default User;