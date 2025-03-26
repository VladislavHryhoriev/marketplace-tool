import { IOrderTemplate } from "@/lib/types/types";

const emptyOrder: { order: IOrderTemplate; success: boolean } = {
  order: {
    id: -1,
    recipient: { name: "", phone: "" },
    user: { name: "", phone: "" },
    products: [],
    address: "",
    deliveryName: "",
    ttn: "",
    amount: "-1",
    paymentType: "cash",
    paymentTypeName: "",
  },
  success: false,
};

export default emptyOrder;
