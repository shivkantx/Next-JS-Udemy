"use client";

import { useParams } from "next/navigation";
import React from "react";

function Page() {
  const { id, reviewId } = useParams();

  return (
    <div className="text-gray-600">
      page {id} {reviewId}
    </div>
  );
}

export default Page;
