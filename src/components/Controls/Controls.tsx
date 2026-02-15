import { controlsConfig } from "../../utils/appConfig"
import DropDown from "../DropDown/DropDown"
import Styles from "./controls.module.css"
import { useAppContext } from "../../context/AppContext"
import Toggler from "../Toggler/Toggler"
import { useState } from "react"

const Controls = () => {
  const { state, dispatch } = useAppContext();
  const adaptiveBitRateEnabled = state.adaptiveBitRateEnabled;
  const [toggleState, setToggleState] = useState(adaptiveBitRateEnabled ?? true);
  const handleToggleChange = () => {
    const newValue = !toggleState;
    setToggleState(newValue);
    dispatch("SET_ADAPTIVE_BITRATE", newValue);
    dispatch("ADD_LOG", { level: "event", message: `Adaptive bitrate ${newValue ? "enabled" : "disabled"}` });
  }
  const handleControlChange = (key: string, value: string) => {
    if (key === "Playback Speed") {
      dispatch("SET_PLAYBACK_RATE", value);
      dispatch("ADD_LOG", { level: "event", message: `Playback speed set to ${value}` });
      return;
    }
    if (key === "Quality Level") {
      dispatch("SET_QUALITY", value);
      dispatch("ADD_LOG", { level: "event", message: `Quality set to ${value}` });
      return;
    }
    const control = controlsConfig.find((control) => control.key === key);
    if (control && typeof control.onSelect === "function") {
      control.onSelect(value);
    }
  };

  return (
    <div className={Styles.controlsContainer}>
      {controlsConfig.map((control) => {
        return (
          <div key={control.key} className={Styles.controlItem}>
            <span className={Styles.controlLabel}>{control.icon && <span className={Styles.icon}>{control.icon}</span>} {control.key} </span>
            <DropDown
              key={control.key}
              options={control.options}
              onSelect={(value: any) => handleControlChange(control.key, value)}
            />
          </div>
        )
      })}
      <div className={Styles.adaptiveBitRateField}>
        <div className={Styles.adaptiveBitRateLabel}>
          <span className={Styles.bitRateTitle}>
            Adaptive Bitrate
          </span>
          <span className={Styles.bitRateInfo}>Automatically adjust quality based on bandwidth</span>
        </div>
        <Toggler value={toggleState} onChange={handleToggleChange} />
      </div>
      <button className={Styles.reloadButton} onClick={() => {
        dispatch("RELOAD");
        dispatch("ADD_LOG", { level: "event", message: `Reload requested` });
      }}>
        Reload Stream
      </button>
    </div>
  )
}

export default Controls