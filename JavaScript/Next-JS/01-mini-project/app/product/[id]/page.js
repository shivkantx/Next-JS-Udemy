"use client";
import { useParams } from "next/navigation";

export default function Product() {
  const params = useParams();

  return <div className="p-10 text-amber-300 text-xl">Product {params.id}</div>;
}
