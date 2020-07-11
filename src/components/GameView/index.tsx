import { BsArrowLeftRight } from "react-icons/bs";
import { Player, OtherPlayer } from "types";
import { PlayerIcon } from "components/ui";
import styles from "./GameView.module.scss";

const GameView = ({
  player,
  otherPlayers,
}: {
  player: Player;
  otherPlayers: OtherPlayer[];
}) => {
  const getRandomInt = (max: number) =>
    Math.floor(Math.random() * Math.floor(max));

  return (
    <section className={styles.container}>
      <div className={styles.playersGrid}>
        {otherPlayers.map(({ id, icon, name }) => (
          <div key={id}>
            <PlayerIcon icon={icon} />
            <small>
              {name
                .split(" ")
                .map(([firstLetter]) => `${firstLetter}.`)
                .join("")}
            </small>
          </div>
        ))}
      </div>
      <div className={styles.card}>
        <p className={styles.logo}>MWO</p>
        <div className={styles.moneyWrapper}>
          <div className={styles.chip}>
            <PlayerIcon icon={player.icon} />
          </div>
          <h2>{player.money}$</h2>
        </div>
        <p>
          {[...Array(16)]
            .map(() => getRandomInt(10))
            .join("")
            .match(/.{1,4}/g)
            ?.join(" ")}
        </p>
        <p className={styles.cardName}>{player.name}</p>
        <button className={styles.payBtn}>
          <BsArrowLeftRight />
        </button>
      </div>
    </section>
  );
};

export default GameView;
