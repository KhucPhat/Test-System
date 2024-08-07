import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function TestChangeInputPerforment() {
  const [rows, setRows] = useState([
    { id: 1, name: "Object1", fixedValue: "Value1", isRootRefer: true, checkRefer: false },
    { id: 2, name: "Object2", fixedValue: "Value2", isRootRefer: false, checkRefer: true },
    { id: 3, name: "Object3", fixedValue: "Value3", isRootRefer: true, checkRefer: false }
  ]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [newValue, setNewValue] = useState("");

  const checkReference = (id) => {
    // Giả sử gọi API và luôn trả về true cho mục đích mô phỏng
    return Promise.resolve(true);
  };

  const handleClickOpen = (id, value) => {
    setCurrentId(id);
    setNewValue(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    const newRows = rows.map(row => {
      if (row.id === currentId) {
        return { ...row, fixedValue: newValue };
      }
      return row;
    });
    setRows(newRows);
    setOpen(false);
  };

  const handleInputChange = async (e, id) => {
    const value = e.target.value;
    const row = rows.find(row => row.id === id);

    if (row.checkRefer === false && row.id === 0) {
      const confirmed = await checkReference(id);
      if (confirmed) {
        const newRows = rows.map(row => {
          if (row.id === id) {
            return { ...row, checkRefer: true, fixedValue: value };
          }
          return row;
        });
        setRows(newRows);
        alert("Reference checked and updated!");
        return;
      }
    }

    if (row.isRootRefer) {
      handleClickOpen(id, value);
    } else {
      const newRows = rows.map(row => {
        if (row.id === id) {
          return { ...row, fixedValue: value };
        }
        return row;
      });
      setRows(newRows);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Fixed Value</TableCell>
              <TableCell>Is Root Refer</TableCell>
              <TableCell>Check Refer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <TextField
                    value={row.fixedValue}
                    onChange={(e) => handleInputChange(e, row.id)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.isRootRefer ? 'Yes' : 'No'}</TableCell>
                <TableCell>{row.checkRefer ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Edit"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to edit this value?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TestChangeInputPerforment;
