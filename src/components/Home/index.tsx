import styles from "./Home.module.scss";
import { useRouter } from "next/router";
import { useState, FormEvent, KeyboardEvent } from "react";

const Home = () => {
  const [room, setRoom] = useState("");
  const router = useRouter();

  const onChange = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
    setRoom(currentTarget.value.toUpperCase());
  };

  const joinRoom = () => {
    room.length === 5 && router.push(`/${room}`);
  };

  const onEnter = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    key === "Enter" && joinRoom();
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
        <button className={styles.createRoomBtn}>Create Room</button>
      </div>
    </section>
  );
};

export default Home;
