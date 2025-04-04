import {
  CalendarClock,
  CircleCheckBig,
  ClockArrowDown,
  PhoneMissed,
  PhoneOff,
  SquareChevronLeft,
} from "lucide-react";
import { TEMPLATES } from "./TEMPLATES";

const BUTTONS_CONFIG = [
  {
    type: TEMPLATES.missedCall,
    icon: <PhoneMissed />,
    label: "Недозвон",
  },
  {
    type: TEMPLATES.autoconfirm,
    icon: <CircleCheckBig />,
    label: "Автоподтверждение",
  },
  {
    type: TEMPLATES.confirmWithoutCall,
    icon: <PhoneOff />,
    label: "Подтверждение без звонка",
  },
  {
    type: TEMPLATES.uncollected,
    icon: <ClockArrowDown />,
    label: "Не забирает заказ",
  },
  {
    type: TEMPLATES.returnOrder,
    icon: <SquareChevronLeft />,
    label: "Возврат товара",
  },
  {
    type: TEMPLATES.temp,
    icon: <CalendarClock />,
    label: "Temp",
  },
] as const;

export default BUTTONS_CONFIG;
