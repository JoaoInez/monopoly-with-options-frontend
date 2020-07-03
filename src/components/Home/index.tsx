import { useState, FormEvent, KeyboardEvent } from "react";
import { useRouter } from "next/router";
import { createRoomAPI, checkRoomAPI } from "api";
import styles from "./Home.module.scss";

const Home = () => {
  const [room, setRoom] = useState("");
  const router = useRouter();

  const onChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setRoom(currentTarget.value.toUpperCase());
  };

  const joinRoom = async () => {
    try {
      if (room.length === 5) {
        await checkRoomAPI(room);
        router.push(`/${room}`);
      }
    } catch (error) {
      // Room not found
    }
  };

  const onEnter = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    key === "Enter" && joinRoom();
  };

  const createRoom = async () => {
    try {
      const { code } = await createRoomAPI();
      router.push(`/${code}`);
    } catch (error) {}
  };

  return (
    <section className={styles.main}>
      <h1>Monopoly with options</h1>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Room code"
          value={room}
          onChange={onChange}
          maxLength={5}
          onKeyDown={onEnter}
        />
        <button onClick={joinRoom}>Join Room</button>
        <hr />
        <button onClick={createRoom} className={styles.createRoomBtn}>
          Create Room
        </button>
      </div>
    </section>
  );
};

export default Home;
