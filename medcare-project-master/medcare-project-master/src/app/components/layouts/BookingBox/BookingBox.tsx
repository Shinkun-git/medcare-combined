"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Fix import for App Router
import SlotBox from "../../UI/SlotBox/SlotBox";
import styles from "./BookingBox.module.css";
import { ParamValue } from "next/dist/server/request/params";
import { useAuth } from "@/app/context/authContext";
import Calendar from "@/app/components/UI/Calendar/Calendar";

const BookingBox = ({ doctorId }: { doctorId: ParamValue }) => {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const [doctor, setDoctor] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mode, setmode] = useState("online");
    const [location, setlocation] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = useState("")
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [isBooking, setIsBooking] = useState(false);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    // Fetch doctor data
    useEffect(() => {
        const fetchDoctor = async () => {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/doctors/searchDoctor/${doctorId}`,{
                credentials: "include",
            })
            const doctorData = await response.json();
            if (doctorData.data) {
                setDoctor(doctorData.data);
                setlocation(doctorData.data.location); // Set default location
            }
            setLoading(false);
        };
        fetchDoctor();
    }, [doctorId]);

    //fetch booked slots and setting bookedSlots
    useEffect(()=>{
        const fetchBookedSlots = async()=>{
            try{
                const formatedDate = selectedDate?.toLocaleDateString("en-CA"); // Convert to YYYY-MM-DD format
                if(!formatedDate) throw new Error('NO date');
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/slots/bookedSlots`,{
                    credentials:"include",
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        doctorId,
                        input_date: formatedDate,
                    }),
                });
                if(!response.ok) throw new Error('Fetching booked slots response error');
                const parsedRes = await response.json();
                console.log("got booked slots from fetch,",parsedRes.data);
                setDate(formatedDate);
                setBookedSlots(parsedRes.data);
            } catch(err){
                console.log("Fetching error (booked slots) ",err);
            }
        }
        fetchBookedSlots();
    },[selectedDate,doctorId]);
    
    //request to book slot
    useEffect(()=>{
        const sendBookRequest = async()=>{
            try {
                if (!isBooking) return;
                console.log("Logged in user : -",user?.email);
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/slots/book`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        doctorId: doctorId,
                        email: user?.email,
                        date: date,
                        time: selectedSlot,
                        mode: mode,
                    }),
                });
    
                if (!response.ok) throw new Error("Failed to book slot");
    
                const data = await response.json();
                console.log("Slot booked successfully:", data);
                alert(`Request for Slot sent :-
                    Doctor : ${doctor.name}
                    Patient : ${user?.name}
                    Date : ${date}
                    Time : ${selectedSlot}`);
                router.push('/');
            } catch (err) {
                console.error("Error booking slot:", err);
            }
        };
        sendBookRequest();

    },[isBooking]);

    const handleSlotSelect = (time: string) => {
        setSelectedSlot(time);
        console.log("Selected Slot:", time);
    };
    
    const handleBooking = () => {
        if (!selectedSlot) {
            alert("Please select a time slot before proceeding.");
            return;
        }
        setIsBooking(true);
    };
    
    if (loading) return <p>Loading doctor details...</p>;
    if (!doctor) return <p>Doctor not found</p>;

    return (
        <main className={styles.container}>
            {/* Schedule Appointment */}
            <section className={styles.scheduleAppointment}>
                <div className={styles.scheduleHead}>
                    <p>Schedule Appointment with <span>{doctor.name}</span></p>
                    <button onClick={handleBooking} disabled={!selectedSlot}>Book Appointment</button>
                </div>

                {/* mode Selection */}
                <section className={styles.mode}>
                    <button 
                        className={mode === "online" ? styles.activeVideoBtn : styles.videoBtn}
                        onClick={() => setmode("online")}
                    >
                        Book Video Consult
                    </button>
                    <button 
                        className={mode === "offline" ? styles.activeVisitBtn : styles.visitBtn}
                        onClick={() => setmode("offline")}
                    >
                        Book Hospital Visit
                    </button>
                </section>

                {/* Location Dropdown */}
                <section className={styles.locationDrop}>
                    <select 
                        name="location" 
                        id="location" 
                        value={location} 
                        onChange={(e) => setlocation(e.target.value)}
                    >
                        <option value={doctor.location}>{doctor.location}</option>
                    </select>
                </section>
            </section>

            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            {/* Slot Selection */}
            <SlotBox shift="Morning" bookedSlots={bookedSlots} onSlotSelect={handleSlotSelect} activeSlot={selectedSlot}/>
            <SlotBox shift="Afternoon" bookedSlots={bookedSlots} onSlotSelect={handleSlotSelect} activeSlot={selectedSlot}/>

            {/* Next Button */}
            <button className={styles.nextBtn} onClick={handleBooking} disabled={!selectedSlot}>
                Next
            </button>
        </main>
    );
};

export default BookingBox;
