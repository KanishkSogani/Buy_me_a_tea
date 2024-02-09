import { VoyageProvider, Wallet, getLogicDriver } from "js-moi-sdk";

const provider = new VoyageProvider("babylon");
const logicId = process.env.REACT_APP_LOGIC_ID;

const constructBaseWallet = async () => {
  const wallet = new Wallet(provider);
  await wallet.fromMnemonic(
    process.env.REACT_APP_BASE_MNEMONIC,
    "m/44'/6174'/7020'/0/0"
  );
  console.log(wallet.getAddress());
  return wallet;
};

// Base wallet should only be used for making read calls when user has not connected his wallet
const baseWallet = await constructBaseWallet();

////////////////////////
// Mutate/Write Calls
///////////////////////

const ClaimToken = async (wallet) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ixResponse = await logicDriver.routines.Claim();
  return ixResponse.wait();
};

////////////////////////
// Observe/Read Calls
///////////////////////

const GetTokenName = async () => {
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  return logicDriver.routines.Name();
};
const GetTokenBalanceOf = async (account) => {
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  return logicDriver.routines.BalanceOf(account);
};
const GetTokenClaimAmount = async () => {
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  return logicDriver.routines.ClaimAmount();
};
const GetNextClaim = async (account) => {
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  return logicDriver.routines.NextClaim(account);
};
const GetTokenDecimals = async () => {
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  return logicDriver.routines.Decimals();
};
const GetTokenSymbol = async () => {
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  return logicDriver.routines.Symbol();
};

const logic = {
  GetTokenName,
  GetTokenBalanceOf,
  GetNextClaim,
  GetTokenClaimAmount,
  GetTokenDecimals,
  GetTokenSymbol,
  ClaimToken,
};

export default logic;
