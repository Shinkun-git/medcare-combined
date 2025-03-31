import styles from "./FilterSection.module.css"

type FilterSectionProps = {
    title: string;
    radioName: string;
    options: string[];
    selectedValue: string;
    onFilterChange: (value: string) => void; // 👈 Accept filter change function
};

const FilterSection = ({ title, radioName, options, selectedValue, onFilterChange }: FilterSectionProps) => {

    return (
        <section className={styles.FilterSection} style={{ height: `${options.length * 47 + 47}px` }}>
            <div className={styles.FilterContent}>
                <span>{title}</span>
                <div className={styles.ListFrame}>
                    {options.map((option, index) => (
                        <div className={styles.radioButton} key={option + index}>
                            <input type="radio" name={radioName}
                                id={`${radioName}${index}`} value={option}
                                // defaultChecked={(index === 0) && (title !== 'Experience') ? true : false}
                                checked={selectedValue === option} // ✅ Sync selected state
                                onChange={(e) => onFilterChange(e.target.value)} />
                                <label htmlFor={`${radioName}${index}`}>{option}</label>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FilterSection;