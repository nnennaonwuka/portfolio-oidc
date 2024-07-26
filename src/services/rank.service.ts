import axios from "axios";

class RankService {
  //sync down functionality
  public async downloadRankList(
    staff_id: string,
    last_sync_time: string,
    hub_id: string,
    operator_id: string
  ) {
    try {
      const { data } = await axios.get(
        `${process.env.FARMING_BASE_URL}/rank/download?staff_id=${staff_id}&last_sync_time=${last_sync_time}&hub_id=${hub_id}&operator_id=${operator_id}`
      );
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default RankService;
