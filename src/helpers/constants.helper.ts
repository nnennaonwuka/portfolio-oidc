import { getConnection } from "typeorm";

export async function getEntityArray(
  entityGroups: string[]
): Promise<string[]> {
  try {
    const entityGroupIds = await Promise.all(
      entityGroups.map(async (group) => {
        const result = await getConnection().query(
          `SELECT value from portfolio_management_constants where key = '${group}'`
        );
        return result
          .map((entity) => entity.value.split(",").map((value) => value.trim()))
          .flat();
      })
    );

    return entityGroupIds.flat();
  } catch (error) {
    // Handle the error
    console.error("Error in getEntityArray:", error.message);
    throw new Error(error.message);
  }
}
