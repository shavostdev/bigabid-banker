import { FC, useState } from "react";
import Select from "react-select";
import { getAllBids } from "../../api";
import { Props, SelectInt } from "./interfaces";
import { socket } from "../../services/socketConfig";
import "./Select.css";

const CustomSelect: FC<Props> = ({
  selectOptions,
  setBidsData,
}): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<SelectInt | null>(null);

  const selectHandler = async (value: SelectInt | null): Promise<void> => {
    setSelectedOption(value);
    socket.emit("selectCampaign", value?.value);
    // const response: Array<any> | [] | any = await getAllBids(value?.value)
    // setBidsData(response)
  };
  return (
    <div className="Select-wrapper">
      <Select
        defaultValue={selectedOption}
        onChange={selectHandler}
        options={selectOptions}
        className="CustomSelect"
      />
    </div>
  );
};

export default CustomSelect;
