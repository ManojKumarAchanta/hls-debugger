import Styles from "./dropDown.module.css"

type OptionLike = string | { label: string; value: string };

const DropDown = (props: any) => {
    const { options = [], onSelect = () => {}, selectedOption } = props;

    // normalize options to objects
    const normalized: { label: string; value: string }[] = options.map((opt: OptionLike) => {
        if (typeof opt === "string") return { label: opt, value: opt };
        return { label: opt.label, value: opt.value };
    });

    const currentValue = selectedOption ?? (normalized.length ? normalized[0].value : "");

    return (
        <div className={Styles.dropDownContainer}>
            <select
                className={Styles.dropDownSelect}
                value={currentValue}
                onChange={(e) => onSelect(e.target.value)}
            >
                {normalized.map((option, i) => (
                    <option key={option.value || i} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropDown