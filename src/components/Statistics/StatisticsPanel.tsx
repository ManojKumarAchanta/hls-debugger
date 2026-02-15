import iconConfig from "../../utils/icons"
import Styles from "./statisticsPanel.module.css"
import { useAppContext } from "../../context/AppContext"

const StatisticsPanel = () => {
  const { state } = useAppContext();
  const stats = state.stats;

  return (
    <div className={Styles.statisticsPanelContainer} >
        <div className={Styles.statisticsPanelHeader} >
            <span className={Styles.statisticsPanelIcon}>{iconConfig.DebuggerIcon}</span> Stream Statistics
        </div>
        <hr color="#1b2538" style={{border: "none", height: "1px", backgroundColor: "#1b2538"}}/>
        <div className={Styles.statisticsPanelContent} >
          <div className={Styles.statItem}>
            <div className={Styles.statHeader}><span className={Styles.statKey}>Status</span></div>
            <div className={`${Styles.statusInfo} ${Styles[state.status.toLowerCase()]}`}>{iconConfig.DebuggerIcon} {state.status}</div>
          </div>

          <div className={Styles.statItem}>
            <div className={Styles.statHeader}><span className={Styles.statKey}>Resolution</span></div>
            <div className={Styles.statInfo}>{stats?.resolution ?? "0x0"}</div>
          </div>

          <div className={Styles.statItem}>
            <div className={Styles.statHeader}><span className={Styles.statKey}>Bitrate</span></div>
            <div className={Styles.statInfo}>{stats?.bitrateKbps ?? 0} <span className={Styles.statUnit}>kbps</span></div>
          </div>

          <div className={Styles.statItem}>
            <div className={Styles.statHeader}><span className={Styles.statKey}>Bandwidth</span></div>
            <div className={Styles.statInfo}>{stats?.bandwidthKbps ?? 0} <span className={Styles.statUnit}>kbps</span></div>
          </div>

          <div className={Styles.statItem}>
            <div className={Styles.statHeader}><span className={Styles.statKey}>Buffer Length</span></div>
            <div className={Styles.statInfo}>{stats?.bufferLength ?? 0} <span className={Styles.statUnit}>s</span></div>
          </div>

          <div className={Styles.statItem}>
            <div className={Styles.statHeader}><span className={Styles.statKey}>Dropped Frames</span></div>
            <div className={Styles.statInfo}>{stats?.droppedFrames ?? 0}</div>
          </div>

        </div>
    </div>
  )
}

export default StatisticsPanel