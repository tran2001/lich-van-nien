import "./App.css";
import Calendar from "../components/Calendar";

function App() {
  return (
    <div>
      <div className="tw-bg-gradient-to-r tw-from-indigo-500 tw-via-purple-500 tw-to-pink-500 tw-h-screen tw-w-screen tw-flex tw-justify-center tw-items-center">
        <Calendar />
      </div>
    </div>
  );
}

export default App;
