export const calculateCost = (
  deliveryService: string,
  total: string | number,
) => {
  if (deliveryService.includes("ukr")) {
    return {
      payed: 45,
      cod: Math.floor(45 + 10 + +total * 0.02),
      commision: Math.floor(10 + +total * 0.02),
    };
  }

  if (deliveryService.includes("nova")) {
    return {
      payed: 80,
      cod: Math.floor(80 + 20 + +total * 0.02),
      commision: Math.floor(20 + +total * 0.02),
    };
  }

  return { payed: 0, cod: 0, commision: 0 };
};
