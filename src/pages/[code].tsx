import { useEffect } from "react";
import { useRouter } from "next/router";
import useSocket from "hooks/use-socket";

const RoomPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const socket = useSocket("http://localhost:3001");

  useEffect((): void => {}, [socket]);

  useEffect(() => {
    if (code) {
      console.log(code);
    }
  }, [code]);

  return <div></div>;
};

export default RoomPage;
