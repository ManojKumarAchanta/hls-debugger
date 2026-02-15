import Styles from "./toggle.module.css";

type Props = {
  value: boolean;
  onChange?: (checked: boolean) => void;
};

const Toggler = (props: Props) => {
  const { value, onChange } = props;
  return (
    <label className={Styles.switch}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <span className={Styles.slider + " " + Styles.round}></span>
    </label>
  );
};

export default Toggler