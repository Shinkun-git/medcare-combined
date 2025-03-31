"use client";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import Footer from "../components/layouts/Footer/Footer";
import styles from "./page.module.css";
import { Montserrat } from "next/font/google";
import DoctorCard from "../components/layouts/DoctorCard/DoctorCard";
import FilterSection from "../components/UI/FilterSection/FilterSection";
import PagesFrame from "../components/UI/PagesFrame/PagesFrame";
// import doctorData from "../../../public/doctorData/doctorData.json";
import SearchDoctor from "../components/UI/SearchDoctor/SearchDoctor";

const MontserratFont = Montserrat({ subsets: [], weight: "500" });

type Doctor = {
    doc_id: number;
    name: string;
    degree: string;
    specification: string;
    experience: number;
    rating: number;
    image_url: string;
};

const AppointmentPage = () => {
    const { isAuthenticated, loading } = useAuth(); // ✅ Always call hooks at the top
    const router = useRouter();
    // const firstFetch = useRef(false); // ✅ Start as `false`
    
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [totalDoctors, setTotalDoctors] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ rating: "Show All", experience: null, gender: "Show All" });
    const [searchValue, setSearchValue] = useState("");

    // ✅ Always call useEffect, but control logic inside it
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        }
    }, [isAuthenticated, loading, router]);

    // ✅ Ensure useEffect executes every render, but controls early exits
    useEffect(() => {
        const fetchDoctors = async () => {
            if (loading || !isAuthenticated ) return; // ✅ Ensures it only runs once

            const queryParams = new URLSearchParams({
                page: currentPage.toString(),
                limit: "6",
            });

            if (searchValue.trim() !== "") {
                queryParams.append("searchQuery", searchValue);
            } else {
                if (filters.rating !== "Show All") queryParams.append("rating", String(filters.rating.slice(0,1)));
                if (filters.experience !== null) queryParams.append("experience", String(filters.experience));
                if (filters.gender !== "Show All") queryParams.append("gender", filters.gender);
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/doctors/search?${queryParams}`, {
                    credentials: "include",
                });

                if (!response.ok) throw new Error(`Response failed for search doctor.`);
                const { data } = await response.json();

                setDoctors(data.data);
                setTotalDoctors(data.total);
                setTotalPages(data.pages);

            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        
        fetchDoctors(); // ✅ Always call useEffect function
    }, [currentPage, filters, searchValue, loading, isAuthenticated]);

    // ✅ Remove duplicate `if (loading)` check

    const onSearch = (searchValue: string) => {
        setSearchValue(searchValue);
    };

    const updateFilter = (key: string, value: string) => {
        let newValue: string | null = value;
        if (key === "experience" && value === "Show All") newValue = null;

        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: newValue,
        }));
        setCurrentPage(1);
    };

    return (
        <>
            <main className={styles.container}>
                {/* ✅ Instead of hiding `main`, show a loading message */}
                {loading ? (
                    <p>Loading...</p>
                ) : isAuthenticated ? (
                    <>
                        <section className={`${styles.searchField} ${MontserratFont.className}`}>
                            <span>Find a doctor at your own ease</span>
                            <SearchDoctor onSearch={onSearch} />
                        </section>

                        <section className={styles.donateSection}>
                            <section className={styles.donateTitle}>
                                <span>{totalDoctors} doctors available</span>
                                <div>Book appointments with minimum wait-time & verified doctor details</div>
                            </section>

                            <section className={styles.donateContent}>
                                <div id={styles.donateAside}>
                                    <div id={styles.donateAsideTop}>
                                        <span>Filter By:</span>
                                        <button onClick={() => {
                                            setFilters({ rating: "Show All", experience: null, gender: "Show All" });
                                            setCurrentPage(1);
                                        }}>Reset</button>
                                    </div>

                                    <aside>
                                        <FilterSection
                                            title="Rating"
                                            radioName="rating"
                                            options={["Show All", "1 star", "2 star", "3 star", "4 star", "5 star"]}
                                            selectedValue={filters.rating !== null ? `${filters.rating}` : "Show All"}
                                            onFilterChange={(value) => updateFilter("rating", value)}
                                        />

                                        <FilterSection
                                            title="Experience"
                                            radioName="experience"
                                            options={["15+ years", "10-15 years", "5-10 years", "3-5 years", "1-3 years", "0-1 years"]}
                                            selectedValue={filters.experience || "Show All"}
                                            onFilterChange={(value) => updateFilter("experience", value)}
                                        />

                                        <FilterSection
                                            title="Gender"
                                            radioName="gender"
                                            options={["Show All", "Male", "Female"]}
                                            selectedValue={filters.gender !== null ? filters.gender : "Show All"}
                                            onFilterChange={(value) => updateFilter("gender", value)}
                                        />
                                    </aside>
                                </div>

                                <section id={styles.doctorsContent}>
                                    {Array.isArray(doctors) && doctors.length > 0 ? (
                                        doctors.map((doctor) => (
                                            <DoctorCard
                                                key={doctor.doc_id}
                                                id={doctor.doc_id}
                                                name={doctor.name}
                                                specialty={doctor.specification}
                                                experience={doctor.experience}
                                                rating={doctor.rating}
                                                image={doctor.image_url}
                                            />
                                        ))
                                    ) : (
                                        <p>No doctors found</p>
                                    )}
                                </section>
                            </section>

                            <section className={styles.donateFooter}>
                                <PagesFrame
                                    pages={Array.from({ length: totalPages }, (_, index) => (index + 1).toString())}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    setCurrentPage={setCurrentPage}
                                />
                            </section>
                        </section>
                    </>
                ) : (
                    <p>Please log in to view this page.</p>
                )}
            </main>
            <Footer />
        </>
    );
};

export default AppointmentPage;
