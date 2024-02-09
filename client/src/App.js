import { Toaster } from "react-hot-toast";
import "./App.css";
import ConnectModal from "./components/ConnectModal";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Faucet from "./pages/Faucet";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [wallet, setWallet] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateWallet = (wallet) => {
    setWallet(wallet);
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
  };

  return (
    <div className="app">
      <Navbar
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
        <Route path="/" element={<Home />} />
        <Route path="/faucet" element={<Faucet wallet={wallet} />} />
      </Routes>
    </div>
  );
}

export default App;
