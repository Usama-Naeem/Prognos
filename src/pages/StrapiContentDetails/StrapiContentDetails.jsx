import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContentDetailsById } from "../../shared/api/strapi";
import { STRAPI_CONTENT } from "../../shared/constant/DashboardRoutes";
import StrapiBlock from "./StrapiBlock";
import "./StrapiContentDetails.css";

const StrapiContentDetails = () => {
  const [content, setContent] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const contentDetail = await getContentDetailsById(id);
      setContent(contentDetail);
    })();
  }, [id]);

  const clickHandler = () => {
    navigate(STRAPI_CONTENT, { replace: true });
  };

  return (
    <section className="flex flex-col max-w-[1200px] article-section">
      <Button
        onClick={clickHandler}
        className="w-[100px] h-[40px] mb-[56px] bg-primaryColor text-white rounded-2xl border-0 font-medium text-lg"
      >
        Back
      </Button>
      <div>
        <h3 className="text-4xl">Article</h3>
      </div>
      <div className="max-h-[350px] overflow-hidden rounded-2xl">
        <img
          src={content.coverImage}
          className="block w-full image"
          alt="Cover Image"
        />
      </div>
      <div className="flex items-center justify-between mt-[24px]">
        <p className="font-medium text-gray-400">Published By Admin</p>
        <p className="text-gray-400">{content.publishedDate}</p>
      </div>
      <h1 className="content-title text-3xl">{content.title}</h1>
      <div className="content-description">{content.description}</div>
      <StrapiBlock blocks={content.contentBody ? content.contentBody : []} />
    </section>
  );
};

export default StrapiContentDetails;
