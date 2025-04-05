import {
  ArrowLeftFromLine,
  Ban,
  CalendarClock,
  Check,
  ClockFading,
  PhoneMissed,
  PhoneOff,
} from "lucide-react";
import { TEMPLATES } from "./TEMPLATES";

const BUTTONS_CONFIG = [
  {
    type: TEMPLATES.missedCall,
    icon: <PhoneMissed className="text-red-400" />,
    label: "Недозвон",
  },
  {
    type: TEMPLATES.autoconfirm,
    icon: <Check className="text-green-400" />,
    label: "Автоподтверждение",
  },
  {
    type: TEMPLATES.confirmWithoutCall,
    icon: <PhoneOff className="text-yellow-400" />,
    label: "Подтверждение без звонка",
  },
  {
    type: TEMPLATES.uncollected,
    icon: <ClockFading className="text-blue-400" />,
    label: "Не забирает заказ",
  },
  {
    type: TEMPLATES.notReceived,
    icon: <Ban className="text-red-400" />,
    label: "Не забрал",
  },
  {
    type: TEMPLATES.returnOrder,
    icon: <ArrowLeftFromLine className="text-fuchsia-400" />,
    label: "Возврат товара",
  },
  {
    type: TEMPLATES.temp,
    icon: <CalendarClock className="text-white" />,
    label: "Temp",
  },
] as const;

export default BUTTONS_CONFIG;
