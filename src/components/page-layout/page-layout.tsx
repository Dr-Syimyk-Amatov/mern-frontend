import {
  Box,
  CssBaseline,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  Toolbar,
  styled,
  useTheme,
  CSSObject,
  Theme,
} from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./page-layout.scss";
import { Header } from "../header";

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `0px`,
  [theme.breakpoints.up("sm")]: {
    width: `0px`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export function PageLayout({ children }: React.PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", paddingTop: "" }}>
      <CssBaseline />
      <Header toggleDrawer={toggleDrawer}></Header>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Drawer variant="permanent" open={open}>
          <Toolbar />
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet></Outlet>
        </Box>
      </Box>
    </Box>
  );
}
