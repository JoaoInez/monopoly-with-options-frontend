import ky from "ky-universal";
import {
  CreateRoomResponse,
  CreatePlayerResponse,
  GetAvailableIconsResponse,
  Icon,
} from "types";

const prefixUrl = "http://localhost:3001";

export const createRoomAPI = (): Promise<CreateRoomResponse> =>
  ky.post("room", { prefixUrl }).json();

export const checkRoomAPI = (code: string | string[] | undefined) =>
  ky.get(`room/${code}`, { prefixUrl });

export const createPlayerAPI = (
  name: string,
  icon: Icon,
  code: string | string[] | undefined
): Promise<CreatePlayerResponse> =>
  ky
    .post("player", {
      prefixUrl,
      json: { name, icon, code },
      credentials: "include",
    })
    .json();

export const getAvailableIconsAPI = (
  code: string | string[] | undefined
): Promise<GetAvailableIconsResponse> =>
  ky.get(`icons/${code}`, { prefixUrl }).json();
