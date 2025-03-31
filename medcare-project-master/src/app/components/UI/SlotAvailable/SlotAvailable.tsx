import styles from "./SlotAvailable.module.css"

interface SlotAvailableProps {
    time: string;
    shift: string;
    onSlotSelect: (time: string) => void;
    activeSlot: string | null;
}

const SlotAvailable = ({ time, shift, onSlotSelect, activeSlot }: SlotAvailableProps) => {
    return (
        <button className={styles.slotBtn} onClick={() => onSlotSelect(time)}
            style={{
                backgroundColor: activeSlot === time ? "#1C4A2A" : "",
                color: activeSlot === time ? "white" : ""
            }}>
            {time.slice(0, time.length - 3)}{shift === "Morning" ? " AM" : " PM"}
        </button>
    );
}

export default SlotAvailable;