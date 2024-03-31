import { me } from "../../api";
import { useAuth } from "../../hooks";

export function Home() {
  const { user } = useAuth();

  const getUser = async () => {
    const user = await me();
    console.log(user);
  };

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={getUser}>Get</button>
    </>
  );
}
