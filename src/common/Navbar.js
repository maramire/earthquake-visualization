import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Link } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";


const headerStyle = {
  'marginBottom': '1rem',
};

function Navbar() {
  const [value, setValue] = useState(0);

  return (
    <header style={headerStyle}>
      <BottomNavigation
        sx = {{ 
          background: '#F75C03',
          "& .Mui-selected": {
            background: "#111D4A",
            color: "#FFF8F0"
          },
          "& .MuiBottomNavigationAction-root, svg": {
            color: "#FFF8F0"
          },
          "& :hover": {
            background: "#111D4A"
          }
        }}
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
