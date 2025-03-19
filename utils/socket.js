import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:6061", {
  autoConnect: false,
  reconnectionAttempts: 3,
  reconnectionDelay: 5000,
});
