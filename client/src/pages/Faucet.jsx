import { Card, Skeleton, message } from "antd";
import { getLogicDriver } from "js-moi-sdk";
import React, { useEffect, useRef, useState } from "react";
import logic, { logicId } from "../interface/logic";
import { toastError, toastSuccess } from "../utils/toastWrapper";
import Loader from "../components/Loader";
import { calculateRemainingTime } from "../utils/CalculateTimer";

// Changes Made

const Faucet = ({
  wallet,
  showConnectModal,
  updateTokenBalance,
  tokenDetails,
  tokenBalance,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isClaiming, setClaiming] = useState(false);
  const [refillTime, setRefillTime] = useState("00:00:00");
  const [error, setError] = useState("");
  const [claimAmount, setClaimAmount] = useState();
  const [nextClaim, setNextClaim] = useState();

  useEffect(() => {
    if (!wallet) return;

    const initDetails = async () => {
      setLoading(true);

      const [{ claimAmount }, { nextClaim }] = await Promise.all([
        logic.GetTokenClaimAmount(wallet.getAddress()),
        logic.GetNextClaim(wallet.getAddress()),
      ]);

      setClaimAmount(claimAmount);
      setNextClaim(nextClaim);
      setLoading(false);
    };

    initDetails();
  }, [wallet]);

  useEffect(() => {
    const id = setInterval(() => {
      setRefillTime(calculateRemainingTime(nextClaim));
    }, 1000);

    return () => clearInterval(id);
  }, [nextClaim]);

  const onClaimHandler = async () => {
    try {
      setClaiming(true);

      await logic.ClaimToken(wallet);
      const { nextClaim } = await logic.GetNextClaim(wallet.getAddress());

      setNextClaim(nextClaim);
      updateTokenBalance(tokenBalance + claimAmount);
      toastSuccess(`Claimed ${claimAmount} successfully`);
      setClaiming(false);
    } catch (error) {
      toastError(error.message);
      setClaiming(false);
    }
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
                  <h1>{refillTime === "00:00:00" ? claimAmount : 0} $</h1>
                </div>
              </div>
              <div className="">
                {" "}
                {error && <p className="">{error}</p>}
                <button
                  disabled={refillTime !== "00:00:00"}
                  className="btn btn--blue"
                  onClick={onClaimHandler}
                >
                  <span>Claim Tokens</span>
                  <Loader loading={isClaiming} size={25} color="#fff" />
                </button>
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
    <div className="connect-wallet">
      <div className="center">
        <p>Please connect your wallet to continue</p>

        <div>
          <button
            className="btn btn--blue"
            onClick={() => {
              showConnectModal(true);
            }}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faucet;
