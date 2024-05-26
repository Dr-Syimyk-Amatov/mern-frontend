import { List, ListItem, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";

export const AppNav = () => {
  return (
    <nav>
      <List>
        <ListItem>
          <ListItemButton>
            <Link to={"/"}>Home</Link>
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
};
