import {
  useEffect,
  useState,
  FC,
  EffectCallback,
  useRef,
  MutableRefObject,
} from "react";
import Loader from "../components/Loader/Loader";
import Select from "../components/Select/Select";
import Bids from "../components/Bids/Bids";
import { getCampaign } from "../api";
import { room } from "../constans";
import { Data } from "../constans/interfaces";
import { socket } from "../services/socketConfig";
import { SelectOptions } from "./interfaces";
import "./Home.css";

const Home: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectOptions, setSelectOptions] = useState<SelectOptions | []>([]);
  const [bidsData, setBidsData] = useState<Array<Data> | []>([]);
  const bidsDataClone: MutableRefObject<Array<Data>> = useRef([]);

  const fetchData = async (): Promise<void> => {
    socket.emit("join", room);
    socket.on("sendBids", (data) => handleNewData(data));
    try {
      setIsLoading(true);
      const response: SelectOptions | [] = await getCampaign();
      setSelectOptions(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleNewData = (data: Data): void => {
    if(data === null) return setBidsData([]);
    const findIndex = bidsData.findIndex((bid) => bid.id === data.id);
    const newValues: Array<Data> | [] = [...bidsDataClone.current];
    if (findIndex !== -1) {
      newValues[findIndex] = data;
      setBidsData(newValues);
    } else {
      newValues.push(data);
      setBidsData(newValues);
    }
  };

  const cleanUp: EffectCallback = (): void => {
    setIsLoading(false);
    setSelectOptions([]);
    socket.off("getBids");
  };

  const init: EffectCallback = (): any => {
    fetchData();
    return cleanUp;
  };

  const bidsChangeListener: EffectCallback = (): void => {
    bidsDataClone.current = bidsData;
  };

  useEffect(init, []);

  useEffect(bidsChangeListener, [bidsData]);

  return (
    <div className="Home">
      <h1>Bigabid Banker</h1>
      <Select selectOptions={selectOptions} setBidsData={setBidsData} />
      <div className="bids-wrapper">
        <Bids bidsData={bidsData} />
      </div>
      {/* App Loader */}
      {isLoading ? <Loader /> : <></>}
    </div>
  );
};

export default Home;
