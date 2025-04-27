
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_MOVIE_HOST, {
  withCredentials: true,
});

export default socket;