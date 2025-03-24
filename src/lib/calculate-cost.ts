import { config } from "@/config";

export type Cost = {
  payed: number;
  cash: number;
  commision: number;
};

export const calculateCost = (
  deliveryService: string,
  total: string | number,
): Cost => {
  const { ukr, nova } = config.deliveryCost;

  if (deliveryService.includes("ukr")) {
    return {
      payed: ukr.price,
      cash: Math.floor(ukr.price + ukr.commision + +total * 0.02),
      commision: Math.floor(ukr.commision + +total * 0.02),
    };
  }

  if (deliveryService.includes("nova")) {
    return {
      payed: nova.price,
      cash: Math.floor(nova.price + nova.commision + +total * 0.02),
      commision: Math.floor(nova.commision + +total * 0.02),
    };
  }

  return { payed: -1, cash: -1, commision: -1 };
};
