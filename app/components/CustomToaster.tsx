"use client";

import useSocket from "@/hooks/useSocket";
import { useEffect } from "react";
import { toast } from "react-hot-toast";


const CustomToaster = () => {
 
  useSocket("new-movie", (message) => {
    if (message) {
      toast.success(message);
    }
  });

  useSocket("new-rating", (message) => {
    if (message) {
      toast.success(message);
    }
  });



  return null; 
};

export default CustomToaster;
