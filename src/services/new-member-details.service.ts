import { EntityRepository, Repository } from "typeorm";
import { NewMemberDetailsEntity } from "@entities/new-member-details.entity";
import { HttpException } from "@exceptions/HttpException";
import { NewMemberDetails } from "@interfaces/new-member-details.interface";
import { isEmpty } from "@utils/util";

@EntityRepository()
class NewMemberDetailsService extends Repository<NewMemberDetailsEntity> {
  //sync up functionality
  public async updateNewMemberDetailsList(
    newMemberDetailsData
  ): Promise<any[]> {
    if (newMemberDetailsData.length === 0)
      throw new HttpException(400, "NewMemberDetails data is empty");

    const updatedData = await Promise.all(
      newMemberDetailsData.map(async (newMemberDetailsItem) => {
        try {
          await NewMemberDetailsEntity.save(newMemberDetailsItem);
          return {
            new_member_details_id: newMemberDetailsItem.new_member_details_id,
            status: 1,
          };
        } catch (err) {
          return {
            new_member_details_id: newMemberDetailsItem.new_member_details_id,
            status: 0,
            message: err.message,
          };
        }
      })
    );

    return updatedData;
  }

  //sync down functionality
  public async downloadNewMemberDetailsList(
    last_sync_time: string,
    hub_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    const newMemberDetailsPerHubList =
      await NewMemberDetailsEntity.createQueryBuilder("table")
        .select()
        .where(
          "table.hub = :hub_id AND table.updated_at >= :lastDownloadTime",
          { hub_id, lastDownloadTime }
        )
        .getMany();

    return newMemberDetailsPerHubList;
  }
}

export default NewMemberDetailsService;
