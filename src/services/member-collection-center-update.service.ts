import { EntityRepository, Repository } from "typeorm";
import { MemberCollectionCenterUpdateDto } from "@dtos/member-collection-center-update.dto";
import { MemberCollectionCenterUpdateEntity } from "@entities/member-collection-center-update.entity";
import { HttpException } from "@exceptions/HttpException";
import { MemberCollectionCenterUpdate } from "@interfaces/member-collection-center-update.interface";
import { isEmpty } from "@utils/util";
import axios from "axios";

@EntityRepository()
class MemberCollectionCenterUpdateService extends Repository<MemberCollectionCenterUpdateEntity> {
  //sync up functionality
  public async updateMemberCollectionCenterUpdateList(
    MemberCollectionCenterUpdateData: MemberCollectionCenterUpdateDto[]
  ): Promise<MemberCollectionCenterUpdate[]> {
    if (MemberCollectionCenterUpdateData.length === 0)
      throw new HttpException(
        400,
        "MemberCollectionCenterUpdate data is empty"
      );

    const updatedData = [];

    for (const item of MemberCollectionCenterUpdateData) {
      if (item.unique_member_id) {
        const findExistingMemberCollectionCenterUpdate: MemberCollectionCenterUpdate =
          await MemberCollectionCenterUpdateEntity.findOne({
            where: {
              unique_member_id: item.unique_member_id,
            },
          });

        if (findExistingMemberCollectionCenterUpdate) {
          await MemberCollectionCenterUpdateEntity.update(
            {
              unique_member_id:
                findExistingMemberCollectionCenterUpdate.unique_member_id,
            },
            { ...item }
          );
          updatedData.push({
            unique_member_id: item.unique_member_id,
            status: 1,
          });
        } else {
          const createMemberCollectionCenterUpdate: MemberCollectionCenterUpdate =
            await MemberCollectionCenterUpdateEntity.create({
              ...item,
            }).save();
          updatedData.push({
            unique_member_id:
              createMemberCollectionCenterUpdate.unique_member_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadMemberCollectionCenterUpdateList(
    last_sync_time: string,
    staff_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    const result = await axios.get(
      `https://mkt-slim-dot-babbangona-prod.ey.r.appspot.com/api/v1/downloadAssignedTrustgroups?staff_id=${staff_id}`
    );

    const tgsArr = result.data || [];

    if (tgsArr.length === 0) return [];

    const memberCollectionCenterUpdatePerTG =
      await MemberCollectionCenterUpdateEntity.createQueryBuilder("table")
        .select()
        .where(
          "table.ik_number IN (:...tgsArr) AND table.updated_at >= :lastDownloadTime",
          { tgsArr, lastDownloadTime }
        )
        .getMany();

    return memberCollectionCenterUpdatePerTG;
  }
}

export default MemberCollectionCenterUpdateService;
