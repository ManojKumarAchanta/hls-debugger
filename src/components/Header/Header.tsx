import iconConfig from "../../utils/icons"
import Styles from "./header.module.css"

const Header = () => {
  return (
    <header className={Styles.header}>
        <div className={Styles.leftHeader}>
            <div className={Styles.iconContainer}>
                {iconConfig.DebuggerIcon}
            </div>
            <div className={Styles.headingContainer}>
                <h1 className={Styles.heading}>HLS Debugger</h1>
                <p className={Styles.subtitle}>Developer Stream Analysis Tool</p>
            </div>
        </div>
        <div className={Styles.rightHeader}>
            <div className={Styles.shoutout}>
            <strong className={Styles.personalBrand}>Made with <span style={{color: "#e25555", fontSize: "14px"}}>❤</span> by <span className={Styles.name}>{"Manoj Kumar Achanta"}</span></strong>
            </div>
        </div>
    </header>
  )
}

export default Header