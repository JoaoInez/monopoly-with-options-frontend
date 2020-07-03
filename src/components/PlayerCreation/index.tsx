import { useState, FormEvent, MouseEvent } from "react";
import styles from "./PlayerCreation.module.scss";
import { createPlayerAPI } from "api";

type Props = {
  onClick: any;
};

const PlayerCreation = ({ onClick }: Props) => {
  const [name, setName] = useState("");

  const onChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setName(currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <input type="text" placeholder="Name" value={name} onChange={onChange} />
      <button onClick={onClick(name)}>Play</button>
    </div>
  );
};

export default PlayerCreation;
