import api from "@/common/axios";
import _ from "lodash";

export type SampleRequest = {
  node_id: string;
  prnts_id: string;
  node_nm: string;
  _order: number;
};

const apiBaseUrl = "http://192.168.100.126:9010/route";

export const getCategoryList = async () => {
  return await api.get(`${apiBaseUrl}/meta/portal/api/getCategoryList`);
};
export const getDetail = async (params: any) => {
  const res: any = await api.post(
    `${apiBaseUrl}/common/portal/api/commonSelect`,
    params
  );
  return _.head(res.body) || {};
};
