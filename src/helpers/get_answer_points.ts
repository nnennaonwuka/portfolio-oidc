import { getConnection } from "typeorm";

export const getSurveyAnsPoints = async (id: string, ans: string): Promise<string> => {
  try {
    const result = await getConnection().query(`
      SELECT value
      FROM portfolio_management_constants
      WHERE key = 'INSECURITY_SURVEY_ANS_POINTS'
    `);
    
    const surveyIdMappings = JSON.parse(result[0]?.value) || {};

    if (id === '211') {
      const options = ans.split(',').map(el => el.trim());
      const optionsPoints = {
        "Kidnapping": 5,
        "Herders attack": 4,
        "Robbery": 2
      };

      let totalPoint = 0;

      for (let option of options) {
        if (optionsPoints.hasOwnProperty(option)) {
          totalPoint += optionsPoints[option];
        }
      }

      return String(totalPoint);
    } 

    if (surveyIdMappings[id]) {
      if (surveyIdMappings[id].hasOwnProperty(ans)) {
        return surveyIdMappings[id][ans];
      } else {
        return surveyIdMappings[id]['default'] || 'Nil';
      }
    }
  } catch (err) {
    console.log(err.message);
    return 'Nil';
  }
};
