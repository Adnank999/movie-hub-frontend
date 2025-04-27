


import { useEffect } from "react";
import socket from "@/lib/socket";

type EventCallback = (data: any) => void;

const useSocket = (eventName: string, callback: EventCallback) => {
  useEffect(() => {
    if (!socket) return;
    console.log("socket connected",)
    socket.on(eventName, callback);

   
    return () => {
      socket.off(eventName, callback);
    };
  }, [eventName, callback]);
};

export default useSocket;
