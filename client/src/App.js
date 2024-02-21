import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ConnectModal from "./components/ConnectModal";
import Navbar from "./components/Navbar";
import Faucet from "./pages/Faucet";
import Home from "./pages/Home";
import logic from "./interface/logic";
import Buy from "./components/Buy";
import Admin from "./components/Admin";
import Campaigns from "./components/Campaigns";

function App() {
  const [wallet, setWallet] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenDetails, setTokenDetails] = useState({});
  const [tokenBalance, setTokenBalance] = useState();

  useEffect(() => {
    const getTokenDetails = async () => {
      const [{ name }, { symbol }, { decimals }] = await Promise.all([
        logic.GetTokenName(),
        logic.GetTokenSymbol(),
        logic.GetTokenDecimals(),
      ]);

      setTokenDetails({
        name,
        symbol,
        decimals,
      });
    };
    getTokenDetails();
  }, []);

  useEffect(() => {
    const getTokenBalance = async () => {
      if (!wallet) return;

      const { balance } = await logic.GetTokenBalanceOf(wallet.getAddress());
      setTokenBalance(balance);
    };
    getTokenBalance();
  }, [wallet]);

  const updateWallet = (wallet) => {
    setWallet(wallet);
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
  };
  const updateTokenBalance = (value) => {
    setTokenBalance(value);
  };

  return (
    <div className="app" style={{ height: "100vh", width: "100vw" }}>
      <Navbar
        tokenDetails={tokenDetails}
        tokenBalance={tokenBalance}
        updateWallet={updateWallet}
        wallet={wallet}
        showConnectModal={showConnectModal}
      />
      <Toaster />
      <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        updateWallet={updateWallet}
      />
      <Routes>
        <Route path="/" element={<Home wallet={wallet} />} />
        <Route path="/home" element={<Home wallet={wallet} />} />
        <Route
          path="/faucet"
          element={
            <Faucet
              updateTokenBalance={updateTokenBalance}
              tokenDetails={tokenDetails}
              tokenBalance={tokenBalance}
              wallet={wallet}
              showConnectModal={showConnectModal}
            />
          }
        />
        <Route
          path="/buy/:campId"
          element={
            <Buy
              wallet={wallet}
              tokenBalance={tokenBalance}
              setTokenBalance={setTokenBalance}
            />
          }
        />
        <Route path="/admin" element={<Admin wallet={wallet} />} />
        <Route path="/campaigns" element={<Campaigns />} />
      </Routes>
    </div>
  );
}

export default App;
