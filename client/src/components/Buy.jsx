import { Card, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

function Buy(){
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
      <div>
        <div style={{ position: "relative", left: 100 }}>
          <Card
            style={{
              margin: 10,
              width: 400,
              minHeight: 200,
              padding: 20,
              backgroundColor: "#FFFEFE",
            }}
          >
            <Typography textAlign={"center"} variant="h4">
              Buy a Tea
            </Typography>
            <br />
            <Typography variant="h6">Name:</Typography>
            <TextField
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Kanishk Sogani"
              variant="outlined"
              fullWidth="true"
            />
            <br />
            <Typography variant="h6">Address:</Typography>
            <TextField
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="0x..."
              variant="outlined"
              fullWidth="true"
            />
            <br />
            <Typography variant="h6">Message:</Typography>
            <TextField
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Hello"
              variant="outlined"
              fullWidth="true"
            />
            <br />
            <Typography variant="h6">Tea:</Typography>
            <TextField
              onChange={(e) => {
                setAmount(e.target.value * 5);
              }}
              placeholder="1"
              variant="outlined"
              fullWidth="true"
            />
            <br /> <br />
            <Button variant="contained" size="medium">
              Support {amount}$
            </Button>
          </Card>
        </div>
        <div>
          <Card></Card>
        </div>
      </div>
    </div>
  );
}

export default Buy;