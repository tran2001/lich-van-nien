import "./App.css";
import Calendar from "../components/Calendar";

function App() {
  return (
    <div className="tw-bg-black">
      {/* <div className="tw-bg-[url('../../assets/images/background.png')] background-container tw-bg-cover tw-h-screen tw-w-screen tw-flex tw-justify-center tw-items-center"> */}
        <div className="background-container tw-h-screen tw-w-screen tw-flex tw-justify-center tw-items-center">
        <Calendar />
      </div>
    </div>
  );
}

export default App;
