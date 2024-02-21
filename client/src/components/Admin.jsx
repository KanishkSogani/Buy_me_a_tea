import Lottie from "lottie-react";
import loginAnimation from "../assets/loginAnimation.json";
import createcampAnimation from "../assets/createcampAnimation.json";
import { useEffect, useState } from "react";
import logic from "../interface/logic";
import { toastError, toastSuccess } from "../utils/toastWrapper";

function Admin({ wallet }) {
  const [id, setId] = useState("");
  const [teas, setTeas] = useState("");

  // useEffect(() => {
  //   const initdata = async () => {
  //     const { campaigns } = await logic.GetCampaigns();
  //     setcamps(campaigns);
  //   };
  //   initdata();
  // }, []);

  const createcamp = async () => {
    try {
      const { CreatedCampaign } = await logic.CreateCampaign(wallet, teas);
      const campid = CreatedCampaign.campaignId;
      setId(campid);
      toastSuccess(`Your Campaign ID is Generated`);
    } catch (error) {
      toastError(`Please Connect Wallet`);
    }
  };

  // const campDetail = async () => {
  //   try {
  //     const { campaigns } = await logic.GetCampaigns();
  //     setcamps(campaigns);
  //     // toastSuccess(`Total amount of Tea recieved is ${camps[id].totalTeas}`);
  //   } catch (error) {
  //     toastError(`Please Enter Amount`);
  //   }
  // };

  // useEffect(() => {
  //   if (camps && camps[id]) {
  //     toastSuccess(`Total amount of Tea received is ${camps[id].totalTeas}`);
  //   }
  // }, [camps]);

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
            <input
              style={{ position: "relative", top: "2vh" }}
              className="inputBox2"
              onChange={(e) => {
                setTeas(e.target.value);
              }}
              placeholder="Enter Your Tea Price"
              fullWidth="true"
            />
            <button
              className="button-30"
              style={{ position: "relative", top: "3vh" }}
              onClick={createcamp}
            >
              Create ID
            </button>
            <div
              style={{
                fontFamily: "monospace",
                textAlign: "center",
                fontSize: 30,
                fontWeight: 400,
                marginTop: "20vh",
              }}
            >
              {id > 0 ? `Your Campaign ID is ${id}` : ``}
            </div>
          </div>
        </div>
        {/* <div style={{ paddingTop: "35vh" }}>
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
        </div> */}
      </div>
    </>
  );
}

export default Admin;
