import { Card, Typography, TextField, Button, Input } from "@mui/material";
import { useState } from "react";
import Lottie from "lottie-react";
import donateAnimation from "../assets/donateAnimation.json";

function Buy() {
  const [amount, setAmount] = useState(5);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

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
          My Balance: {1000}
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
              width: 400,
              minHeight: 200,
              padding: 20,
              backgroundColor: "#F5F9FF",
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
              className="inputBox"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Your Name"
              variant="outlined"
              fullWidth="true"
            />
            <br />
            <input
              className="inputBox"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Creator Address"
              variant="outlined"
              fullWidth="true"
            />
            <br />
            <input
              className="inputBox"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Send a Message"
              variant="outlined"
              fullWidth="true"
            />
            <br />
            <input
              className="inputBox"
              onChange={(e) => {
                setAmount(e.target.value * 5);
              }}
              placeholder="Tea Amount"
              variant="outlined"
              fullWidth="true"
            />
            <br />
            <Button variant="contained" size="medium">
              Support {amount}$
            </Button>
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
