"use client";

import { useGetCategories } from "@/api/useGetProducts";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import Link from "next/link";

const ChooseCategory = () => {
  const { result, loading, error }: ResponseType = useGetCategories();
  console.log(result);
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">
        Elige tu categoria favorita
      </h3>
      <div className="grid gap-5 sm:grid-cols-3 overflow-hidden">
        {!loading &&
          result !== undefined &&
          result?.length > 0 &&
          result.map(
            (category: CategoryType) => (
              console.log(category),
              (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url('${process.env.NEXT_PUBLIC_BACKEND_URL}${category.images[0].url}')`,
                  }}
                  title={category.name}
                  data-cy="category"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.images[0].url}`}
                    alt={category.name}
                    className="max-w-[270px] transition duration-300 ease-in-out hover:scale-110 rounded-lg"
                  />
                  <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                    {category.name}
                  </p>
                </Link>
              )
            )
          )}
      </div>
    </div>
  );
};

export default ChooseCategory;
