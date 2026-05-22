"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/lib/utils";

interface Props {
  expiresAt: string;
}

export default function CountdownTimer({
  expiresAt
}: Props) {

  const calculateTimeLeft = () => {

    const difference =
      new Date(expiresAt).getTime() -
      Date.now();

    return Math.max(
      0,
      Math.floor(difference / 1000)
    );
  };

  const [timeLeft, setTimeLeft] =
    useState(calculateTimeLeft());

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft(calculateTimeLeft());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  return (
    <div className="text-lg font-medium">
      Expires in: {formatTime(timeLeft)}
    </div>
  );
}