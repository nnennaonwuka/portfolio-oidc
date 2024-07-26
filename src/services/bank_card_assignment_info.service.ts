import { EntityRepository, getConnection, getRepository, Repository } from "typeorm";
import BankCardAssignmentInfo from "@entities/bank_card_assignment_info.entity";
import BankCardAssignmentInfoInterface from "@interfaces/bank_card_assignment_info.interface";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";
import {
  getAllCardData,
  getNames,
  getReplacedCardData,
  isValidArray,
  isValidSortArray,
  search,
  sortData,
  verifyHub,
} from "@/helpers/prepaid_card_portal.helper";

@EntityRepository(BankCardAssignmentInfo)
class BankCardAssignmentInfoService extends Repository<BankCardAssignmentInfo> {
  public async synchronizeDown(
    last_sync_time: string,
    entity_id: string
  ): Promise<BankCardAssignmentInfoInterface[]> {
    try {
      //Check if service can be accessed by entity id passed
      const entityGroups = [CONSTANTS.SHP_Member_Success];

      const entityArr = await getEntityArray(entityGroups);

      if (entity_id && !entityArr.includes(entity_id.trim())) {
        return [];
      }

      const givenSyncTime = new Date(last_sync_time).toISOString();
      const BankCardAssignmentInfos: BankCardAssignmentInfoInterface[] =
        await BankCardAssignmentInfo.createQueryBuilder("table")
          .select()
          .where("table.updated_at >= :givenSyncTime", { givenSyncTime })
          .getMany();
      return BankCardAssignmentInfos;
    } catch (err) {
      throw err;
    }
  }

  public async synchronizeUp(
    BankCardAssignmentInfos: BankCardAssignmentInfo[]
  ): Promise<Array<{}>> {
    const repository = getRepository(BankCardAssignmentInfo);
    const updatedData = await Promise.all(
      BankCardAssignmentInfos.map(async (eachAssignmentInfo) => {
        try {
          const existingRecord = await repository.findOne({
            where: {
              unique_entity_id: eachAssignmentInfo.unique_entity_id,
              bank_card_id: eachAssignmentInfo.bank_card_id,
            },
          });

          if (existingRecord) {
            await repository.update(
              {
                unique_entity_id: eachAssignmentInfo.unique_entity_id,
                bank_card_id: eachAssignmentInfo.bank_card_id,
              },
              {
                entity_id: eachAssignmentInfo.entity_id,
                staff_id: eachAssignmentInfo.staff_id,
                pan: eachAssignmentInfo.pan,
                expiry_date: eachAssignmentInfo.expiry_date,
                assigned_date: eachAssignmentInfo.assigned_date,
                ik_number: eachAssignmentInfo.ik_number,
                bg_card_number: eachAssignmentInfo.bg_card_number,
                app_version: eachAssignmentInfo.app_version,
                imei: eachAssignmentInfo.imei,
                card_holder_image: eachAssignmentInfo.card_holder_image,
                card_image: eachAssignmentInfo.card_image,
                item_id: eachAssignmentInfo.item_id,
                item_info: eachAssignmentInfo.item_info,
                leader_presence_flag: eachAssignmentInfo.leader_presence_flag,
                portal_card_status: eachAssignmentInfo.portal_card_status,
                replacement_reason: eachAssignmentInfo.replacement_reason,
                status: eachAssignmentInfo.status,
              }
            );

            return {
              unique_entity_id: eachAssignmentInfo.unique_entity_id,
              bank_card_id: eachAssignmentInfo.bank_card_id,
              status: 1,
              message: "Item was successfully updated",
            };
          } else {
            await BankCardAssignmentInfo.save(eachAssignmentInfo);

            return {
              unique_entity_id: eachAssignmentInfo.unique_entity_id,
              bank_card_id: eachAssignmentInfo.bank_card_id,
              status: 1,
              message: "Item was successfully inserted",
            };
          }
        } catch (err) {
          return {
            unique_entity_id: eachAssignmentInfo.unique_entity_id,
            bank_card_id: eachAssignmentInfo.bank_card_id,
            status: 0,
            message: err.message,
          };
        }
      })
    );

    return updatedData;
  }

  public async getStatusStats() {
    try {
      const data = await getConnection().query(` 
      SELECT 
    CAST((SELECT COUNT(*) FROM bank_card_assignment_info WHERE status = '1' AND (item_id IS NULL OR item_id IN ('DI_00034', 'DI_0001'))) AS INT) AS all_cards,
    CAST((SELECT COUNT(*) FROM bank_card_assignment_info WHERE status = '1' AND portal_card_status = '0' AND (item_id IS NULL OR item_id IN ('DI_00034', 'DI_0001'))) AS INT) AS unverified_cards,
    CAST((SELECT COUNT(*) FROM bank_card_assignment_info WHERE status = '1' AND portal_card_status = '1' AND (item_id IS NULL OR item_id IN ('DI_00034', 'DI_0001'))) AS INT) AS verified_cards,
    CAST((SELECT COUNT(*) FROM bank_card_assignment_info WHERE status = '1' AND portal_card_status = '2' AND (item_id IS NULL OR item_id IN ('DI_00034', 'DI_0001'))) AS INT) AS unresolved_cards,
    CAST((SELECT COUNT(*) FROM hr_prepaid_cards_entity) AS INT) AS preloaded_cards;
  
    `);

      return [
        { state: 1, message: "Card stats gotten sucessfuly", status: 200 },
        {
          all_cards: data[0].all_cards,
          unverified_cards: data[0].unverified_cards,
          verified_cards: data[0].verified_cards,
          unresolved_cards: data[0].unresolved_cards,
          preloaded_cards: data[0].preloaded_cards,
        },
      ];
    } catch (err) {
      return [{ state: 0, message: err.message, status: 500 }];
    }
  }

