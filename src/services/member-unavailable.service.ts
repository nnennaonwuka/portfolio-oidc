import { EntityRepository, Repository } from "typeorm";
import { MemberUnavailableDto } from "@dtos/member-unavailable.dto";
import { MemberUnavailableEntity } from "@entities/member-unavailable.entity";
import { HttpException } from "@exceptions/HttpException";
import { MemberUnavailable } from "@interfaces/member-unavailable.interface";
import { isEmpty } from "@utils/util";
import axios from "axios";

@EntityRepository()
class MemberUnavailableService extends Repository<MemberUnavailableEntity> {
  //sync up functionality
  public async updateMemberUnavailableList(
    memberUnavailableData: MemberUnavailableDto[]
  ): Promise<any[]> {
    if (memberUnavailableData.length === 0)
      throw new HttpException(400, "MemberUnavailable data is empty");

    const updatedData = [];

    for (const item of memberUnavailableData) {
      if (item.member_unavailable_id) {
        const findExistingMemberUnavailable: MemberUnavailable =
          await MemberUnavailableEntity.findOne({
            where: { member_unavailable_id: item.member_unavailable_id },
          });

        if (findExistingMemberUnavailable) {
          await MemberUnavailableEntity.update(
            findExistingMemberUnavailable.member_unavailable_id,
            { ...item }
          );
          updatedData.push({
            member_unavailable_id: item.member_unavailable_id,
            status: 1,
          });
        } else {
          const createMemberUnavailable: MemberUnavailable =
            await MemberUnavailableEntity.create({ ...item }).save();
          updatedData.push({
            member_unavailable_id:
              createMemberUnavailable.member_unavailable_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadMemberUnavailableList(
    last_sync_time: string,
    staff_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    const result = await axios.get(
      `https://mkt-slim-dot-babbangona-prod.ey.r.appspot.com/api/v1/downloadAssignedTrustgroups?staff_id=${staff_id}`
    );

    const tgsArr = result.data || [];

    if (tgsArr.length === 0) return [];

    const memberUnavailableList =
      await MemberUnavailableEntity.createQueryBuilder("table")
        .select()
        .where(
          "table.ik_number IN (:...tgsArr) AND table.updated_at >= :lastDownloadTime",
          { tgsArr, lastDownloadTime }
        )
        .getMany();
    return memberUnavailableList;
  }
}

export default MemberUnavailableService;
