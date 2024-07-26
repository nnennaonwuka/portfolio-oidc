import { EntityRepository, Repository } from "typeorm";
import { FaqConfigDto } from "@dtos/faq-config.dto";
import { FaqConfigEntity } from "@entities/faq-config.entity";
import { HttpException } from "@exceptions/HttpException";
import { FaqConfig } from "@interfaces/faq-config.interface";
import { isEmpty } from "@utils/util";

@EntityRepository()
class FaqConfigService extends Repository<FaqConfigEntity> {
  public async findAllFaqConfig(): Promise<FaqConfig[]> {
    const FaqConfigs: FaqConfig[] = await FaqConfigEntity.find();
    return FaqConfigs;
  }

  public async findFaqConfigById(FaqConfigId: string): Promise<FaqConfig> {
    if (isEmpty(FaqConfigId))
      throw new HttpException(400, "You're not an FaqConfigId");

    const findFaqConfig: FaqConfig = await FaqConfigEntity.findOne({
      where: { faq_config_id: FaqConfigId },
    });
    if (!findFaqConfig) throw new HttpException(409, "You're not an FaqConfig");

    return findFaqConfig;
  }

  public async createFaqConfig(
    FaqConfigData: FaqConfigDto
  ): Promise<FaqConfig> {
    if (isEmpty(FaqConfigData))
      throw new HttpException(400, "You're not an FaqConfigData");

    const findFaqConfig: FaqConfig = await FaqConfigEntity.findOne({
      where: { faq_config_id: FaqConfigData.faq_config_id },
    });
    if (findFaqConfig)
      throw new HttpException(
        409,
        `The id ${FaqConfigData.faq_config_id} already exists`
      );

    const createFaqConfigData: FaqConfig = await FaqConfigEntity.create({
      ...FaqConfigData,
    }).save();

    return createFaqConfigData;
  }

  public async updateFaqConfig(
    FaqConfigId: string,
    FaqConfigData: FaqConfigDto
  ): Promise<FaqConfig> {
    if (isEmpty(FaqConfigData))
      throw new HttpException(400, "You're not an FaqConfigData");

    const findFaqConfig: FaqConfig = await FaqConfigEntity.findOne({
      where: { faq_config_id: FaqConfigId },
    });
    if (!findFaqConfig) throw new HttpException(409, "You're not an FaqConfig");

    await FaqConfigEntity.update(FaqConfigId, { ...FaqConfigData });

    const updateFaqConfig: FaqConfig = await FaqConfigEntity.findOne({
      where: { faq_config_id: FaqConfigId },
    });
    return updateFaqConfig;
  }

  public async deleteFaqConfig(FaqConfigId: string): Promise<FaqConfig> {
    if (isEmpty(FaqConfigId))
      throw new HttpException(400, "You're not FaqConfigId");

    const findFaqConfig: FaqConfig = await FaqConfigEntity.findOne({
      where: { faq_config_id: FaqConfigId },
    });
    if (!findFaqConfig) throw new HttpException(409, "You're not an FaqConfig");

    await FaqConfigEntity.delete({ faq_config_id: FaqConfigId });
    return findFaqConfig;
  }

  //sync up functionality
  public async updateFaqConfigList(
    FaqConfigData: FaqConfigDto[]
  ): Promise<FaqConfig[]> {
    if (FaqConfigData.length === 0)
      throw new HttpException(400, "FaqConfig data is empty");

    const updatedData = [];

    for (const item of FaqConfigData) {
      if (item.faq_config_id) {
        const findExistingFaqConfig: FaqConfig = await FaqConfigEntity.findOne({
          where: { faq_config_id: item.faq_config_id },
        });

        if (findExistingFaqConfig) {
          await FaqConfigEntity.update(findExistingFaqConfig.faq_config_id, {
            ...item,
          });
          updatedData.push({ faq_config_id: item.faq_config_id, status: 1 });
        } else {
          const createFaqConfig: FaqConfig = await FaqConfigEntity.create({
            ...item,
          }).save();
          updatedData.push({
            faq_config_id: createFaqConfig.faq_config_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadFaqConfigList(last_sync_time: string) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    const faqConfigList = await FaqConfigEntity.createQueryBuilder("table")
      .select()
      .where(" table.updated_at >= :lastDownloadTime", { lastDownloadTime })
      .getMany();

    return faqConfigList;
  }
}

export default FaqConfigService;
