import { config } from "@/config";

export const calculateCost = (
  deliveryService: string,
  total: string | number,
) => {
  if (deliveryService.includes("ukr")) {
    return {
      payed: config.deliveryCost.ukr,
      cod: Math.floor(config.deliveryCost.ukr + 10 + +total * 0.02),
      commision: Math.floor(10 + +total * 0.02),
    };
  }

  if (deliveryService.includes("nova")) {
    return {
      payed: config.deliveryCost.nova,
      cod: Math.floor(config.deliveryCost.nova + 20 + +total * 0.02),
      commision: Math.floor(20 + +total * 0.02),
    };
  }

  return { payed: 0, cod: 0, commision: 0 };
};
