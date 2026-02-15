import iconConfig from "../../utils/icons";
import Styles from "./logEntry.module.css"

const LogEntry = (props:{message: string, timestamp: string, type: string}) => {
    const { type } = props;
    let entryClass = Styles.logEntryContainer;
    if (type === "error") {
        entryClass += " " + Styles.errorEntry;
    } else if (type === "warning") {
        entryClass += " " + Styles.warningEntry;
    }
    const iconRender = () => {
        switch(type) {
            case "info": return <span className={Styles.logEntryType}>{iconConfig.infoIcon}</span>;
            case "warning": return <span className={Styles.logEntryType}>{iconConfig.droppedFramesIcon}</span>;
            case "error": return <span className={Styles.logEntryType}>{iconConfig.DebuggerIcon}</span>;
            default: return null;
        }
    }
  return (
    <div className={entryClass}>
        <div className={Styles.logEntryType}>{iconRender()}</div>
      <div className={Styles.logEntryContent}>
        <div className={Styles.logEntryMessage}>{props.message}</div>
        <div className={Styles.logEntryTimestamp}>{props.timestamp}</div>
      </div>
    </div>
  )
}

export default LogEntry