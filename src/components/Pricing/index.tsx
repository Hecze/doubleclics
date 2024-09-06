"use client";
import { useState, useEffect } from "react";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import { useTranslations } from "next-intl";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [currency, setCurrency] = useState("PEN"); // Estado para la moneda
  const [exchangeRates, setExchangeRates] = useState({
    PEN: 1,   // Sol peruano como referencia
    BRL: 0.82,
    USD: 0.27,
    CNY: 1.92,
    BTC: 0.0000075
  });
  const [btcPriceUSD, setBtcPriceUSD] = useState(0); // Precio del Bitcoin en USD
  const t = useTranslations("pricing");

  // Función para obtener y guardar tipos de cambio en el localStorage
  const fetchAndStoreExchangeRates = async () => {
    try {
      const response = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=d81f9a6bc19d4354b66f7915c12e3e84`
      );
      const data = await response.json();

      const bitcoinResponse = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
      );
      const bitcoinData = await bitcoinResponse.json();
      const bitcoinUSD = bitcoinData.bitcoin.usd;

      const newExchangeRates = {
        PEN: 1,
        BRL: data.rates.BRL / data.rates.PEN,
        USD: data.rates.USD / data.rates.PEN,
        CNY: data.rates.CNY / data.rates.PEN,
        BTC: bitcoinUSD
      };

      // Guardar los datos y la fecha en el localStorage
      const exchangeRateData = {
        rates: newExchangeRates,
        btcPriceUSD: bitcoinUSD,
        timestamp: Date.now() // Guardar la fecha actual
      };

      localStorage.setItem("exchangeRates", JSON.stringify(exchangeRateData));

      setExchangeRates(newExchangeRates);
      setBtcPriceUSD(bitcoinUSD);
    } catch (error) {
      console.error("Error al obtener los tipos de cambio:", error);
    }
  };

  // Verificar si necesitamos actualizar los tipos de cambio (cada 30 días)
  useEffect(() => {
    const storedData = localStorage.getItem("exchangeRates");

    if (storedData) {
      const { rates, btcPriceUSD, timestamp } = JSON.parse(storedData);

      // Verificar si han pasado más de 30 días (2592000000 ms)
      const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
      const currentTime = Date.now();

      if (currentTime - timestamp < THIRTY_DAYS_MS) {
        // Usamos los datos almacenados en el localStorage
        setExchangeRates(rates);
        setBtcPriceUSD(btcPriceUSD);
        return;
      }
    }

    // Si no hay datos o si han pasado más de 30 días, llamamos a la API
    fetchAndStoreExchangeRates();
  }, []);

  // Función para cambiar el símbolo de la moneda
  const currencySymbols = {
    PEN: "S/",
    BRL: "R$",
    USD: "$",
    CNY: "¥",
    BTC: "₿"
  };

  // Función para calcular el precio en la moneda seleccionada
  const convertPrice = (price) => {
    if (currency === "BTC") {
      const priceInUSD = price * exchangeRates.USD; // Convertimos de Soles a USD
      const priceInBTC = priceInUSD / btcPriceUSD; // Convertimos de USD a BTC
      return priceInBTC.toFixed(7); // Mostramos hasta 7 decimales para Bitcoin
    }
    return (price * exchangeRates[currency]).toFixed(2); // Para las demás monedas, 2 decimales
  };

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 ">
      <div className="container">
        <SectionTitle
          title={t("title")}
          paragraph={t("subtitle")}
          center
          width="665px"
        />

        <div className="w-full flex flex-wrap md:mb-12 lg:mb-16 justify-center mb-8 gap-12">
          <div className="flex">
            <span
              onClick={() => setIsMonthly(true)}
              className={`${isMonthly ? "pointer-events-none text-primary" : "text-dark dark:text-white"} mr-4 cursor-pointer text-base font-semibold`}
            >
              {t("time.monthly")}
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
                <div
                  className={`${isMonthly ? "" : "translate-x-full"} shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`${isMonthly ? "text-dark dark:text-white" : "pointer-events-none text-primary"} ml-4 cursor-pointer text-base font-semibold`}
            >
              {t("time.yearly")}
            </span>

            {/* Desplegable para seleccionar la moneda */}

          </div>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className=" p-2 mx-6 border rounded-md"
          >
            <option value="PEN">PEN (S/)</option>
            <option value="BRL">BRL (R$)</option>
            <option value="USD">USD ($)</option>
            <option value="CNY">CNY (¥)</option>
            <option value="BTC">BTC (₿)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <PricingBox
            packageName={t("plans.0.title")}
            price={convertPrice(isMonthly ? 40 : 120)}
            duration={isMonthly ? "mo" : "yr"}
            currency={currencySymbols[currency]}
            subtitle={t("plans.0.description")}
          >
            <OfferList text={t("plans.0.features.0")} status="active" />
            <OfferList text={t("plans.0.features.1")} status="active" />
            <OfferList text={t("plans.0.features.2")} status="active" />
          </PricingBox>
          <PricingBox
            packageName={t("plans.1.title")}
            price={convertPrice(isMonthly ? 399 : 789)}
            duration={isMonthly ? "mo" : "yr"}
            currency={currencySymbols[currency]}
            subtitle={t("plans.1.description")}
          >
            <OfferList text={t("plans.1.features.0")} status="active" />
            <OfferList text={t("plans.1.features.1")} status="active" />
            <OfferList text={t("plans.1.features.2")} status="active" />
          </PricingBox>
          <PricingBox
            packageName={t("plans.2.title")}
            price={convertPrice(isMonthly ? 589 : 999)}
            duration={isMonthly ? "mo" : "yr"}
            currency={currencySymbols[currency]}
            subtitle={t("plans.2.description")}
          >
            <OfferList text={t("plans.2.features.0")} status="active" />
            <OfferList text={t("plans.2.features.1")} status="active" />
            <OfferList text={t("plans.2.features.2")} status="active" />
          </PricingBox>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
