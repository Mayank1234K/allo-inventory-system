"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProductCard from "@/components/ProductCard";

export default function HomePage() {

  const router = useRouter();

  const [products, setProducts] =
    useState<any[]>([]);

  const [error, setError] =
    useState("");

  const [loadingId, setLoadingId] =
    useState<string | null>(null);

  async function fetchProducts() {

    try {

      const res =
        await fetch("/api/products");

      const data = await res.json();

      if (!res.ok) {

        setError(data.error);

        return;
      }

      setProducts(data);

    } catch (error) {

      console.error(error);

      setError(
        "Failed to fetch products"
      );
    }
  }

  useEffect(() => {

    fetchProducts();

  }, []);

  async function reserve(item: any) {

    try {

      setLoadingId(
        `${item.productId}-${item.warehouseId}`
      );

      const res = await fetch(
        "/api/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            productId: item.productId,
            warehouseId: item.warehouseId,
            quantity: 1
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {

        setError(data.error);

        return;
      }

      router.push(
        `/reservation/${data.id}`
      );

    } catch (error) {

      console.error(error);

      setError(
        "Reservation failed"
      );

    } finally {

      setLoadingId(null);
    }
  }

  return (
    <main className="
      relative
      min-h-screen
      overflow-hidden
      px-6
      py-10
    ">

      {/* Background Glow */}
      <div className="
        absolute
        top-0
        left-0
        w-full
        h-full
        overflow-hidden
        -z-10
      ">

        <div className="
          absolute
          top-[-100px]
          left-[-100px]
          w-[400px]
          h-[400px]
          bg-purple-500/30
          rounded-full
          blur-3xl
        " />

        <div className="
          absolute
          bottom-[-100px]
          right-[-100px]
          w-[400px]
          h-[400px]
          bg-blue-500/30
          rounded-full
          blur-3xl
        " />

      </div>

      <div className="
        max-w-7xl
        mx-auto
      ">

        {/* HERO */}
        <div className="
          text-center
          mb-16
        ">

          <div className="
            inline-block
            px-5
            py-2
            rounded-full
            bg-white/10
            border
            border-white/20
            text-sm
            text-gray-200
            backdrop-blur-lg
            mb-6
          ">
            Real-Time Inventory Reservation System
          </div>

          <h1 className="
            text-6xl
            md:text-7xl
            font-extrabold
            text-white
            leading-tight
          ">

            Allo Inventory

            <span className="
              block
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-blue-400
              to-purple-400
            ">
              Reservation Platform
            </span>

          </h1>

          <p className="
            mt-6
            text-xl
            text-gray-300
            max-w-3xl
            mx-auto
          ">

            Concurrency-safe multi-warehouse inventory reservation system with real-time tracking and expiration handling.

          </p>

        </div>

        {/* STATS */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mb-14
        ">

          <div className="
            backdrop-blur-xl
            bg-white/10
            border
            border-white/20
            rounded-3xl
            p-6
            text-center
          ">

            <h2 className="
              text-4xl
              font-bold
              text-white
            ">
              {products.length}
            </h2>

            <p className="
              text-gray-300
              mt-2
            ">
              Active Products
            </p>

          </div>

          <div className="
            backdrop-blur-xl
            bg-white/10
            border
            border-white/20
            rounded-3xl
            p-6
            text-center
          ">

            <h2 className="
              text-4xl
              font-bold
              text-white
            ">
              2
            </h2>

            <p className="
              text-gray-300
              mt-2
            ">
              Warehouses
            </p>

          </div>

          <div className="
            backdrop-blur-xl
            bg-white/10
            border
            border-white/20
            rounded-3xl
            p-6
            text-center
          ">

            <h2 className="
              text-4xl
              font-bold
              text-white
            ">
              Live
            </h2>

            <p className="
              text-gray-300
              mt-2
            ">
              Reservation Tracking
            </p>

          </div>

        </div>

        {/* ERROR */}
        {
          error && (
            <div className="
              bg-red-500/20
              border
              border-red-400
              text-red-200
              p-4
              rounded-2xl
              mb-8
              backdrop-blur-lg
            ">
              {error}
            </div>
          )
        }

        {/* PRODUCTS */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">

          {
            products.map((item) => (

              <ProductCard
                key={`${item.productId}-${item.warehouseId}`}
                item={item}
                onReserve={reserve}
                loading={
                  loadingId ===
                  `${item.productId}-${item.warehouseId}`
                }
              />

            ))
          }

        </div>

      </div>

    </main>
  );
}