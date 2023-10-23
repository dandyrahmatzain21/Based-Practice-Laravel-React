export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <>
            <div className="join flex justify-center items-center">
                <button id="previous" className="join-item btn" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>«</button>
                <button className="join-item btn">Page {currentPage} / {totalPages}</button>
                <button className="join-item btn" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>»</button>
            </div>
        </>
    );
}
