import Lottie from "lottie-react";
import loginAnimation from "../assets/loginAnimation.json";
import createcampAnimation from "../assets/createcampAnimation.json";
import { useEffect, useState } from "react";
import logic from "../interface/logic";
import { toastError, toastSuccess } from "../utils/toastWrapper";
import loadingAnimation from "../assets/loadingAnimation.json";

function Admin({ wallet }) {
  const [id, setId] = useState();
  const [teas, setTeas] = useState("");
  const [isClaiming, setClaiming] = useState(false);

  // useEffect(() => {
  //   const initdata = async () => {
  //     const { campaigns } = await logic.GetCampaigns();
  //     setcamps(campaigns);
  //   };
  //   initdata();
  // }, []);

  const createcamp = async () => {
    try {
      setClaiming(true);
      const { CreatedCampaign } = await logic.CreateCampaign(wallet, teas);
      const campid = CreatedCampaign.campaignId;
      setId(campid);
      toastSuccess(`Your Campaign ID is Generated`);
      setTeas("");
      setClaiming(false);
    } catch (error) {
      toastError(`Error Occured`);
      setClaiming(false);
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
              value={teas}
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
              disabled={isClaiming}
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
              {id >= 0 ? (
                `Your Campaign ID is ${id}`
              ) : isClaiming ? (
                <Lottie
                  animationData={loadingAnimation}
                  style={{
                    height: 100,
                  }}
                />
              ) : (
                ``
              )}
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
