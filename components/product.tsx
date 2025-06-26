import Link from "next/link"
import FavoriteButton from "./FavoriteButton"
import { createClient } from "@/utils/supabase/server"

const Product = async ({ cloth }: { cloth: any }) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUserIdentities()

  return (
    <div className="flex flex-col h-full w-full">
      <Link href={`/product/${cloth.sys.id}`}>
        <div className="relative overflow-hidden transition transform duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-lg hover:scale-105 hover:cursor-pointer rounded-lg">
          <div className="w-full aspect-[2/3] sm:aspect-[3/4] overflow-hidden rounded-lg">
            <img
              src={cloth.fields.thumbnail.fields.file.url || "/placeholder.svg"}
              alt={cloth.fields.name || "Product image"}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </Link>

      <div className="mt-3 flex flex-col gap-2 px-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">{cloth.fields.name}</h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {cloth.fields.isSoldOut ? (
              <span className="text-sm text-red-600 font-medium">Sold Out</span>
            ) : (
              <span className="text-lg font-semibold text-gray-900">£{cloth.fields.price}</span>
            )}
          </div>
          <FavoriteButton id={cloth.sys.id} data={data} />
        </div>
      </div>
    </div>
  )
}

export default Product
