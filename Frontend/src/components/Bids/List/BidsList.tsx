import { FC, useMemo } from "react";
import { Props } from "./interfaces";
import Table from "./Table";
import "./BidsList.css";

const BidsList: FC<Props> = ({bidsData}): JSX.Element => {

  return (
    <div className="bids-list">
      <h2>Pending Bids</h2>
      {bidsData?.length ? <Table data={bidsData.filter(bid => bid.status === 0)} /> : <span className="no-data">No Data !</span>}
    </div>
  );
};

export default BidsList;
