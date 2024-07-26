import { EntityRepository, getConnection, Repository } from "typeorm";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";
import HrPrepaidCardsEntity from "@/entities/hr_prepaid_cards.entity";
@EntityRepository()
class HrPrepaidCardsService extends Repository<HrPrepaidCardsEntity> {
  //sync up functionality
  public async uploadCards() {}

  //sync down functionality
  public async downloadCards(last_sync_time: string, entity_id: string) {
    try {
      const lastDownloadTime = new Date(last_sync_time).toISOString();

      //Check if service can be accessed by entity id passed
      const entityGroups = [CONSTANTS.SHP_Member_Success];

      const entityArr = await getEntityArray(entityGroups);

      if (entity_id && !entityArr.includes(entity_id.trim())) {
        return [];
      }

      const data = await HrPrepaidCardsEntity.createQueryBuilder("table")
        .select()
        .where("table.updated_at >= :lastDownloadTime", { lastDownloadTime })
        .getMany();

      return data;
    } catch (err) {
      throw err;
    }
  }

  public async getAllCards(
    page: string,
    page_size: string,
    type: string,
    search: string,
    sort: string
  ) {
    if (!page_size) page_size = "20";
    if (!page) page = "1";
    const pageNumber = parseInt(page);
    const pageSizeNumber = parseInt(page_size);
    const offset = (pageNumber - 1) * pageSizeNumber;

    let extraClause = "";
    if (type) extraClause = `WHERE card_assignmnet_flag = ${type};`;

    if (!search && !sort) {
      const cardData = await getConnection().query(`
        SELECT *, card_assignment_flag AS status
        FROM hr_prepaid_cards_entity ${extraClause}
        OFFSET ${offset}
        LIMIT ${pageSizeNumber}`);
      if (cardData.length == 0)
        return [{ state: 1, message: "No data not found", status: 200 }, null];

      const totalRows = await getConnection().query(
        "SELECT COUNT(*) AS count FROM hr_prepaid_cards_entity"
      );
      const totalPages = Math.ceil(totalRows[0].count / pageSizeNumber);
      return [
        { state: 1, message: "Cards gotten sucessfully", status: 200 },
        {
          totalPages,
          currentPage: pageNumber,
          data: cardData,
        },
      ];
    }

    const cardData = await getConnection().query(`
        SELECT * 
        FROM hr_prepaid_cards_entity ${extraClause}
       `);
    if (cardData.length == 0)
      return [{ state: 1, message: "No data not found", status: 200 }, []];

    let data: [] = cardData;
    if (search) {
      // data = search(names, searchString);
    }

    if (sort) {
      if (sort !== "1" && sort !== "0") {
        return [
          { state: 0, message: "Invalid sorting parameter", status: 400 },
        ];
      }
      // data = sortData(data, sortArray);
    }
    const totalRows = data.length;
    const totalPages = Math.ceil(totalRows / pageSizeNumber);

    const paginatedData = data.slice(offset, offset + pageSizeNumber);

    return [
      { state: 1, message: "Cards gotten sucessfully", status: 200 },
      {
        totalPages,
        currentPage: pageNumber,
        data: paginatedData,
      },
    ];
  }
}

export default HrPrepaidCardsService;
