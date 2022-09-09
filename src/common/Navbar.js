import { BottomNavigation } from "@mui/material";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Link } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from "@mui/material/styles";
import { useState } from "react";

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  :hover {
    color: rgb(25, 118, 210)
  }
`);

const headerStyle = {
  'margin-bottom': '1rem'
};

function Navbar() {
  const [value, setValue] = useState(0);

  return (
    <header style={headerStyle}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction component={Link} to="/events" label="Home" icon={<HomeIcon />}/>
        <BottomNavigationAction component={Link} to="/events" label="Events" icon={<LocationOnIcon />}/>
        <BottomNavigationAction component={Link} to="/about" label="About"  icon={<InfoIcon />}/>
      </BottomNavigation>
    </header>
  );
}

export default Navbar;
