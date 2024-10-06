import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


const styles = {
    appBar: {
        background:"linear-gradient(45deg, #FF6F20 30%, #FF3D00 90%)",//deeppink, #62d84e
        position: "fixed",
        top: 0,
        zIndex: 999999
    },
    appTitle: {
        fontSize: "32px",
        fontWeight: "bolder",
        color: "white"
    }
}


export default function AppNavBar() {
  const navigate = useNavigate();  

  return (
      <AppBar position="static" style={styles.appBar}>
        <Toolbar>
          <Typography style={styles.appTitle} variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=>navigate('/')}>
            MetriX
          </Typography>
          {/* <Button color="primary" onClick={()=>navigate('/dashboard')}>Dashboard</Button>
          <Button color="primary" onClick={()=>navigate('/about')}>About Us</Button> */}
        </Toolbar>
      </AppBar>
  );
}