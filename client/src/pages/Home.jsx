import Lottie from "lottie-react";
import arrowAnimation from "../assets/arrowAnimation.json";

function Home() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ position: "relative", bottom: 20 }}>Support your</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ position: "relative", bottom: 30 }}>favorite creator</h1>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 25,
            marginBottom: 0,
            marginTop: 0,
            fontWeight: 400,
          }}
        >
          Decentralized system with full Trust and Transparency.
        </p>
        <p style={{ fontSize: 25, fontWeight: 400 }}>Now in your hands!</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "6.3%",
        }}
      >
        <h2
          style={{
            fontFamily: "Dancing Script",
          }}
        >
          Click Here
        </h2>
        <div>
          <Lottie style={{ height: 40 }} animationData={arrowAnimation} />
        </div>
      </div>

      <button
        className="button"
        onClick={() => {
          window.location = "/buy";
        }}
      >
        Start Now <i></i>
      </button>
      {/* <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 14,
          marginTop: "6%",
        }}
      >
        Dont worry! Its Free and Easy.
      </p> */}
    </>
  );
}

export default Home;
