import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSocket from "hooks/use-socket";
import useAsync from "hooks/use-async";
import { checkRoomAPI, createPlayerAPI } from "api";
import GameView from "components/GameView";
import PlayerCreation from "components/PlayerCreation";
import getCookies from "utils/getCookies";
import { Cookies, Player, Icon } from "types";
// import styles from "./Room.module.scss";

type Session = {
  code?: string | string[];
  playerId?: string;
};

const Room = ({ cookies }: Cookies) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session>({});
  const [player, setPlayer] = useState<any>({});
  const [otherPlayers, setOtherPlayers] = useState<any[]>([]);
  const router = useRouter();
  const { code } = router.query;
  const socket = useSocket("http://localhost:3001");

  useAsync(async () => {
    try {
      await checkRoomAPI(code);
      const getCookie = getCookies(cookies);
      const cookieCode = getCookie("room");
      const cookiePlayerId = getCookie("playerId");
      if (cookieCode === code && cookiePlayerId) {
        //TODO?: refresh cookies here
        setSession({ code: cookieCode, playerId: cookiePlayerId });
      } else {
        setLoading(false);
      }
    } catch (error) {
      // Room not found
    }
  }, []);

  useEffect(() => {
    if (socket && session?.playerId) {
      if (!socket.connected) {
        socket.connect();
        socket.emit("join-room", session);
        setLoading(false);
      }
      socket.on("game", (player: Player, otherPlayers: any) => {
        setPlayer(player);
        setOtherPlayers(otherPlayers);
      });
      socket.on("player-join", (player: any) => {
        setOtherPlayers((otherPlayers) =>
          !~otherPlayers.findIndex(({ id }) => player.id === id)
            ? [...otherPlayers, player]
            : otherPlayers
        );
      });
      socket.on("player-leave", (playerId: string) => {
        setOtherPlayers((otherPlayers) =>
          otherPlayers.filter(({ id }) => id !== playerId)
        );
      });
    }
  }, [socket, session]);

  const createPlayer = (name: string, icon: Icon) => async () => {
    try {
      setLoading(true);
      const { playerId } = await createPlayerAPI(name, icon, code);
      setSession({ code, playerId });
    } catch (error) {}
  };

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : session.playerId ? (
        <GameView player={player} otherPlayers={otherPlayers} />
      ) : (
        <PlayerCreation onClick={createPlayer} code={code} />
      )}
    </>
  );
};

export default Room;
