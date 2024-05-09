import React, { useRef, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, TextField, Paper } from '@mui/material';

const sampleData = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const TestTableSearch = () => {
  const [data, setData] = useState(sampleData);
  const [searchTerms, setSearchTerms] = useState({ id: '', name: '' });
  const inputRefs = useRef({});
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    // Set focus back to the input that was focused before re-rendering
    if (focusedInput && inputRefs.current[focusedInput]) {
      inputRefs.current[focusedInput].focus();
    }
  }, []);

  const handleChange = (id, value) => {
    setSearchTerms(prev => ({ ...prev, [id]: value }));
    setData(sampleData.filter(item => item[id].toString().toLowerCase().includes(value.toLowerCase())));
  };

  const handleFocus = (key) => {
    setFocusedInput(key)
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableRow>
          {Object.keys(searchTerms).map(key => (
            <TableCell key={key}>
              <TextField
                value={searchTerms[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                onFocus={() => handleFocus(key)}
                inputRef={ref => inputRefs.current[key] = ref}
              />
            </TableCell>
          ))}
        </TableRow>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestTableSearch;
