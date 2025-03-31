import styles from "./SearchDoctor.module.css"
import Image from "next/image";
import { Montserrat } from "next/font/google"
import { useEffect, useState } from "react";
const MontserratFont = Montserrat({
    subsets: [],
    weight: "500"
})

type SearchDoctorProps = {
    onSearch: (searchValue: string) => void;
}
const SearchDoctor = ({onSearch}:SearchDoctorProps) => {
    const [searchValue, setSearchValue] = useState("");
    
    useEffect(() => {       //fetch on each key press in search field
        onSearch(searchValue);
    }, [searchValue]);

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`searchHandler ran : ${e.target.value}`);
        setSearchValue(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){  
            onSearch(searchValue);
        }
    }

    return (
        <section className={styles.searchDetails}>
            <label className={styles.frame1}>
                <div className={styles.frame2}>
                    <div>
                        <div className={styles.vectorFrame}>
                            {/* <label htmlFor="search"> */}
                                <Image src="/search-vector.svg" alt="search" width={20} height={20} />
                            {/* </label> */}
                        </div>
                        <input className={`${MontserratFont.className}`} 
                        type="text" name="search" id="search" 
                        placeholder="Search doctors" 
                        value={searchValue}
                        onChange={searchHandler}
                        onKeyDown={handleKeyDown}/>
                    </div>
                </div>
            </label>
            <button className={`${styles.searchBtn} ${MontserratFont.className}`}
            onClick={() => onSearch(searchValue)}>
                <span>
                    Search
                </span>
            </button>
        </section>
    );
}

export default SearchDoctor;