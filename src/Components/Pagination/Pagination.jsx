import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from "react-feather"
import { Input } from 'reactstrap';

const Pagination = ({
    currentPage,
    totalItem,
    itemsPerPage,
    visiblePageCount,
    showEllipsisAfter,
    onPageChange,
    onItemsLimitChange,
    limitSelect,
}) => {
    const [totalPages, setTotalPages] = useState(Math.ceil(totalItem / itemsPerPage));
    const [itemsPerPageLimit, setItemsPerPage] = useState(itemsPerPage);


    useEffect(() => {
        setTotalPages(Math.ceil(totalItem / itemsPerPage));
    }, [totalItem, itemsPerPage]);

    const goToPage = (page) => {
        if (page !== '..' && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const isPageActive = (page) => currentPage === page;

    const getShow = () => {
        const displayStart = totalItem > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
        const displayEnd = Math.min((currentPage - 1) * itemsPerPage + itemsPerPage, totalItem);

        return { displayStart, displayEnd };
    };

    const generateVisiblePages = () => {
        if (totalPages <= visiblePageCount) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const visiblePages = [];

        if (currentPage <= Math.ceil(visiblePageCount / 2)) {
            for (let i = 1; i <= visiblePageCount; i++) {
                visiblePages.push(i);
            }
        } else if (currentPage >= totalPages - Math.floor(visiblePageCount / 2)) {
            for (let i = totalPages - visiblePageCount + 1; i <= totalPages; i++) {
                visiblePages.push(i);
            }
        } else {
            const start = currentPage - Math.floor(visiblePageCount / 2);
            const end = currentPage + Math.floor(visiblePageCount / 2);
            for (let i = start; i <= end; i++) {
                visiblePages.push(i);
            }
        }

        if (showEllipsisAfter && currentPage > 2) {
            visiblePages.unshift('....');
        }

        if (showEllipsisAfter && currentPage + 1 < totalPages) {
            visiblePages.push('....');
        }

        return visiblePages;
    };

    const visiblePages = generateVisiblePages();

    useEffect(() => {
        if (!visiblePages.includes(currentPage)) {
            goToPage(visiblePages[0]);
        }
    }, [currentPage, visiblePages]);

    const handleItemsPerPageChange = (event) => {
        const newItemsPerPage = Number(event.target.value);
        setItemsPerPage(newItemsPerPage);
        onItemsLimitChange(newItemsPerPage);
    };

    return (
        <>
            <div className='custom-paginations'>
                <div className="entries">
                    <div className='pagination-select-container'>
                        <div className="pagi-text">Showing Limit&nbsp;</div>
                        <div className="pagi-slect">
                            <Input className="form-control form-control-inverse btn-square w-auto" name="select" type="select"
                                value={itemsPerPageLimit} onChange={handleItemsPerPageChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                                <option value={300}>300</option>
                                <option value={400}>400</option>
                                <option value={500}>500</option>
                            </Input>
                        </div>

                    </div>

                    <span>&nbsp;and {getShow().displayStart} to {getShow().displayEnd} of {totalItem} entries</span>
                </div>

                <div className="right-container">
                    {
                        currentPage === 1 ?
                            <>
                                <div className={`disabled`}>
                                    <ChevronLeft />
                                </div>
                            </>
                            :
                            <>
                                <div className={`flex left-arr`} onClick={() => goToPage(currentPage - 1)}>
                                    <ChevronLeft />
                                </div>
                            </>
                    }

                    {visiblePages.map((page, index) => (
                        <div
                            className="page-name flex"
                            key={index}
                            onClick={() => goToPage(page)}
                            disabled={currentPage === page}
                        >
                            {
                                page === '....' ?
                                    <>
                                        <div className='doted'>{page}</div>
                                    </>
                                    :
                                    <button
                                        className={`page-name-button ${isPageActive(page) ? 'active' : ''}`}
                                        type="button"
                                        disabled={page === '....'}
                                    >
                                        {page}
                                    </button>
                            }
                            {/* <button
                                className={`page-name-button ${isPageActive(page) ? 'active' : ''}`}
                                type="button"
                                disabled={page === '....'}
                            >
                                {page}
                            </button> */}
                        </div>
                    ))}
                    {
                        currentPage === totalPages ?
                            <>
                                <div className={`disabled`}>
                                    <ChevronRight />
                                </div>
                            </>
                            :
                            <>
                                <div className={`flex right-arr`} onClick={() => goToPage(currentPage + 1)}>
                                    <ChevronRight />
                                </div>
                            </>
                    }
                </div>
            </div>

        </>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalItem: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    visiblePageCount: PropTypes.number,
    showEllipsisAfter: PropTypes.bool,
    limitSelect: PropTypes.bool,
    onPageChange: PropTypes.func,
    onItemsLimitChange: PropTypes.func,
};

export default Pagination;