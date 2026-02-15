import iconConfig from "../../utils/icons"
import LogEntry from "../LogEntry/LogEntry"
import Styles from "./logPanel.module.css"
import { useAppContext } from "../../context/AppContext"

const LogPanel = () => {
  const { state } = useAppContext();
  const logs = state.logs ?? [];
  return (
    <div className={Styles.logPanelContainer}>
        <div className={Styles.logPanelHeader}>
            <span className={Styles.logPanelHeaderIcon}>{iconConfig.logIcon}</span>
            <span className={Styles.logPanelHeaderTitle}>Stream Events</span>
        </div>
        <div className={Styles.logPanelContent}>
          {logs.map((l, i) => (
            <LogEntry key={i} type={l.level === "event" ? "info" : l.level} message={l.message} timestamp={l.timestamp} />
          ))}
        </div>
    </div>
  )
}

export default LogPanel