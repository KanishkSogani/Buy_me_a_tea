import Lottie from "lottie-react";
import arrowAnimation from "../assets/arrowAnimation.json";
import creatorAnimation from "../assets/creatorAnimation.json";
import donateboxAnimation from "../assets/donateboxAnimation.json";

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
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: "11.5vh",
        }}
      >
        <div
          className="donate"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // marginTop: "13.5vh",
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
        <div
          className="creator"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // marginTop: "13.5vh",
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
      </div>

      <button
        className="button donatebut"
        onClick={() => {
          window.location = "/buy";
        }}
      >
        Donate Now <i></i>
      </button>

      <button
        className="button creatorbut"
        onClick={() => {
          window.location = "/buy";
        }}
      >
        Create Page <i></i>
      </button>

      <div>
        <Lottie
          animationData={creatorAnimation}
          style={{
            position: "absolute",
            // height: "50vh",
            width: "20vw",
            bottom: "2vh",
            left: "10vh",
          }}
        />
      </div>
      <div>
        <Lottie
          animationData={donateboxAnimation}
          style={{
            position: "absolute",
            // height: "50vh",
            width: "35vw",
            bottom: "5vh",
            right: "0vh",
          }}
        />
      </div>
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
