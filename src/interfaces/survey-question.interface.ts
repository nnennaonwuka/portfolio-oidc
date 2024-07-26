export interface SurveyQuestion {
  survey_question_id: string;
  survey_config_id: string;
  order: number;
  name: string;
  question: string;
  options: string;
  type: string;
  input_regex:string;
  pre_question_id?: string;
  pre_question_value?: string;
  comparator?: string;
}
