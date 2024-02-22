import { Card, Button } from "@mui/material";
import { useState } from "react";
import Lottie from "lottie-react";
import donateAnimation from "../assets/donateAnimation.json";
import logic from "../interface/logic";
import { toastError, toastSuccess } from "../utils/toastWrapper";
import { useParams } from "react-router-dom";
import loadingAnimation from "../assets/loadingAnimation.json";

function Buy({ wallet, tokenBalance }) {
  const { campId } = useParams();
  const [tea, setTea] = useState(1);
  const [amount, setAmount] = useState(5);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isClaiming, setClaiming] = useState(false);

  const buytheTea = async () => {
    try {
      setClaiming(true);
      await logic.BuyTea(wallet, campId, tea, name);
      toastSuccess(`Successfully Donated ${tea} Teas`);
      setName("");
      setTea(1);
      setMessage("");
      setClaiming(false);
    } catch (error) {
      toastError(`Error Occurred `);
      setClaiming(false);
    }
  };

  return (
    <div className="basic" style={{ paddingRight: 0 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <div
          style={{
            fontSize: 20,
            // backgroundColor: "black",
            background:
              "linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)",
            color: "white",
            padding: 10,
            borderRadius: " 10px 0px 0px 10px",
          }}
        >
          {tokenBalance > 0 ? `My Balance: ${tokenBalance}$` : `My Balance: `}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div style={{ position: "relative", left: 100 }}>
          <Card
            style={{
              margin: 10,
              width: 350,
              minHeight: 200,
              padding: 20,
              // backgroundColor: "#F5F9FF",
              background:
                "linear-gradient(178.6deg, rgb(232, 245, 253) 3.3%, rgb(252, 253, 255) 109.6%)",
            }}
          >
            <p
              style={{
                fontSize: 30,
                fontWeight: "bold",
                marginBottom: 0,
                fontFamily: "monospace",
              }}
            >
              Buy a tea
            </p>
            <br />
            <input
              className="inputBox2"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              placeholder="Your Name"
              variant="outlined"
              fullWidth="true"
            />
            <br />
            {/* <input
              className="inputBox"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
              placeholder="Creator ID"
              variant="outlined"
              fullWidth="true"
            />
            <br /> */}
            <input
              className="inputBox2"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
              placeholder="Send a Message"
              variant="outlined"
              fullWidth="true"
            />
            <br />
            <input
              className="inputBox2"
              onChange={(e) => {
                setAmount(e.target.value * 5);
                setTea(e.target.value);
              }}
              value={tea}
              placeholder="Tea Amount"
              variant="outlined"
              fullWidth="true"
            />
            <br />
            <button
              className="btn btn--blue"
              variant="contained"
              size="medium"
              onClick={buytheTea}
              disabled={isClaiming}
            >
              Support{" "}
              {!isClaiming ? (
                `${tea} Tea`
              ) : (
                <Lottie
                  animationData={loadingAnimation}
                  style={{ height: 40 }}
                />
              )}
            </button>
          </Card>
        </div>
        <div>
          <Lottie animationData={donateAnimation} />
        </div>
      </div>
    </div>
  );
}

export default Buy;
