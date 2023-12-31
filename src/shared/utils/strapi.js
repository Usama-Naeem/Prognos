import { filterContentList } from "../api/strapi";

const qs = require("qs");

// Leaving this code here for future use
// Utitilty Function to get unique Ids in an array
// function onlyUniqueIds(value, index, self) {
//   return self.indexOf(value) === index;
// }

export const filterContent = async (values, paginationInfo) => {
  const { stage, race, language, gender } = values;
  const filter = qs.stringify(
    {
      sort: ["createdAt:desc"],
      pagination: {
        page: paginationInfo.current,
        pageSize: paginationInfo.pageSize,
      },
      filters: {
        $and: [
          race
            ? {
                race_ethnicity: {
                  id: {
                    $in: race,
                  },
                },
              }
            : {},
          language
            ? {
                language: {
                  id: {
                    $in: language,
                  },
                },
              }
            : {},
          stage // Check if values.lens is true
            ? {
                stage: {
                  id: {
                    $in: stage,
                  },
                },
              }
            : {}, // Empty object if values.lens is false
          gender
            ? {
                gender: {
                  id: {
                    $in: gender,
                  },
                },
              }
            : {},
        ],
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  return filterContentList(filter);
};
