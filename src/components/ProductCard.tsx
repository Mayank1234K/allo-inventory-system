interface Props {
  item: any;
  onReserve: (item: any) => void;
  loading: boolean;
}

export default function ProductCard({
  item,
  onReserve,
  loading
}: Props) {

  return (
    <div className="
      relative
      overflow-hidden
      backdrop-blur-xl
      bg-white/10
      border
      border-white/20
      rounded-3xl
      p-8
      shadow-2xl
      transition
      duration-300
      hover:scale-105
      hover:border-blue-400/40
    ">

      <div className="
        absolute
        top-0
        right-0
        w-32
        h-32
        bg-blue-500/20
        rounded-full
        blur-3xl
      " />

      <div className="relative z-10">

        <div className="
          flex
          justify-between
          items-start
          mb-6
        ">

          <div>

            <h2 className="
              text-3xl
              font-bold
              text-white
            ">
              {item.productName}
            </h2>

            <p className="
              text-gray-300
              mt-2
            ">
              Premium Inventory Item
            </p>

          </div>

          <div className="
            px-3
            py-1
            rounded-full
            bg-green-500/20
            text-green-300
            text-sm
            border
            border-green-400/30
          ">
            Active
          </div>

        </div>

        <div className="
          space-y-4
          text-gray-200
        ">

          <div className="
            flex
            justify-between
          ">
            <span>Warehouse</span>
            <span className="font-semibold">
              {item.warehouse}
            </span>
          </div>

          <div className="
            flex
            justify-between
          ">
            <span>Available Stock</span>

            <span className="
              font-bold
              text-xl
              text-white
            ">
              {item.availableStock}
            </span>
          </div>

        </div>

        <button
          onClick={() => onReserve(item)}
          disabled={
            loading ||
            item.availableStock <= 0
          }
          className="
            mt-8
            w-full
            bg-gradient-to-r
            from-blue-500
            to-purple-500
            hover:from-blue-600
            hover:to-purple-600
            text-white
            font-semibold
            py-4
            rounded-2xl
            transition
            disabled:bg-gray-500
          "
        >

          {
            item.availableStock <= 0
              ? "Out of Stock"
              : loading
              ? "Reserving..."
              : "Reserve Inventory"
          }

        </button>

      </div>

    </div>
  );
}