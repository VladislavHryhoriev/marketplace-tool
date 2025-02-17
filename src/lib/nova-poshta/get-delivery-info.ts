import { TrackingData } from "../types/novaposhta";

export const getDeliveryInfo = (data: TrackingData) => ({
  time: data.ActualDeliveryDate.split(" ")[1]?.slice(0, 5),
  date: {
    full: data.ActualDeliveryDate.split(" ")[0],
    day: data.ActualDeliveryDate.split(" ")[0].split("-")[2],
    month: data.ActualDeliveryDate.split(" ")[0].split("-")[1],
    year: data.ActualDeliveryDate.split(" ")[0].split("-")[0],
  },
  return: {
    full: data.DateReturnCargo,
    day: data.DateReturnCargo?.split("-")[2],
    month: data.DateReturnCargo?.split("-")[1],
    year: data.DateReturnCargo?.split("-")[0],
  },
  get dateTemplate() {
    if (!this.date.day || !this.date.month || !this.date.year) return "";
    return `${this.date.day}.${this.date.month}.${this.date.year}`;
  },
  get returnTemplate() {
    if (!this.return.day || !this.return.month || !this.return.year) return "";
    return `${+this.return.day - 1}.${this.return.month}.${this.return.year}`;
  },
});
