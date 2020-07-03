import ky from "ky-universal";
import { CreateRoomResponse, CreatePlayerResponse } from "types/api";

const prefixUrl = "http://localhost:3001";

export const createRoomAPI = (): Promise<CreateRoomResponse> =>
  ky.post("room", { prefixUrl }).json();

export const checkRoomAPI = (code: string | string[] | undefined) =>
  ky.get(`room/${code}`, { prefixUrl, credentials: "include" });

export const createPlayerAPI = (
  name: string,
  code: string | string[] | undefined
): Promise<CreatePlayerResponse> =>
  ky
    .post("player", {
      prefixUrl,
      json: { name, code },
      credentials: "include",
    })
    .json();
