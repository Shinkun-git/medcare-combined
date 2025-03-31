
import styles from "./PagesFrame.module.css";
import Image from "next/image";


type PagesFrameProps = {
    pages: string[];  // Array of page numbers as strings
    currentPage: number;  // Current active page
    totalPages: number;  // Total number of pages
    setCurrentPage: (page: number) => void;  // Function to update current page
};

const PagesFrame: React.FC<PagesFrameProps> = ({ pages, currentPage,totalPages, setCurrentPage }) => {
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    return (

        <div className={styles.pagination}>
            {/* previous page button */}
            <section className={styles.pageArrow}>
                <div>
                    <Image src={"/left-arrow.svg"} alt={"previous page"} width={8} height={16} />
                </div>
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                    Prev
                </button>
            </section>

            {/* dynamic page buttons */}
            <section className={styles.container}>
                {pages.map((page) => (
                    // console.log(`currentPage: ${currentPage}, totalPages: ${totalPages}`),
                    <button key={page} className={styles.pageButton}
                        onClick={() => setCurrentPage(Number(page))}>
                        {page}
                    </button>
                ))}
            </section>

            {/* next page button */}
            <section className={styles.pageArrow}>
                <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </button>
                <div>
                    <Image src={"/right-arrow.svg"} alt={"next page"} width={8} height={16} />
                </div>
            </section>
        </div>
    );
}

export default PagesFrame;