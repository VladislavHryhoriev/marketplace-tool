export const TEMPLATES = {
  autoconfirm: "AUTOCONFIRM",
  missedCall: "MISSED_CALL",
  confirmWithoutCall: "CONFIRM_WITHOUT_CALL",
  uncollected: "UNCOLLECTED",
  notReceived: "NOT_RECEIVED",
  returnOrder: "RETURN_ORDER",
  temp: "TEMP",
} as const;

export type TemplateNames = (typeof TEMPLATES)[keyof typeof TEMPLATES];
