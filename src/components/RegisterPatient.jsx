import React from 'react';
import {
  Box, Button, FormControl, InputLabel, MenuItem, Paper,
  Select, TextField, Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const RegisterPatient = ({ form, setForm, handleRegister, patients }) => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Register Patient</Typography>
        <Box component="form" onSubmit={handleRegister}>
          <TextField
            fullWidth label="Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            margin="normal" required
          />
          <TextField
            fullWidth label="Age" type="number" value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            margin="normal" required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
              label="Gender" required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </Box>
      </Paper>

      {patients.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Registered Patients</Typography>
          <DataGrid
            rows={patients}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </Paper>
      )}
    </Box>
  );
};

export default RegisterPatient;
