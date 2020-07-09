import { useState, FormEvent } from "react";
import { getAvailableIconsAPI } from "api";
import { FiRefreshCw } from "react-icons/fi";
import useAsync from "hooks/use-async";
import { Icon } from "types";
import styles from "./PlayerCreation.module.scss";
import { PlayerIcon } from "components/ui";

type Props = {
  onClick: any;
  code: string | string[] | undefined;
};

const PlayerCreation = ({ onClick, code }: Props) => {
  const [name, setName] = useState("");
  const [icons, setIcons] = useState<Icon[]>([]);
  const [index, setIndex] = useState(0);

  useAsync(async () => {
    const { availableIcons } = await getAvailableIconsAPI(code);
    setIcons(availableIcons);
  }, []);

  const changeIcon = () => {
    setIndex((index) => (index + 1) % icons.length);
  };

  const onChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setName(currentTarget.value);
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.playerIcon}>
          <PlayerIcon icon={icons[index]} />
          <button onClick={changeIcon}>
            <FiRefreshCw />
          </button>
        </div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={onChange}
        />
        <button onClick={onClick(name, icons[index])}>Play</button>
      </div>
    </section>
  );
};

export default PlayerCreation;
