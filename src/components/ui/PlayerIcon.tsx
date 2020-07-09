import {
  GiFedora,
  GiSinkingShip,
  GiCavalry,
  GiRaceCar,
  GiChelseaBoot,
  GiPirateCannon,
  GiWheelbarrow,
} from "react-icons/gi";
import { FaDog } from "react-icons/fa";
import { Icon } from "types";

type Props = {
  icon: Icon;
};

export const PlayerIcon = ({ icon }: Props) =>
  ({
    hat: <GiFedora />,
    ship: <GiSinkingShip />,
    horse: <GiCavalry />,
    car: <GiRaceCar />,
    shoe: <GiChelseaBoot />,
    cannon: <GiPirateCannon />,
    cart: <GiWheelbarrow />,
    dog: <FaDog />,
  }[icon] || null);
