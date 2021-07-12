// import logo from "./logo.svg";
import "./App.css";
import Weather from "./components/Weather/weather";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <Weather />
      <Footer />
    </div>
  );
}

export default App;
