import React from "react";
import { Poppins, Archivo_Black } from "next/font/google";

const popins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  weight: ["400"],
  subsets: ["latin"],
});

function FontExample() {
  return (
    <div>
      <h1 className={`text-4xl ${popins.className}`}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur,
        obcaecati.
      </h1>
      <h1 className={` ${archivoBlack.className}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sit quo
        laborum. Numquam distinctio ullam voluptas eligendi cum totam quas
        recusandae voluptatem sapiente tenetur obcaecati quibusdam corrupti,
        aliquam placeat architecto quod minima cupiditate porro quis minus
        maxime? Quod nesciunt dolorum vero dolore doloribus cum sunt ullam
        delectus aspernatur laboriosam? Vel repellendus corporis libero sunt quo
        dolor autem quibusdam rerum, delectus quis et eveniet, possimus iste
        inventore nulla illo deserunt? Repellendus eius quisquam molestias,
        reprehenderit veniam architecto ducimus excepturi fugit delectus at
        minima incidunt ipsam sequi deserunt quis inventore nisi minus quae
        porro odit possimus iure? Modi facere commodi omnis ducimus.
      </h1>
    </div>
  );
}

export default FontExample;
