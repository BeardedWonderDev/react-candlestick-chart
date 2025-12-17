export type SMAPeriodType = {
    mode: "visibleRatio";
    value: number;
    min?: number;
    max?: number;
};
type SMAType = {
    enable?: boolean;
    source?: "close" | "open" | "high" | "low";
    period?: SMAPeriodType;
    stroke?: string;
    strokeWidth?: number;
};
export default SMAType;
