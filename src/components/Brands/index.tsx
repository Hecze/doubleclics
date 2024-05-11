"use client"
import React from "react";
import { Brand } from "@/types/brand";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import brandsData from "./brandsData";

const Brands = () => {
  const settings = {
    infinite: true,
    speed: 6000,
    slidesToShow: 5, // Cambia este número según cuántos elementos quieres mostrar simultáneamente
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10, // Controla la velocidad de avance automático
    cssEase: "linear", // Establece una transición lineal sin aceleración
    arrows: false, // Deshabilita las flechas
    swipe: false, // Deshabilita el movimiento del carrusel por el mouse
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="pt-16">
      <div className="container">
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl mb-8 ml-4">
          We work with
        </h3>
        <div className="px-12 ">
          <div className="bg-slate-200 dark:bg-slate-800 py-4 shadow">

            <Slider {...settings}>


              {brandsData.map((brand) => (
                <SingleBrand key={brand.id} brand={brand} />
              ))}

            </Slider>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, imageLight, name } = brand;

  return (
    <div className="px-3 py-[15px] min-h-[100px] flex justify-center align-center">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative w-full opacity-70 transition hover:opacity-100 dark:opacity-60 dark:hover:opacity-100 flex justify-center align-center">
        <Image src={imageLight} alt={name} width={100} height={100} className="hidden dark:block" />
      </a>
    </div>
  );
};
