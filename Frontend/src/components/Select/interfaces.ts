import { Dispatch, SetStateAction } from "react";
import { Data } from "src/constans/interfaces";

export interface Props {
  selectOptions: object[];
  setBidsData: Function;
}

export interface SelectInt {
  label?: string;
  value?: string;
}
