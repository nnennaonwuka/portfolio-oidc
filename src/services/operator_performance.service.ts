import { EntityRepository, Repository} from "typeorm";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";
import { OperatorPerformanceEntity } from "@/entities/operator_performance.entity";

@EntityRepository()
class OperatorPerformanceService extends Repository<OperatorPerformanceEntity> {
  //sync up functionality
  public async updateOperatorPerformanceList(OperatorPerformanceData: OperatorPerformanceEntity[]): Promise<Array<{}>> {

    const updatedData = await Promise.all(
        OperatorPerformanceData.map(async eachoperator => {
          try {
                await OperatorPerformanceEntity.save(eachoperator);
                return {
                    operator_id: eachoperator.operator_id,
                    status: 1,
                    message: 'Item was successfully saved/updated',
                };
          }     catch (err) {
                return {
                    operator_id: eachoperator.operator_id,
                    status: 0,
                    message: err.message,
                };
          }
        }),
      );
    return updatedData;
  
  }

  //sync down functionality
  public async downloadOperatorPerformanceList(last_sync_time: string, hub_id: string, entity_id:string ) {
    try{
        const lastDownloadTime = new Date(last_sync_time).toISOString();

        //Check if service can be accessed by entity id passed
        const entityGroups = [CONSTANTS.SHP_SUPERVISOR];

        const entityArr = await getEntityArray(entityGroups);

        if (entity_id && !entityArr.includes(entity_id.trim())) {
        return [];
        }

        const data = await OperatorPerformanceEntity.createQueryBuilder('table')
        .select()
        .where('table.updated_at >= :lastDownloadTime AND table.hub_id = :hub_id', { lastDownloadTime, hub_id })
        .getMany();
   
        return data;
    }
    catch (err) {
        throw err;
    }
  }
}

export default OperatorPerformanceService;

