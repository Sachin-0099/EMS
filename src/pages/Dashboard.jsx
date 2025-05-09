import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import { useAuth } from '../context/authoContext';

const initialEmployees = [
  { id: 1, name: 'John Doe', email: 'john@ems.com', role: 'Manager' },
  { id: 2, name: 'Jane Smith', email: 'jane@ems.com', role: 'Developer' }
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 2
};

const Dashboard = () => {
  const { logout } = useAuth(); // Get logout function from context
  const [employees, setEmployees] = useState(initialEmployees);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: '' });

  const handleOpen = (employee = null) => {
    if (employee) {
      setForm(employee);
      setEditing(employee.id);
    } else {
      setForm({ name: '', email: '', role: '' });
      setEditing(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ name: '', email: '', role: '' });
    setEditing(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editing) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editing ? { ...form, id: editing } : emp))
      );
    } else {
      const newId = employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
      setEmployees([...employees, { ...form, id: newId }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpen(params.row)} color="primary">
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error">
            <Delete />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Top Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Employee Management</Typography>
        <Box>
          <Button variant="contained" onClick={() => handleOpen()} sx={{ mr: 2 }}>
            Add Employee
          </Button>
          <Button variant="outlined" color="error" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Employee Table */}
      <Box sx={{ height: 400 }}>
        <DataGrid rows={employees} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            {editing ? 'Edit Employee' : 'Add Employee'}
          </Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            {editing ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
