import { Snackbar, Alert } from "@mui/material";
import { PropsWithChildren, useState } from "react";

export const ErrorSnackbar = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason !== "clickaway") {
      setOpen(false);
    }
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {children}
      </Alert>
    </Snackbar>
  );
};
