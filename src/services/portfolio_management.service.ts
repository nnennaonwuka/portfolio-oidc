import { PortfolioManagementAssignmentEntity } from "@/entities/porfolio-management.entity";
import { PortfolioManagement } from "@/interfaces/portfolio-management.interface";
import { EntityRepository, getConnection, Repository } from "typeorm";

@EntityRepository()
class PortfolioManagementAssignmentService extends Repository<PortfolioManagementAssignmentEntity> {
  //sync down logic
  public async syncDownPortfolioManagementAssignment(
    last_sync_time: string,
    staff_id: string | null = null,
    hub_id: string
  ): Promise<PortfolioManagement[]> {
    const lastDownload = new Date(last_sync_time).toISOString();
    const staffCondition = staff_id
      ? `OR (pco = '${staff_id}' OR pcs = '${staff_id}')`
      : "";

    const downloadables = await getConnection().query(
      `
                SELECT * FROM "portfolio_management_assignment_entity" 
                WHERE 
                    "updated_at" >= TIMESTAMP '${lastDownload}' AND 
                    (hub = '${hub_id}' ${staffCondition})
            `
    );

    return downloadables;
  }

  //download defaulting trust groups
  public async downloadTgs(
    staff_id: string | null = null
  ): Promise<PortfolioManagement[]> {
    const downloadables = await getConnection().query(
      `
                SELECT ik_number FROM "portfolio_management_assignment_entity" 
                WHERE pco = '${staff_id}' OR pcs = '${staff_id}'
            `
    );
    const ikNumbers = downloadables.map((item) => item.ik_number);

    return ikNumbers;
  }

  //download pcs assignment
  public async downloadPcos(
    staff_id: string | null = null
  ): Promise<PortfolioManagement[]> {
    const downloadables = await getConnection().query(
      `
                SELECT DISTINCT pco FROM "portfolio_management_assignment_entity" 
                WHERE pcs = '${staff_id}'
            `
    );
    const staffIds = downloadables.map((item) => item.pco);

    return staffIds;
  }
}

export default PortfolioManagementAssignmentService;
