import Lottie from "lottie-react";
import loginAnimation from "../assets/loginAnimation.json";
import createcampAnimation from "../assets/createcampAnimation.json";
import { useEffect, useState } from "react";
import logic from "../interface/logic";
import { toastError, toastSuccess } from "../utils/toastWrapper";

function Admin({ wallet, teas, Setteas }) {
  const [id, setId] = useState("");
  const [camps, setcamps] = useState([]);

  const createcamp = async () => {
    try {
      const { CreatedCampaign } = await logic.CreateCampaign(wallet, 5);
      const campid = CreatedCampaign.campaignId;
      toastSuccess(`Your Campaign ID is ${campid}`);
    } catch (error) {
      toastError(`Please Connect Wallet`);
    }
  };

  const campDetail = async () => {
    try {
      const { campaigns } = await logic.GetCampaigns();
      setcamps(campaigns);
      console.log(id);
      Setteas(camps[id].totalTeas);
      toastSuccess(`Total amount of Tea recieved is ${teas}`);
    } catch (error) {
      toastError(`Please Enter Amount`);
    }
  };

  return (
    <>
      <div>
        <div>
          <Lottie
            style={{ height: 300, position: "absolute", left: "10vw" }}
            animationData={createcampAnimation}
          />
          <div style={{ position: "absolute", left: "40vw", top: "30vh" }}>
            <h3>Create your Campaign ID!</h3>
            <button
              className="button-30"
              style={{ position: "relative", marginTop: "3vh" }}
              onClick={createcamp}
            >
              Create ID
            </button>
          </div>
        </div>
        <div style={{ paddingTop: "35vh" }}>
          <Lottie
            style={{ height: 300, position: "absolute", right: "10vw" }}
            animationData={loginAnimation}
          />
          <div
            style={{ position: "absolute", right: "40.5vw", bottom: "17vh" }}
          >
            <h3>Got your Campaign ID?</h3>
            <input
              style={{ position: "relative", top: "2vh" }}
              className="inputBox2"
              onChange={(e) => {
                setId(e.target.value);
              }}
              placeholder="Enter Your Creator ID"
              fullWidth="true"
            />
            <button
              className="button-30"
              style={{ position: "relative", top: "3vh" }}
              onClick={campDetail}
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
