import axios from "axios";

export const getTgs = async (staff_id: string): Promise<string[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.RECRUITMENT_BASE_URL}master-assignment/getAssignedTgs?staff_id=${staff_id}`
    );
    return data;
  } catch (err) {
    console.log(
      err.response?.status || 500,
      err.response?.data?.message || err.message
    );
    return [];
  }
};

export const getPcRoleTgAssignment = async (
  staff_id: string
): Promise<string[]> => {
  try {
    const response = await axios.get(
      process.env.RECRUITMENT_BASE_URL +
        "entity-assignment/get-assigned-tgs?staff_id=" +
        staff_id
    );
    const resultArray = response.data;
    return resultArray;
  } catch (err) {
    console.log(
      err.response?.status || 500,
      err.response?.data?.message || err.message
    );
    return [];
  }
};

export const getStaffAssignment = async (
  staff_id: string
): Promise<string[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.RECRUITMENT_BASE_URL}master-assignment/get-staff-assignment?staff_id=${staff_id}`
    );
    return data;
  } catch (err) {
    console.log(
      err.response?.status || 500,
      err.response?.data?.message || err.message
    );
    return [];
  }
};

export const getRFRestriction = async (key: string) => {
  try {
    const response = await axios.get(
      process.env.PLANNING_BASE_URL + "/app-global-config/" + key
    );
    return response.data.data;
  } catch (err) {
    console.log(
      err.response?.status || 500,
      err.response?.data?.message || err.message
    );
  }
};

export const getStaff = async (staff_id: string) => {
  try {
    const response = await axios.get(
      process.env.PLANNING_BASE_URL + "/users/staff-id/" + staff_id
    );
    return response.data.data;
  } catch (err) {
    console.log(
      err.response?.status || 500,
      err.response?.data?.message || err.message
    );
  }
};
