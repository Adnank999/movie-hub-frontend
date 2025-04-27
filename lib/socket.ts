
import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_MOVIE_HOST}:5000`, {
  withCredentials: true,
});


export default socket;