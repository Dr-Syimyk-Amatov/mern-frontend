import { AccountCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAuth } from "../../hooks";

export const Avatar = ({
  onClick,
  menuId,
}: {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  menuId: string;
}) => {
  return (
    <IconButton
      size="large"
      edge="end"
      aria-label="account of current user"
      aria-controls={menuId}
      aria-haspopup="true"
      onClick={onClick}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
  );
};
