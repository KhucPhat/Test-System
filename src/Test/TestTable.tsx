import React, { useState } from 'react';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MyTable = () => {
    const [selectedIsKey, setSelectedIsKey] = useState(null);
  // Dữ liệu ví dụ
const data = [
    { id: 1, name: 'Mục 1' },
    { id: 2, name: 'Mục 2' },
    { id: 3, name: 'Mục 3' }
  ];

    // Hàm xử lý sự kiện khi checkbox thay đổi
    const handleCheckboxChange = (id) => {
        setSelectedIsKey(id);  // Cập nhật ID của `isKey` được chọn
      };
    
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Is Key</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIsKey === item.id}
                      onChange={() => handleCheckboxChange(item.id)}
                      onClick={(e) => e.stopPropagation()} // Ngăn sự kiện lan truyền
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    };




export default MyTable
