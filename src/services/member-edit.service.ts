import { EntityRepository, Repository } from "typeorm";
import { MemberEditDto } from "@dtos/member-edit.dto";
import { MemberEditEntity } from "@entities/member-edit.entity";
import { HttpException } from "@exceptions/HttpException";
import { MemberEdit } from "@interfaces/member-edit.interface";
import { isEmpty } from "@utils/util";

@EntityRepository()
class MemberEditService extends Repository<MemberEditEntity> {
  //sync up functionality
  public async updateMemberEditList(memberEditData): Promise<MemberEdit[]> {
    if (memberEditData.length === 0)
      throw new HttpException(400, "MemberEdit data is empty");

    const updatedData = await Promise.all(
      memberEditData.map(async (memberEditItem) => {
        try {
          await MemberEditEntity.save(memberEditItem);
          return {
            unique_member_id: memberEditItem.unique_member_id,
            status: 1,
          };
        } catch (err) {
          return {
            unique_member_id: memberEditItem.unique_member_id,
            status: 1,
            message: err.message,
          };
        }
      })
    );

    return updatedData;
  }

  //sync down functionality
  public async downloadMemberEditList(last_sync_time: string, hub_id: string) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    const memberEditRecordPerHubList =
      await MemberEditEntity.createQueryBuilder("table")
        .select()
        .where(
          "table.hub = :hub_id AND table.updated_at >= :lastDownloadTime",
          { hub_id, lastDownloadTime }
        )
        .getMany();

    return memberEditRecordPerHubList;
  }
}

export default MemberEditService;
