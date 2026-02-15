import Header from "./components/Header/Header"
import Styles from "./app.module.css"
import InputPanel from "./components/InputPanel/InputPanel"
import VideoPlayer from "./components/VideoPlayer/VideoPlayer"
import StatisticsPanel from "./components/Statistics/StatisticsPanel"
import LogPanel from "./components/LogPanel/LogPanel"
import Controls from "./components/Controls/Controls"
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <div className={Styles.wrapper}>
        <Header />
        <main className={Styles.bodyContainer}>
          <InputPanel />
          <VideoPlayer />
          <StatisticsPanel />
          <Controls />
          <LogPanel />
        </main>
      </div>
    </AppProvider>
  );
};

export default App