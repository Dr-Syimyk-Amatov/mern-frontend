import { Typography } from "@mui/material";
import { PriorityProvider } from "../../contexts";
import { Priorities } from "../priorities";

export function Home() {
  return (
    <>
      <Typography variant="h1">Home Page</Typography>

      <PriorityProvider>
        <Priorities></Priorities>
      </PriorityProvider>
    </>
  );
}
