import axios from "axios";

const qs = require("qs");

const STRAPI_API_URL = process.env.REACT_APP_STRAPI_API_URL;
const GET_CONTENTS_URL = `${STRAPI_API_URL}/contents`;
const GET_LENSES_URL = `${STRAPI_API_URL}/lenses`;
const GET_TOPICS_URL = `${STRAPI_API_URL}/topics`;
const GET_STAGES_URL = `${STRAPI_API_URL}/stages`;
const GET_GENDERS_URL = `${STRAPI_API_URL}/genders`;
const GET_LANGUAGES_URL = `${STRAPI_API_URL}/languages`;
const GET_RACES_URL = `${STRAPI_API_URL}/race-ethnicities`;

export const getLensList = async () => {
  const response = await axios.get(GET_LENSES_URL);
  const result = response?.data?.data;

  const lensData = [];
  result.map((lens) =>
    lensData.push({ value: lens.id, label: lens.attributes.name }),
  );
  return lensData;
};

export const getTopicsList = async () => {
  const response = await axios.get(GET_TOPICS_URL);
  const result = response?.data?.data;

  const topicData = [];
  result.map((topic) =>
    topicData.push({
      value: topic.id,
      label: topic.attributes.name,
    }),
  );
  return topicData;
};

export const getStageList = async () => {
  const response = await axios.get(GET_STAGES_URL);
  const result = response?.data?.data;

  const stageData = [];
  result.map((lens) =>
    stageData.push({ value: lens.id, label: lens.attributes.name }),
  );
  return stageData;
};

export const getGenderList = async () => {
  const response = await axios.get(GET_GENDERS_URL);
  const result = response.data.data;

  const genderData = [];
  result.map((gender) =>
    genderData.push({ value: gender.id, label: gender.attributes.name }),
  );

  return genderData;
};

export const getLanguageList = async () => {
  const response = await axios.get(GET_LANGUAGES_URL);
  const result = response.data.data;

  const languageData = [];
  result.map((language) =>
    languageData.push({ value: language.id, label: language.attributes.name }),
  );

  return languageData;
};

export const getRaceData = async () => {
  const response = await axios.get(GET_RACES_URL);
  const result = response.data.data;

  const raceData = [];
  result.map((race) =>
    raceData.push({ value: race.id, label: race.attributes.name }),
  );

  return raceData;
};

export const getContentList = async (peginationInfo) => {
  const query = qs.stringify({
    sort: ["createdAt:desc"],
    pagination: {
      page: peginationInfo.current,
      pageSize: peginationInfo.pageSize,
    },
  });
  const response = await axios.get(`${GET_CONTENTS_URL}?populate=%2A&${query}`);
  const result = response?.data?.data;
  const pagination = response?.data?.meta?.pagination;
  const contentData = [];
  result.map(async (content) => {
    const stages = [];
    content?.attributes?.stage?.data?.map((stage) =>
      stages.push(stage?.attributes?.name),
    );
    contentData.push({
      id: content.id,
      title: content.attributes.title,
      tableDescription: content.attributes.description
        ? content.attributes.description.substring(0, 100)
        : "",
      description: content.attributes.description
        ? content.attributes.description
        : "",
      stage: stages,
      race: content.attributes.race_ethnicity?.data?.attributes?.name,
      language: content.attributes.language?.data?.attributes?.name,
      gender: content.attributes.gender?.data?.attributes?.name,
    });
    return contentData;
  });
  return { contentData, pagination };
};

export const filterContentList = async (filter) => {
  const response = await axios.get(
    `${GET_CONTENTS_URL}?populate=%2A&${filter}`,
  );
  const result = response?.data?.data;
  const pagination = response?.data?.meta?.pagination;

  const contentData = [];
  result.map((content) =>
    contentData.push({
      id: content.id,
      title: content.attributes.title,
      description: content.attributes.description
        ? content.attributes.description
        : "",
      tableDescription: content.attributes.description
        ? content.attributes.description.substring(0, 100)
        : "",
      stage: content.attributes.stage?.data?.map((stage) => stage.attributes.name) ?? [],
      race: content.attributes.race_ethnicity?.data?.attributes?.name,
      language: content.attributes.language?.data?.attributes?.name,
      gender: content.attributes.gender?.data?.attributes?.name,
    }),
  );
  return { contentData, pagination };
};

export const getContentDetailsById = async (id) => {
  const response = await axios.get(
    `${GET_CONTENTS_URL}/${id}?populate[cover]=%2A&populate[blocks][populate]=%2A`,
  );
  const result = response?.data?.data;
  const date = new Date(result.attributes.publishedAt);

  const contentDetails = {
    id: result.id,
    title: result.attributes.title,
    description: result.attributes.description
      ? result.attributes.description
      : "",
    coverImage: result.attributes.cover.data
      ? result.attributes?.cover?.data?.attributes?.url
      : null,
    contentBody: result.attributes.blocks,
    publishedDate: `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`,
  };

  return contentDetails;
};

export const getTopicsByStageId = async (filter) => {
  const query = qs.stringify(
    {
      filters: {
        stages: {
          id: {
            $eq: filter,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const response = await axios.get(`${GET_TOPICS_URL}?${query}`);
  const result = response?.data?.data;

  const topicIds = [];
  result.map((topic) => topicIds.push(topic.id));
  return topicIds;
};

export const getLensesByStageId = async (filter) => {
  const query = qs.stringify(
    {
      filters: {
        stages: {
          id: {
            $eq: filter,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const response = await axios.get(`${GET_LENSES_URL}?${query}`);
  const result = response?.data?.data;

  const lensIds = [];
  result.map((lens) => lensIds.push(lens.id));
  return lensIds;
};

export const getContentByTopicsAndLenses = async (
  topics,
  lens,
  paginationInfo,
) => {
  const query = qs.stringify(
    {
      sort: ["createdAt:desc"],
      pagination: {
        page: paginationInfo.current,
        pageSize: paginationInfo.pageSize,
      },
      filters: {
        $or: [
          {
            topics: {
              id: {
                $in: topics.length > 0 ? topics : [0],
              },
            },
          },
          {
            lens: {
              id: {
                $in: lens.length > 0 ? lens : [0],
              },
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const response = await axios.get(`${GET_CONTENTS_URL}?${query}`);
  const result = response?.data?.data;
  const pagination = response?.data?.meta?.pagination;

  const contentData = [];
  result.map((content) =>
    contentData.push({
      id: content.id,
      title: content.attributes.title,
      tableDescription: content.attributes.description
        ? content.attributes.description.substring(0, 100)
        : "",
      description: content.attributes.description
        ? content.attributes.description
        : "",
    }),
  );
  return { contentData, pagination };
};

export const getLensListByStageId = async (stageId) => {
  const query = qs.stringify(
    {
      filters: {
        stages: {
          id: {
            $eq: stageId,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const response = await axios.get(`${GET_LENSES_URL}?${query}`);
  const result = response?.data?.data;

  const lensData = [];
  result.map((lens) =>
    lensData.push({ value: lens.id, label: lens.attributes.name }),
  );
  return lensData;
};

export const getTopicListByStageId = async (stageId) => {
  const query = qs.stringify(
    {
      filters: {
        stages: {
          id: {
            $eq: stageId,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const response = await axios.get(`${GET_TOPICS_URL}?${query}`);
  const result = response?.data?.data;

  const lensData = [];
  result.map((lens) =>
    lensData.push({ value: lens.id, label: lens.attributes.name }),
  );
  return lensData;
};
