import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Dashboard, Login, Register } from './components';
import { TableUser } from './components/Dashboard/TableUser';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="" index element={<Dashboard />} />
        <Route path="/table" element={<TableUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Login />} />
      </Routes>
    </>
  );  
}

export default App;