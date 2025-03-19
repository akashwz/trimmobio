import Slide from '@mui/material/Slide';
import React from 'react';
export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });