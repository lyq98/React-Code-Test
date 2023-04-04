import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Table, Form, Pagination, Button } from 'react-bootstrap';
import { PaginationControl } from 'react-bootstrap-pagination-control';

function UserLists() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalUsers = filteredUsers.length;

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    }
    fetchUsers();
  }, []);

  function sortUsersBy(property) {
    let newFilteredUsers = [...filteredUsers].sort((a, b) =>
      a[property].localeCompare(b[property])
    );

    // Check if the property is already sorted in ascending order
    if (property === sortBy && sortOrder === 'asc') {
      setSortOrder('desc');
      newFilteredUsers.reverse();
    } else {
      setSortOrder('asc');
    }
    setFilteredUsers(newFilteredUsers);
    setCurrentPage(1);
    setSortBy(property);
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
    const results = users.filter(
      user =>
        user.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.phone.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredUsers(results);
    setCurrentPage(1);
  }

  return (
    <div className='App'>
      <div className='UserLists'>
        <h1>User List</h1>
        <Form>
          <Form.Control
            type='text'
            placeholder='Search by Keyword(s)'
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form>
        <br />
        <table>
          <thead>
            <tr>
              <th onClick={() => sortUsersBy('name')}>
                Name
                {sortBy === 'name' && sortOrder === 'asc' && (
                  <span>&#9650;</span>
                )}
                {sortBy === 'name' && sortOrder === 'desc' && (
                  <span>&#9660;</span>
                )}
                {sortBy !== 'name' && <span>&#8693;</span>}
              </th>
              <th onClick={() => sortUsersBy('email')}>
                Email
                {sortBy === 'email' && sortOrder === 'asc' && (
                  <span>&#9650;</span>
                )}
                {sortBy === 'email' && sortOrder === 'desc' && (
                  <span>&#9660;</span>
                )}
                {sortBy !== 'email' && <span>&#8693;</span>}
              </th>
              <th onClick={() => sortUsersBy('phone')}>
                Phone
                {sortBy === 'phone' && sortOrder === 'asc' && (
                  <span>&#9650;</span>
                )}
                {sortBy === 'phone' && sortOrder === 'desc' && (
                  <span>&#9660;</span>
                )}
                {sortBy !== 'phone' && <span>&#8693;</span>}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationControl
          page={currentPage}
          between={4}
          total={totalUsers}
          limit={usersPerPage}
          changePage={page => {
            setCurrentPage(page);
            console.log(page);
          }}
          ellipsis={1}
        />
      </div>
    </div>
  );
}

export default UserLists;
