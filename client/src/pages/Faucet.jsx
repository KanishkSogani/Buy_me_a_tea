import { Button, Card, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import logic from "../interface/logic";
import { toastError } from "../utils/toastWrapper";

const Faucet = ({ wallet }) => {
  const [isLoading, setLoading] = useState(false);
  const [isClaiming, setClaiming] = useState(false);
  const [refillTime, setRefillTime] = useState("00:00:00");
  const [error, setError] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [claimAmount, setClaimAmount] = useState();
  const [nextClaim, setNextClaim] = useState();
  const [symbol, setSymbol] = useState();
  const [decimals, setDecimals] = useState();

  useEffect(() => {
    getTokenDetails();
    getClaimDetails();
  }, []);

  const getTokenDetails = async () => {
    const { name } = await logic.GetTokenName();
    const { symbol } = await logic.GetTokenSymbol();
    const { decimals } = await logic.GetTokenDecimals();
    const { userBalance } = await logic.GetTokenBalanceOf();

    setSymbol(symbol);
    setDecimals(decimals);
    setTokenName(name);
  };

  const getClaimDetails = async () => {
    if (!wallet) return toastError("Please connect wallet");
    const { claimAmount } = await logic.GetTokenClaimAmount(
      wallet.getAddress()
    );
    const { nextClaim } = await logic.GetNextClaim(wallet.getAddress());

    setClaimAmount(claimAmount);
    setNextClaim(nextClaim);
  };

  const calculateRemainingTime = () => {
    // Get the current date and time in UTC
    const now = new Date();

    // Create a new Date object for 12:00 AM UTC
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    tomorrow.setUTCHours(0, 0, 0, 0);

    // Calculate the difference between now and 12:00 AM UTC
    const diff = tomorrow.getTime() - now.getTime();

    // Convert the difference to hours, minutes, and seconds
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diff % (60 * 1000)) / 1000);

    // Format the remaining time as a string in the "23:00:00" format
    const remainingTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return remainingTime;
  };

  return wallet ? (
    <div className="faucet">
      <Card classNames={"card"} type="primary" className=" ">
        <div className="">
          <Skeleton loading={isLoading} active paragraph={{ rows: 7 }} />
          {!isLoading && (
            <>
              <div className="">
                <div className=""></div>
                <div className="">
                  <div className="">Available Limit</div>
                  <h1>
                    {claimAmount} {tokenName}
                  </h1>
                </div>
              </div>
              <div className="">
                {" "}
                {error && <p className="">{error}</p>}
                <button className="btn btn--blue">Claim Tokens</button>
                {isClaiming && (
                  <p className="">
                    Please wait while the current request is being processed
                  </p>
                )}
                <div style={{ marginTop: "20px" }} className="">
                  Refills in {refillTime}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  ) : (
    <h2>Please Connect Wallet </h2>
  );
};

export default Faucet;
