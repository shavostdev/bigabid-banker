import axios from "axios";
import { baseUrl } from "../constans";

export const getCampaign = async (): Promise<Array<object> | []> => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/getCampaigns`);
    if (data?.status === "OK") {
      return data?.data;
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getAllBids = async (
  campaign: string
): Promise<Array<object> | []> => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/getAllBids`, {
      campaign,
    });
    if (data?.status === "OK") {
      return data?.data;
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
    return [];
  }
};
