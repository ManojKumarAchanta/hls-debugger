import { useRef } from "react";
import iconConfig from "../../utils/icons"
import Styles from "./inputPanel.module.css"
import { useAppContext } from "../../context/AppContext";
const InputPanel = () => {
  const { dispatch } = useAppContext(); // Assuming useAppContext is available in this component
  const inputRef = useRef<HTMLInputElement>(null);
  const handleLoadStream = () => {
    const url = inputRef.current?.value;
    if (url) {
      console.log("url : ",url)
      dispatch("SET_URL", url);
      dispatch("SET_STATUS", "loading");
      dispatch("ADD_LOG", { level: "event", message: `Load requested: ${url}` });

    }
  };
  return (
    <div className={Styles.inputPanelContainer}>
        <h4 className={Styles.inputHeading}>Input Stream URL</h4>
        <div className={Styles.inputContainer}>
            <input id={Styles.inputField} type="text" placeholder="https://example.com/stream/playlist.m3u8" ref={inputRef} />
            <button className={Styles.loadButton} onClick={handleLoadStream}>
                <span>{iconConfig.playIcon}</span>Load Stream
            </button>
        </div>
    </div>
  )
}

export default InputPanel