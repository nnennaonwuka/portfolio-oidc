import axios from "axios";
import { error } from "console";
import { Connection, getConnection } from "typeorm";

//
async function getMemberNames(ids: string[]) {
  const { data } = await axios.post(
    `${process.env.RECRUITMENT_BASE_URL}members/get-member-by-id`,
    ids
  );
  return data;
}
async function getOfoNames(ids: string[]) {
  const { data } = await axios.post(
    `${process.env.PLANNING_BASE_URL}/users/ofo-ids`,
    ids
  );
  return data;
}
async function getHubs() {
  const response = await axios.get(
    `${process.env.PLANNING_BASE_URL}/app-global-config/meeting_hubs`
  );
  const {
    data: { value },
  } = response.data; // Destructuring to extract 'value' from the response
  return JSON.parse(value);
}
async function getCommunity(id: string) {
  const response = await axios.get(
    `${process.env.PLANNING_BASE_URL}/community/${id}`
  );
  const { name, ward_name } = response.data.data;
  const concatenatedResult = `${name}, ${ward_name}`;
  return concatenatedResult;
}
function checkRegex(data: string): boolean {
  const regexPattern1 = /^IK.{11}_.*$/;
  const regexPattern2 = /^T-1\d{15}$/;
  if (regexPattern1.test(data) || regexPattern2.test(data)) return true;
  else return false;
}
export async function getNames(cardData) {
  // await initConnection();

  const OFOs = [];
  const ids = cardData.map((item) => `${item.unique_entity_id}`);

  const memberNames = await getMemberNames(ids);

  cardData.forEach((element) => {
    if (checkRegex(element.unique_entity_id)) {
      OFOs.push(element);
    }
  });
  let ofoNames = [];

  if (OFOs.length != 0) {
    const ofoIds: any = OFOs.map((item) => `${item.unique_entity_id}`);

    ofoNames = await getOfoNames(ofoIds);
  }

  const hubs = await getHubs();

  // let mergedArray = [];
  const updatedArray = memberNames.map((item) => ({
    ...item,
    hub: hubs.find((hub) => String(hub.id) === item.hub)?.name || null,
  }));

  if (ofoNames.length != 0) {
    const mergedArray = cardData.map((obj1) => ({
      ...obj1,
      ...(updatedArray.find(
        (obj2) => obj2.unique_entity_id === obj1.unique_entity_id
      ) || {}),
      ...(ofoNames.find(
        (obj3) => obj3.unique_entity_id === obj1.unique_entity_id
      ) || {}),
    }));

    const newArray = modifyArray(mergedArray);
    return getMemberImage(newArray);
  }

  const mergedArray = cardData.map((obj1) => ({
    ...obj1,
    ...(updatedArray.find(
      (obj2) => obj2.unique_entity_id === obj1.unique_entity_id
    ) || {}),
    ...(ofoNames.find(
      (obj3) => obj3.unique_entity_id === obj1.unique_entity_id
    ) || {}),
  }));

  const newArray = modifyArray(mergedArray);
  return getMemberImage(newArray);
}
export function isValidArray(arr: number[]): boolean {
  // Check for duplicates using a Set
  let set = new Set<number>(arr);
  if (set.size !== arr.length) {
    return false; // Duplicate found
  }

  // Check if all elements are 0, 1, or 2
  for (let num of arr) {
    if (num !== 0 && num !== 1 && num !== 2) {
      return false; // Invalid value found
    }
  }

  return true; // Array is valid
}
function modifyArray(array) {
  return array.map(
    ({ role, phone_number, ward_id, community_id, ...rest }) => rest
  );
}
function getMemberImage(data: string[]) {
  data.forEach((element: any) => {
    element[
      "image"
    ] = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/kungiyata/tfm/images/small_tfm_face/${element.unique_entity_id}_thumb.jpg`;
  });
  return data;
}
export function search(data, searchString: string) {
  const updatedSearchString = searchString.trim().toLowerCase();
  const results = data.filter(
    (item) =>
      item.ik_number.toLowerCase().includes(updatedSearchString) ||
      item.issuer_id.toLowerCase().includes(updatedSearchString) ||
      item.name.toLowerCase().includes(updatedSearchString) ||
      item.hub.toLowerCase().includes(updatedSearchString)
  );
  return results;
}
export function isValidSortArray(arr: string[]): boolean {
  if (arr.length !== 2) {
    return false;
  }
  const firstElementLower = arr[0].toLowerCase();

  // Check if the first element is 'hub' (case-insensitive)
  if (firstElementLower !== "hub" && firstElementLower !== "status") {
    return false;
  }
  if (arr[1] !== "0" && arr[1] !== "1") {
    return false; // Invalid value found
  }
  return true;
}
export function sortData(arr: string[], sortArray: string[]) {
  const sortBy: string = sortArray[0];
  const sortIn = sortArray[1];

  //Sort in Ascending order
  if (sortIn == "0") {
    const sorted = arr.sort((a, b) => {
      if (!a.hasOwnProperty(sortBy)) return 1;
      if (!b.hasOwnProperty(sortBy)) return -1;

      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
    return sorted;
  }

  //Sort in Descending order
  const sorted = arr.sort((a, b) => {
    if (!a.hasOwnProperty(sortBy)) return 1;
    if (!b.hasOwnProperty(sortBy)) return -1;

    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (valueA < valueB) return 1;
    if (valueA > valueB) return -1;
    return 0;
  });

  return sorted;
}
export async function getAllCardData(data, cardHistory, ik_number, hub) {
  // if(cardHistory.length!==0){
  const staff_id = data[0].staff_id ? data[0].staff_id : null;
  let user_data = [];
  let memberDetails: any[] = [];

  let location = "";
  if (data[0].staff_id) {
    const userArray = [data[0].staff_id];
    user_data = await getOfoNames(userArray);
  }
  if (data[0].unique_entity_id) {
    const memberArray = [data[0].unique_entity_id];
    if (memberArray.length !== 0) {
      memberDetails = await getMemberNames(memberArray);
      location = await getCommunity(memberDetails[0].community_id);
      getMemberImage(memberDetails);
    }
  }

  const cardData = {
    current_card_id: data[0].bg_card_number,
    current_card_pan: data[0].pan,
    card_picture: data[0].card_image
      ? `https://storage.googleapis.com/${process.env.GCS_BUCKET}/agrios/Farming/FM/BG_CARDS/${data[0].card_image}`
      : null,
    issuer_id: staff_id,
    card_status: data[0].portal_card_status,
    previous_card_id:
      cardHistory.length !== 0 ? cardHistory[0].bg_card_number : null,
    previous_card_pan: cardHistory.length !== 0 ? cardHistory[0].pan : null,
    issuer_phone_no:
      user_data.length !== 0 && user_data[0].phone_number
        ? user_data[0].phone_number
        : null,
    type_of_error: data[0].error_message,
    duration_of_error: data[0].error_log_date,
    name_of_verifying_staff: user_data.length > 0 ? user_data[1].name : null,
    id_of_verifying_staff: data[0].verifier_id,
  };
  const memberData = {
    ik_number,
    name:
      memberDetails.length !== 0 && memberDetails[0].name
        ? memberDetails[0].name
        : null,
    role:
      memberDetails.length !== 0 && memberDetails[0].role
        ? memberDetails[0].role
        : null,
    location: location,
    phone_number:
      memberDetails.length !== 0 && memberDetails[0].phone_number
        ? memberDetails[0].phone_number
        : null,
    member_image:
      memberDetails.length !== 0 && memberDetails[0].image
        ? memberDetails[0].image
        : null,
  };

  const verificationDate = data[0].verification_date;
  
  const history = {
    verified_by: staff_id,
    verified_on:
      verificationDate == null ? null : verificationDate.slice(0, 10),
    replace_flag: 0,
  };
  return { cardData, memberData, history };
}
export async function getReplacedCardData(data, ik_number, hub, cardHistory) {
  const staff_id = data[0].staff_id ? data[0].staff_id : null;
  let user_data = [];
  let memberDetails: any[] = [];

  let location = "";
  if (data[0].staff_id) {
    const userArray = [data[0].staff_id];
    user_data = await getOfoNames(userArray);
  }
  if (data[0].unique_entity_id) {
    const memberArray = [data[0].unique_entity_id];
    if (memberArray.length !== 0) {
      memberDetails = await getMemberNames(memberArray);
      location = await getCommunity(memberDetails[0].community_id);
      getMemberImage(memberDetails);
    }
  }
  const cardData = {
    hub,
    current_card_id: data[0].bg_card_number,
    current_card_pan: data[0].pan,
    card_picture: data[0].card_image
      ? `https://storage.googleapis.com/${process.env.GCS_BUCKET}/agrios/Farming/FM/BG_CARDS/${data[0].card_image}`
      : null,
    issuer_id: staff_id,
    card_status: data[0].portal_card_status,
    previous_card_id:
      cardHistory.length !== 0 ? cardHistory[0].bg_card_number : null,
    previous_card_pan: cardHistory.length !== 0 ? cardHistory[0].pan : null,
    issuer_phone_no:
      user_data.length !== 0 && user_data[0].phone_number
        ? user_data[0].phone_number
        : null,
    type_of_error: null,
    duration_of_error: null,
    name_of_verifying_staff:
      user_data.length !== 0 && user_data[0].name ? user_data[0].name : null,
    id_of_verifying_staff: staff_id,
  };
  const memberData = {
    ik_number,
    name:
      memberDetails.length !== 0 && memberDetails[0].name
        ? memberDetails[0].name
        : null,
    role:
      memberDetails.length !== 0 && memberDetails[0].role
        ? memberDetails[0].role
        : null,
    location: location,
    phone_number:
      memberDetails.length !== 0 && memberDetails[0].phone_number
        ? memberDetails[0].phone_number
        : null,
    member_image:
      memberDetails.length !== 0 && memberDetails[0].image
        ? memberDetails[0].image
        : null,
  };
  const replacementDate = data[0].assigned_date;
  const history = {
    verified_by: staff_id,
    verified_on: replacementDate == null ? null : replacementDate.slice(0, 10),
    replace_flag: 1,
    replaced_by: staff_id,
    replaced_on: replacementDate == null ? null : replacementDate.slice(0, 10),
  };
  return { cardData, memberData, history };
  // }
}
export async function verifyHub(hub) {
  const hubs = await getHubs();
  const hubExists = hubs.some(
    (item) => item.name.toLowerCase() === hub.toLowerCase()
  );

  if (hubExists) {
    hubs.forEach((item) => {
      item.name = item.name.toLowerCase();
    });
  }
  return hubExists;
}
