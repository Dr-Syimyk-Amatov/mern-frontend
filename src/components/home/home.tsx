import { getMe } from "../../api";
import { PriorityProvider, useUser } from "../../contexts";
import { LoadingState } from "../../enums";
import { useAuth } from "../../hooks";
import { Priorities } from "../priorities";

export function Home() {
  const { loadingState, user } = useUser();

  const getUser = async () => {
    const user = await getMe();
    console.log(user);
  };

  if (loadingState === LoadingState.Fetching) {
    return <>Loading!</>;
  }

  return (
    <>
      <h1>Home Page</h1>

      <PriorityProvider>
        <Priorities></Priorities>
      </PriorityProvider>
    </>
  );
}
