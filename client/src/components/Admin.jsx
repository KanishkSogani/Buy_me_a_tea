import Lottie from "lottie-react";
import loginAnimation from "../assets/loginAnimation.json";
import createcampAnimation from "../assets/createcampAnimation.json";
import { useEffect, useState } from "react";
import logic from "../interface/logic";
import { toastError, toastSuccess } from "../utils/toastWrapper";
import loadingAnimation from "../assets/loadingAnimation.json";
import { useNavigate } from "react-router-dom";
import arrowAnimation from "../assets/arrowAnimation.json";

function Admin({ wallet }) {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [teas, setTeas] = useState("");
  const [isClaiming, setClaiming] = useState(false);
  const [creator, setCreator] = useState("");
  const [creatordetails, setCreatorDetails] = useState("");

  const createcamp = async () => {
    try {
      if (creator && teas && creatordetails) {
        setClaiming(true);
        const { CreatedCampaign } = await logic.CreateCampaign(
          wallet,
          teas,
          creator,
          creatordetails
        );
        const campid = CreatedCampaign.campaignId;
        setId(campid);
        toastSuccess(`Your Campaign ID is Generated`);
        setTeas("");
        setCreator("");
        setCreatorDetails("");
        setClaiming(false);
      } else {
        toastError("Please fill all details.");
      }
    } catch (error) {
      !wallet ? toastError("Please Connect Wallet") : toastError(error.message);
      setTimeout(() => {
        setClaiming(false);
      }, 2000);
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
          <div style={{ position: "absolute", left: "40vw", top: "20vh" }}>
            <h3 style={{ marginLeft: "0vw" }}>Create your Campaign!</h3>
            <form>
              <input
                style={{ position: "relative", top: "2vh" }}
                className="inputBox2"
                value={creator}
                onChange={(e) => {
                  setCreator(e.target.value);
                }}
                placeholder="Enter Creator Name"
                fullWidth="true"
                required={true}
              />
              <br />
              <textarea
                style={{ position: "relative", top: ".5vh" }}
                className="inputBox3"
                value={creatordetails}
                onChange={(e) => {
                  setCreatorDetails(e.target.value);
                }}
                placeholder="Enter Creator Details"
                fullWidth="true"
                rows={4}
                required={true}
              />
              <input
                style={{ position: "relative", top: "2vh" }}
                className="inputBox2"
                value={teas}
                onChange={(e) => {
                  setTeas(e.target.value);
                }}
                placeholder="Enter Your Tea Price"
                fullWidth="true"
                required={true}
              />
              <br />
              <button
                className="button-30"
                style={{ position: "relative", top: "3vh" }}
                onClick={createcamp}
                disabled={isClaiming}
                type="submit"
              >
                Create Campaign
              </button>
            </form>
            <div
              style={{
                fontFamily: "monospace",
                textAlign: "center",
                fontSize: 30,
                fontWeight: 400,
                marginTop: "10vh",
              }}
            >
              {id >= 0 ? (
                <div>
                  <div>{`Your Campaign ID is ${id}`}</div>
                  <div
                    style={{
                      fontSize: 25,
                      marginTop: "5vh",
                      fontFamily: "cursive",
                    }}
                  >
                    <span>Check Your Campaign</span>
                    <div>
                      <Lottie
                        style={{ height: 40 }}
                        animationData={arrowAnimation}
                      />
                    </div>
                    <button
                      className="button-30"
                      onClick={() => {
                        navigate("/buy/" + id);
                      }}
                    >
                      Click Here!
                    </button>
                  </div>
                </div>
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
