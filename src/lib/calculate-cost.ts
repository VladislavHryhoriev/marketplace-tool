import { config } from "@/config";

export const calculateCost = (
  deliveryService: string,
  total: string | number,
) => {
  const { ukr, nova } = config.deliveryCost;
  if (deliveryService.includes("ukr")) {
    return {
      payed: ukr.price,
      cod: Math.floor(ukr.price + ukr.commision + +total * 0.02),
      commision: Math.floor(ukr.commision + +total * 0.02),
    };
  }

  if (deliveryService.includes("nova")) {
    return {
      payed: nova.price,
      cod: Math.floor(nova.price + nova.commision + +total * 0.02),
      commision: Math.floor(nova.commision + +total * 0.02),
    };
  }

  return { payed: -1, cod: -1, commision: -1 };
};
