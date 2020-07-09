import { Icon } from "./players";

export type CreateRoomResponse = {
  code: string;
};

export type CreatePlayerResponse = {
  playerId: string;
};

export type GetAvailableIconsResponse = {
  availableIcons: Icon[];
};
