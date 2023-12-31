import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainHeader from "../../components/Header/MainHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import Spinner from "../../shared/components/Spinner/Spinner";
import { darkColorSpinner } from "../../shared/constant/tailwindConstants";
import DashboardRouter from "../../routes/DashboardRouter";
import { setTwilioClient } from "../../shared/store/slices/twilioClient";

const { Content } = Layout;

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();
  const {
    isLoading: loading,
    client,
    isSuccessFull,
  } = useSelector((state) => state.twilioClient);

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem("userDynamo"));
    dispatch(setTwilioClient(id));
  }, []);

  if (loading || !client || !isSuccessFull)
    return (
      <div className="flex items-center justify-center">
        <Spinner className={darkColorSpinner} />
      </div>
    );

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {isLoading ? (
        <Spinner className={darkColorSpinner} />
      ) : (
        <div className="w-full h-full overflow-hidden">
          <Layout className="!h-full">
            <Content>
              <MainHeader loading={setIsLoading} />
              <Layout>
                <Sidebar />
                <Content
                  className={`${
                    location.pathname?.includes("/chat/group")
                      ? ""
                      : "py-[30px] px-[15px] md:py-[40px] md:px-[64px] min-h-[280px] overflow-y-scroll"
                  }`}
                >
                  <section className="max-h-[80vh] h-[80vh]">
                    <DashboardRouter />
                  </section>
                </Content>
              </Layout>
            </Content>
          </Layout>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
