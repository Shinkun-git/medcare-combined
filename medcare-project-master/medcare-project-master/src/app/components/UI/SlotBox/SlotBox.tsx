import SlotAvailable from "../SlotAvailable/SlotAvailable";
import SlotDisabled from "../SlotDisabled/SlotDisabled";
import styles from "./SlotBox.module.css"
import Image from "next/image";

interface SlotBoxProps {
    shift: "Morning" | "Afternoon";
    bookedSlots: string[];
    onSlotSelect: (time: string) => void;
    activeSlot: string|null;
}

// Define available slots for each shift
const availableSlots: Record<"Morning" | "Afternoon", string[]> = {
    Morning: ["09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "12:00:00", "12:30:00"],
    Afternoon: ["16:00:00", "16:30:00", "17:00:00", "17:30:00", "18:00:00", "18:30:00", "19:00:00", "19:30:00"],
};

const convertTo12HourFormat = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const SlotBox = ({ shift, bookedSlots, onSlotSelect, activeSlot }: SlotBoxProps) => {
    const shiftSlots = availableSlots[shift] || [];
    const bookedSlotsForShift = bookedSlots.filter(slot => shiftSlots.includes(slot));
    return (
        <main className={styles.container}>
            {/* slot top  */}
            <section className={styles.SlotTop}>
                <span className={styles.timeHead}>
                    <Image src={shift === 'Morning' ? "/sun.svg" : "/sunset.svg"} alt={"morning"}
                        width={23.43} height={21.65} />
                    <span>
                        {shift}
                    </span>
                </span>
                <span className={styles.SlotTag}>
                    {shiftSlots.length - bookedSlotsForShift.length} Slots
                </span>
            </section>

            {/* slot content */}
            <section className={styles.SlotContent}>
                <div className={styles.SlotTimings}>
                    {shiftSlots?.map((slot) => {
                        const formattedSlot = convertTo12HourFormat(slot); // Convert to 12-hour format

                        return bookedSlotsForShift.includes(slot) ? (
                            <SlotDisabled shift={shift} time={formattedSlot} key={slot}/>
                        ) : (
                            <SlotAvailable shift={shift} time={formattedSlot} key={slot} onSlotSelect={onSlotSelect} activeSlot={activeSlot}/>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}

export default SlotBox;