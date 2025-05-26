import React from 'react';
import {
  Box, Button, Paper, TextField, Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const QueryPanel = ({ sql, setSql, sqlResult, handleSqlQuery }) => {
  const columns = sqlResult.length > 0
    ? Object.keys(sqlResult[0]).map((key) => ({
      field: key,
      headerName: key,
      flex: 1,
    }))
    : [];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Run Raw SQL</Typography>
        <TextField
          fullWidth multiline minRows={4}
          label="SQL Query" value={sql}
          onChange={(e) => setSql(e.target.value)} margin="normal"
        />
        <Button onClick={handleSqlQuery} variant="outlined">Run SQL</Button>
      </Paper>

      {sqlResult.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>SQL Results</Typography>
          <DataGrid
            rows={sqlResult.map((row, i) => ({ id: i, ...row }))}
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

export default QueryPanel;
