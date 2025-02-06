import { Button } from "@/components/ui/button";
import { TEMPLATE_TYPES } from "@/constants";
import { TemplateNames } from "@/lib/types";
import {
  CircleCheckBig,
  ClockArrowDown,
  PhoneMissed,
  PhoneOff,
} from "lucide-react";
import { useFetchOrderInfo } from "@/hooks/useFetchOrderInfo";

interface Props {
  inputTextOrder: string;
  setAreaTextOrder: (text: string) => void;
}

const buttonsConfig: {
  type: TemplateNames;
  icon: JSX.Element;
  label: string;
}[] = [
  {
    type: TEMPLATE_TYPES.missedCall,
    icon: <PhoneMissed />,
    label: "Недозвон",
  },
  {
    type: TEMPLATE_TYPES.autoconfirm,
    icon: <CircleCheckBig />,
    label: "Автоподтверждение",
  },
  {
    type: TEMPLATE_TYPES.confirmWithoutCall,
    icon: <PhoneOff />,
    label: "Подтверждение без звонка",
  },
  {
    type: TEMPLATE_TYPES.uncollected,
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
