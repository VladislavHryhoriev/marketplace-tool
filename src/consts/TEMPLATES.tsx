export const TEMPLATES = {
  autoconfirm: "AUTOCONFIRM",
  missedCall: "MISSED_CALL",
  uncollected: "UNCOLLECTED",
  confirmWithoutCall: "CONFIRM_WITHOUT_CALL",
} as const;

export type TemplateNames = (typeof TEMPLATES)[keyof typeof TEMPLATES];
