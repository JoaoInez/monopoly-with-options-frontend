import Room from "components/Room";
import { NextPage } from "next";
import { Cookies } from "types";

const RoomPage: NextPage<Cookies> = ({ cookies }) => <Room cookies={cookies} />;

RoomPage.getInitialProps = async ({ req }) => {
  const cookies = req?.headers.cookie;
  return { cookies };
};

export default RoomPage;
