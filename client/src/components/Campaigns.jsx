import { useEffect, useState } from "react";
import logic from "../interface/logic";
import { toastError, toastSuccess } from "../utils/toastWrapper";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loadingAnimation.json";
import { Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { hexToBytes } from "js-moi-sdk";

function Campaigns() {
  const [camps, setcamps] = useState([{}]);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const initdata = async () => {
      try {
        const { campaigns } = await logic.GetCampaigns();
        setcamps(campaigns);
      } catch (error) {
        toastError(error);
      }
    };
    initdata();
  }, []);

  useEffect(() => {
    try {
      if (camps[0].campaignId == 0) {
        console.log(camps);
        setIsloading(false);
      }
    } catch {
      toastError("Please create Campaign Id");
    }
  }, [camps]);

  if (isloading) {
    return (
      <div
        style={{
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          top: "30vh",
        }}
      >
        <Lottie animationData={loadingAnimation} />
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{ fontFamily: "monospace", fontSize: 30, fontStyle: "italic" }}
        >
          Select a campaign to Donate Tea
        </p>
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {camps.map((camp) => {
          return <Campaign camp={camp} />;
        })}
      </div>
    </div>
  );
}

function Campaign({ camp }) {
  const navigate = useNavigate();
  return (
    <Card
      className="cards"
      onClick={() => {
        navigate("/buy/" + camp.campaignId);
      }}
      style={{
        margin: 10,
        width: 400,
        minHeight: 110,
        padding: 20,
        backgroundColor: "#F5F9FF",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p
          style={{ fontSize: 25, fontFamily: "monospace" }}
        >{`Campaign ID: ${camp.campaignId}`}</p>
      </div>
      <div style={{ display: "flex" }}>
        <p
          style={{
            fontSize: 20,
            fontFamily: "monospace",
            marginTop: "2vh",
            marginBottom: 5,
          }}
        >{`Tea Price: ${camp.teaPrice}$ `}</p>
      </div>
      <div style={{ display: "flex" }}>
        <p
          style={{
            fontSize: 20,
            fontFamily: "monospace",
            marginTop: 0,
            marginBottom: 5,
          }}
        >{`Total Tea: ${camp.totalTeas} `}</p>
      </div>
      <div style={{ display: "flex" }}>
        <p
          style={{
            fontSize: 20,
            fontFamily: "monospace",
            marginTop: 0,
            marginBottom: 10,
          }}
        >{`Creator: ${camp.creator} `}</p>
      </div>
    </Card>
  );
}

export default Campaigns;
