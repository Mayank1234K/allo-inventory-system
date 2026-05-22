"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter
} from "next/navigation";

export default function ReservationPage() {

  const params = useParams();

  const router = useRouter();

  const [reservation, setReservation] =
    useState<any>(null);

  const [timeLeft, setTimeLeft] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function fetchReservation() {

    try {

      const res = await fetch(
        `/api/reservations/${params.id}`
      );

      const data = await res.json();

      if (!res.ok) {

        setError(data.error);

        return;
      }

      setReservation(data);

      startCountdown(data.expiresAt);

    } catch (error) {

      console.error(error);

      setError(
        "Failed to load reservation"
      );
    }
  }

  function startCountdown(
    expiresAt: string
  ) {

    const interval = setInterval(() => {

      const now =
        new Date().getTime();

      const expiry =
        new Date(expiresAt).getTime();

      const difference =
        expiry - now;

      if (difference <= 0) {

        clearInterval(interval);

        setTimeLeft("Expired");

        return;
      }

      const minutes = Math.floor(
        difference / 1000 / 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft(
        `${minutes}:${
          seconds < 10
            ? "0" + seconds
            : seconds
        }`
      );

    }, 1000);
  }

  useEffect(() => {

    fetchReservation();

  }, []);

  async function confirmReservation() {

    try {

      setLoading(true);

      const res = await fetch(
        `/api/reservations/${params.id}/confirm`,
        {
          method: "POST"
        }
      );

      const data = await res.json();

      if (!res.ok) {

        setError(data.error);

        return;
      }

      alert(
        "Purchase Confirmed"
      );

      router.push("/");

    } catch (error) {

      console.error(error);

      setError(
        "Confirmation failed"
      );

    } finally {

      setLoading(false);
    }
  }

  async function cancelReservation() {

    try {

      setLoading(true);

      const res = await fetch(
        `/api/reservations/${params.id}/release`,
        {
          method: "POST"
        }
      );

      const data = await res.json();

      if (!res.ok) {

        setError(data.error);

        return;
      }

      alert(
        "Reservation Cancelled"
      );

      router.push("/");

    } catch (error) {

      console.error(error);

      setError(
        "Cancellation failed"
      );

    } finally {

      setLoading(false);
    }
  }

  if (!reservation) {

    return (
      <main className="
        min-h-screen
        flex
        items-center
        justify-center
        text-white
      ">
        Loading...
      </main>
    );
  }

  return (
    <main className="
      min-h-screen
      flex
      justify-center
      items-center
      px-4
      py-10
    ">

      <div className="
        w-full
        max-w-2xl
        backdrop-blur-xl
        bg-white/10
        border
        border-white/20
        rounded-3xl
        shadow-2xl
        p-10
      ">

        <div className="
          text-center
          mb-10
        ">

          <h1 className="
            text-5xl
            font-bold
            text-white
            mb-4
          ">
            Reservation Checkout
          </h1>

          <p className="
            text-gray-200
            text-lg
          ">
            Complete your purchase before reservation expires
          </p>

        </div>

        {
          error && (
            <div className="
              bg-red-500/20
              border
              border-red-400
              text-red-200
              p-4
              rounded-2xl
              mb-6
            ">
              {error}
            </div>
          )
        }

        <div className="
          space-y-6
          text-white
        ">

          <div className="
            flex
            justify-between
            items-center
            bg-white/10
            p-5
            rounded-2xl
          ">

            <span className="
              text-lg
              font-medium
            ">
              Reservation Status
            </span>

            <span className={`
              px-4
              py-2
              rounded-full
              text-sm
              font-bold

              ${
                reservation.status ===
                "CONFIRMED"
                  ? "bg-green-500 text-white"
                  : reservation.status ===
                    "RELEASED"
                  ? "bg-red-500 text-white"
                  : "bg-yellow-400 text-black"
              }
            `}>
              {reservation.status}
            </span>

          </div>

          <div className="
            flex
            justify-between
            items-center
            bg-white/10
            p-5
            rounded-2xl
          ">

            <span className="
              text-lg
              font-medium
            ">
              Quantity
            </span>

            <span className="
              text-2xl
              font-bold
            ">
              {reservation.quantity}
            </span>

          </div>

          <div className="
            flex
            justify-between
            items-center
            bg-white/10
            p-5
            rounded-2xl
          ">

            <span className="
              text-lg
              font-medium
            ">
              Time Remaining
            </span>

            <span className="
              text-3xl
              font-bold
              text-yellow-300
            ">
              {timeLeft}
            </span>

          </div>

        </div>

        <div className="
          flex
          gap-4
          mt-10
        ">

          <button
            onClick={confirmReservation}
            disabled={loading}
            className="
              flex-1
              bg-green-500
              hover:bg-green-600
              text-white
              py-4
              rounded-2xl
              text-lg
              font-semibold
              transition
              disabled:bg-gray-400
            "
          >

            {
              loading
                ? "Processing..."
                : "Confirm Purchase"
            }

          </button>

          <button
            onClick={cancelReservation}
            disabled={loading}
            className="
              flex-1
              bg-red-500
              hover:bg-red-600
              text-white
              py-4
              rounded-2xl
              text-lg
              font-semibold
              transition
              disabled:bg-gray-400
            "
          >

            Cancel Reservation

          </button>

        </div>

      </div>

    </main>
  );
}