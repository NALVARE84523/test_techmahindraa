import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@mui/material';

const Logo = React.forwardRef(({sx}) => {

  const logo = (
    <Box
      component="div"
      sx={{
        width: 70,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
    >
      <img alt="logo" style={{objectFit: "contain"}} src='https://prnewswire2-a.akamaihd.net/p/1893751/sp/189375100/thumbnail/entry_id/0_q0jouawo/def_height/2700/def_width/2700/version/100012/type/1'/>
    </Box>
  );

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

export default Logo;
