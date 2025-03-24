export const TEMPLATES = {
  autoconfirm: "AUTOCONFIRM",
  missedCall: "MISSED_CALL",
  confirmWithoutCall: "CONFIRM_WITHOUT_CALL",
  uncollected: "UNCOLLECTED",
} as const;

export type TemplateNames = (typeof TEMPLATES)[keyof typeof TEMPLATES];
