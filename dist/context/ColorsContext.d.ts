import React from "react";
import { ColorsActionType, ColorsType } from "../types/ColorsType";
export declare const ColorsProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare function useColors(): ColorsType;
export declare function useColorsDispatch(): React.Dispatch<ColorsActionType>;