  public async getCards(
    page: string,
    page_size: string,
    status: string,
    searchString: string,
    sort: string
  ) {
    try {
      if (!page_size) page_size = "20";
      if (!page) page = "1";
      const pageNumber = parseInt(page);
      const pageSizeNumber = parseInt(page_size);
      const offset = (pageNumber - 1) * pageSizeNumber;

      let statusClause = "";
      const mainQuery = `
      SELECT unique_entity_id, bank_card_id, ik_number, bg_card_number AS card_id, pan AS card_pan, portal_card_status AS status, staff_id AS issuer_id 
      FROM bank_card_assignment_info
      WHERE status = '1'AND (item_id IS NULL OR item_id IN ('DI_00034', 'DI_0001'))`;
      if (status) {
        const statusArray = status.split(",").map(Number);
        if (!isValidArray(statusArray)) {
          return [{ state: 0, message: "Invalid card status", status: 400 }];
        }
        statusClause = `AND portal_card_status IN (${statusArray
          .map((num) => `'${num}'`)
          .join(",")})`;
      }

      if (!searchString && !sort) {
        const allDataQuery = await getConnection().query(`
        ${mainQuery} ${statusClause}
        OFFSET ${offset}
        LIMIT ${pageSizeNumber};
      `);
        if (allDataQuery.length === 0)
          return [{ state: 1, message: "No data found", status: 200 }, []];

        const names = await getNames(allDataQuery);
        const totalRows = await getConnection().query(`
        SELECT COUNT(*) AS count FROM bank_card_assignment_info WHERE status = '1' 
        AND (item_id IS NULL OR item_id IN ('DI_00034', 'DI_0001'))`);
        const totalPages = Math.ceil(totalRows[0].count / pageSizeNumber);

        return [
          { state: 1, message: "Cards gotten sucessfully", status: 200 },
          {
            totalPages,
            currentPage: pageNumber,
            data: names,
          },
        ];
      }

      const allDataQuery = await getConnection().query(`
        ${mainQuery} ${statusClause};
      `);

      if (allDataQuery.length === 0)
        return [{ state: 1, message: "No data found", status: 200 }, []];

      const names = await getNames(allDataQuery);

      let data: string[] = names;

      if (searchString) {
        data = search(names, searchString);
      }

      if (sort) {
        const sortArray = sort.split(",");
        if (!isValidSortArray(sortArray)) {
          return [
            { state: 0, message: "Invalid sorting parameter", status: 400 },
          ];
        }
        data = sortData(data, sortArray);
      }

      const totalRows = data.length;
      const totalPages = Math.ceil(totalRows / pageSizeNumber);

      // Apply pagination logic in the code
      const paginatedData = data.slice(offset, offset + pageSizeNumber);

      return [
        { state: 1, message: "Cards gotten sucessfully", status: 200 },
        {
          totalPages,
          currentPage: pageNumber,
          data: paginatedData,
        },
      ];
    } catch (error) {
      return [{ state: 0, message: error.message, status: 500 }];
    }
  }

  public async getCardDetails(
    hub: string,
    unique_entity_id: string,
    bank_card_id: string, 
    status:string

  ) {
    try {
      const hubExists = await verifyHub(hub)
      if (!hubExists) {
        return [{ state: 0, message: "Card not found", status: 404 }, null];
      }
      const cardData = await getConnection().query(`
  SELECT * 
  FROM bank_card_assignment_info 
  WHERE unique_entity_id = '${unique_entity_id}' 
  AND bank_card_id = '${bank_card_id}'
  `);
      if (cardData.length == 0) {
        return [{ state: 0, message: "Card not found", status: 404 }, null];
      }
      if (cardData[0].portal_card_status !== status) {
        return [{ state: 0, message: "Card not found", status: 404 }, null];
      }
      const ik_number =cardData[0].ik_number
      const cardHistory = await getConnection().query(`
    SELECT *
    FROM bank_card_assignment_info
    WHERE ik_number = '${ik_number}'
    ORDER BY created_at DESC
    OFFSET 1
    LIMIT 1
  `);

      if ((cardData[0].item_id = "DI_00034")) {
        const cardDetails = await getReplacedCardData(
          cardData,
          ik_number,
          hub,
          cardHistory
        );
        return [
          { state: 1, message: "Card details gotten sucessfuly", status: 200 },
          cardDetails,
        ];
      }
      const verifiedCardData = await getConnection().query(`
  SELECT bca.*, bcv.bg_card_id, bcv.staff_id as verifier_id, bcv.error_id, bcv.error_log_date,bcv.error_message, bcv.created_at as verification_date
    FROM bank_card_assignment_info AS bca
    LEFT JOIN bank_card_verification_entity AS bcv ON bcv.ik_number= bca.ik_number  
    WHERE bca.unique_entity_id = '${unique_entity_id}' 
    AND bca.bank_card_id = '${bank_card_id}'
    ORDER BY created_at DESC
    LIMIT 1
  `);

      const cardDetails = await getAllCardData(
        verifiedCardData,
        ik_number,
        hub,
        cardHistory
      );

      return [
        { state: 1, message: "Card details gotten sucessfuly", status: 200 },
        cardDetails,
      ];
    } catch (err) {
      return [{ state: 0, message: err.message, status: 500 }];
    }
  }
}

export default BankCardAssignmentInfoService;
