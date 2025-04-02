import { TEpicentrSearchType } from "@/clients/epicentr/types";
import { TRozetkaSearchType } from "@/clients/rozetka/types";

export interface IConfig {
  fetchInterval: number;
  maxInputLength: number;
  rozetka: { tokenLifetime: number; searchType: TRozetkaSearchType };
  epicentr: { searchType: TEpicentrSearchType };
  botUserIds: { owner: number; ukrstore: number };
  deliveryCost: {
    nova: { price: number; commision: number };
    ukr: { price: number; commision: number };
  };
  interval: number;
}
