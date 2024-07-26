import { EntityRepository, Repository } from "typeorm";
import { PortfolioMediaDto } from "@dtos/portfolio-media.dto";
import { PortfolioMediaEntity } from "@entities/portfolio-media.entity";
import { HttpException } from "@exceptions/HttpException";
import { PortfolioMedia } from "@interfaces/portfolio-media.interface";

@EntityRepository()
class PortfolioMediaService extends Repository<PortfolioMediaEntity> {
  //sync up functionality
  public async updatePortfolioMediaList(
    PortfolioMediaData: PortfolioMediaDto[]
  ): Promise<PortfolioMedia[]> {
    if (PortfolioMediaData.length === 0)
      throw new HttpException(400, "PortfolioMedia data is empty");

    const updatedData = [];

    for (const item of PortfolioMediaData) {
      if (item.portfolio_media_id) {
        const findExistingPortfolioMedia: PortfolioMedia =
          await PortfolioMediaEntity.findOne({
            where: { portfolio_media_id: item.portfolio_media_id },
          });

        if (findExistingPortfolioMedia) {
          await PortfolioMediaEntity.update(
            findExistingPortfolioMedia.portfolio_media_id,
            { ...item }
          );
          updatedData.push({
            portfolio_media_id: item.portfolio_media_id,
            status: 1,
          });
        } else {
          const createPortfolioMedia: PortfolioMedia =
            await PortfolioMediaEntity.create({ ...item }).save();
          updatedData.push({
            portfolio_media_id: createPortfolioMedia.portfolio_media_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadPortfolioMediaList(last_sync_time: string) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    // Fetch data from the table
    const portfolioMediaList = await PortfolioMediaEntity.createQueryBuilder(
      "table"
    )
      .select()
      .where("table.updated_at >= :lastDownloadTime", { lastDownloadTime })
      .getMany();

    return portfolioMediaList;
  }
}

export default PortfolioMediaService;
