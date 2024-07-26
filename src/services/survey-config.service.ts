import { EntityRepository, Repository } from "typeorm";
import { SurveyConfigDto } from "@dtos/survey-config.dto";
import { SurveyConfigEntity } from "@/entities/survey-config.entity";
import { HttpException } from "@exceptions/HttpException";
import { SurveyConfig } from "@interfaces/survey-config.interface";
import { isEmpty } from "@utils/util";

@EntityRepository()
class SurveyConfigService extends Repository<SurveyConfigEntity> {
  public async findAllSurveyConfigs(): Promise<SurveyConfig[]> {
    const SurveyConfigs: SurveyConfig[] = await SurveyConfigEntity.find();
    return SurveyConfigs;
  }

  public async findSurveyConfigById(
    SurveyConfigId: string
  ): Promise<SurveyConfig> {
    if (isEmpty(SurveyConfigId))
      throw new HttpException(400, "You're not a SurveyConfigId'");
    const surveyConfig: SurveyConfig = await SurveyConfigEntity.findOne({
      where: { survey_config_id: SurveyConfigId },
    });

    return surveyConfig;
  }

  public async createSurveyConfig(
    SurveyConfigData: SurveyConfigDto
  ): Promise<SurveyConfig> {
    if (isEmpty(SurveyConfigData))
      throw new HttpException(400, "You're not a SurveyConfigData");

    const surveyConfig: SurveyConfig = await SurveyConfigEntity.findOne({
      where: { survey_config_id: SurveyConfigData.survey_config_id },
    });
    if (surveyConfig)
      throw new HttpException(
        409,
        `The id ${surveyConfig.survey_config_id} already exists`
      );

    const newSurveyConfigData: SurveyConfig = await SurveyConfigEntity.create({
      ...SurveyConfigData,
    }).save();

    return newSurveyConfigData;
  }

  public async updateSurveyConfig(
    SurveyConfigId: string,
    SurveyConfigData: SurveyConfigDto
  ): Promise<SurveyConfig> {
    if (isEmpty(SurveyConfigData))
      throw new HttpException(400, "You're not a SurveyConfigData");

    const surveyConfig: SurveyConfig = await SurveyConfigEntity.findOne({
      where: { survey_config_id: SurveyConfigId },
    });
    if (!surveyConfig) throw new HttpException(409, "You're not SurveyConfig'");

    await SurveyConfigEntity.update(SurveyConfigId, { ...SurveyConfigData });

    const updatedSurveyConfig: SurveyConfig = await SurveyConfigEntity.findOne({
      where: { survey_config_id: SurveyConfigId },
    });
    return updatedSurveyConfig;
  }

  public async deleteSurveyConfig(
    SurveyConfigId: string
  ): Promise<SurveyConfig> {
    if (isEmpty(SurveyConfigId))
      throw new HttpException(400, "You're not SurveyConfigId");

    const surveyConfig: SurveyConfig = await SurveyConfigEntity.findOne({
      where: { survey_config_id: SurveyConfigId },
    });
    if (!surveyConfig) throw new HttpException(409, "You're not SurveyConfig");

    await SurveyConfigEntity.delete({ survey_config_id: SurveyConfigId });
    return surveyConfig;
  }

  //sync up functionality
  public async updateSurveyConfigList(
    SurveyConfigData: SurveyConfigDto[]
  ): Promise<SurveyConfig[]> {
    if (SurveyConfigData.length === 0)
      throw new HttpException(400, "SurveyConfig data is empty");

    const updatedData = [];

    for (const item of SurveyConfigData) {
      if (item.survey_config_id) {
        const findExistingSurveyConfig: SurveyConfig =
          await SurveyConfigEntity.findOne({
            where: { survey_config_id: item.survey_config_id },
          });

        if (findExistingSurveyConfig) {
          await SurveyConfigEntity.update(
            findExistingSurveyConfig.survey_config_id,
            { ...item }
          );
          updatedData.push({
            survey_config_id: item.survey_config_id,
            status: 1,
          });
        } else {
          const newSurveyConfig: SurveyConfig = await SurveyConfigEntity.create(
            { ...item }
          ).save();
          updatedData.push({
            survey_config_id: newSurveyConfig.survey_config_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadSurveyConfigList(last_sync_time: string) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    //Fetch Data from the tables
    const surveyConfig = await SurveyConfigEntity.createQueryBuilder("table")
      .select()
      .where("table.updated_at >= :lastDownloadTime", { lastDownloadTime })
      .getMany();

    return surveyConfig;
  }
}

export default SurveyConfigService;
