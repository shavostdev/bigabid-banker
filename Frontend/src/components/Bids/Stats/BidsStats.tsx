import { FC, useState, useEffect } from "react";
import { Props } from "./interfaces";
import "./BidsStats.css";

const BidsStats: FC<Props> = ({ bidsStatus }): JSX.Element => {
  const [stats, setStats] = useState<object | {}>({});

  const getStats = () => {
    const counts = {};
    bidsStatus.forEach((status) => {
      counts[status] = (counts[status] || 0) + 1;
    });
    setStats(counts);
  };

  useEffect(getStats, [bidsStatus]);

  return (
    <div className="bids-stats">
      <h2>Resolved Bids</h2>
      <div className="stats">
        <span className="wins">Wins : {stats?.[3] ?? 0}</span>
        <span className="loses">Loses : {stats?.[2] ?? 0}</span>
        <span className="errors">Errors : {stats?.[1] ?? 0}</span>
      </div>
    </div>
  );
};

export default BidsStats;
