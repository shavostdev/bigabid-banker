import { FC } from "react";
import { Props } from "./interfaces";
import BidsList from "./List/BidsList";
import BidsStats from "./Stats/BidsStats";
import { Data } from "src/constans/interfaces";
import "./Bids.css";

const Bids: FC<Props> = ({ bidsData }): JSX.Element => {
  return (
    <div className="bids">
      <BidsList bidsData={bidsData} />
      <BidsStats
        bidsStatus={
          bidsData?.length ? bidsData.map((bid: Data) => bid?.status) : []
        }
      />
    </div>
  );
};

export default Bids;
