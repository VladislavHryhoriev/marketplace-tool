import { Button } from "@/components/ui/button";
import { TEMPLATES } from "@/constants";
import { useFetchOrderInfo } from "@/hooks/useFetchOrderInfo";
import { TemplateNames } from "@/lib/types";
import {
  CircleCheckBig,
  ClockArrowDown,
  PhoneMissed,
  PhoneOff,
} from "lucide-react";

interface Props {
  inputTextOrder: string;
  setAreaTextOrder: (text: string) => void;
}

type ButtonConfig = { type: TemplateNames; icon: JSX.Element; label: string };

const buttonsConfig: ButtonConfig[] = [
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
];

const TemplateButtons = ({ inputTextOrder, setAreaTextOrder }: Props) => {
  const fetchOrderInfo = useFetchOrderInfo(setAreaTextOrder);

  return (
    <div className="mt-4 flex flex-col gap-2">
      {buttonsConfig.map(({ type, icon, label }) => (
        <Button key={type} onClick={() => fetchOrderInfo(type, inputTextOrder)}>
          {icon}
          {label}
        </Button>
      ))}
    </div>
  );
};

export default TemplateButtons;
