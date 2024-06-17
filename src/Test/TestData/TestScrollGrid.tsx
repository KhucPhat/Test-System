import React from 'react';
import { Grid, Paper } from '@mui/material';

function ScrollableGrid() {
  // Tính toán chiều rộng mỗi item dựa trên số lượng items
  const itemWidth = '50%'; // Mỗi item chiếm 50% chiều rộng container

  return (
    <div className="scrollableContainer">
      <Grid container spacing={2} sx={{ width: '100%', flexWrap: 'nowrap' }}>
        {Array.from({ length: 20 }, (_, index) => (
          <Grid item key={index} sx={{ width: itemWidth, flexShrink: 0 }}>
            <Paper sx={{ padding: 2, width: '100%', textAlign: 'center' }}>
              Item {index + 1}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ScrollableGrid;
