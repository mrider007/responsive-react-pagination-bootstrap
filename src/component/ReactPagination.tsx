import * as React from "react";
import { useState, useEffect } from "react";

interface EllipsisPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  md?: number;
  lg?: number;
}

const Pagination: React.FC<EllipsisPaginationProps> = ({ totalPages, currentPage, onPageChange, md, lg }) => {
  const [visiblePages, setVisiblePages] = useState<number>(lg || 10);

  useEffect(() => {
    const updateVisiblePages = () => {
      const newVisiblePages = window.innerWidth < 900 ? (md || 5) : (lg || 10);
      setVisiblePages(newVisiblePages);
    };
    updateVisiblePages();
    window.addEventListener("resize", updateVisiblePages);
    return () => {
      window.removeEventListener("resize", updateVisiblePages);
    };
  }, [md, lg]);

  const generatePaginationItems = () => {
    const items: React.ReactNode[] = [];

    const ellipsisStyle = {
      padding: "0.5rem 0.75rem",
      cursor: "default"
    };

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <li key={i} style={{ padding: "0.5rem 0.75rem", backgroundColor: i === currentPage ? 'blue' : 'gray', color: i === currentPage ? 'white' : 'black', cursor: 'pointer' }} onClick={() => onPageChange(i)}>
            {i}
          </li>
        );
      }
    } else {
      const leftEllipsis = currentPage > Math.floor(visiblePages / 2) + 1;
      const rightEllipsis = currentPage < totalPages - Math.floor(visiblePages / 2);

      if (!leftEllipsis) {
        for (let i = 1; i <= visiblePages; i++) {
          items.push(
            <li key={i} style={{ padding: "0.5rem 0.75rem", backgroundColor: i === currentPage ? 'blue' : 'gray', color: i === currentPage ? 'white' : 'black', cursor: 'pointer' }} onClick={() => onPageChange(i)}>
              {i}
            </li>
          );
        }
        items.push(<li key="ellipsis" style={ellipsisStyle}>...</li>);
      } else if (!rightEllipsis) {
        items.push(<li key="ellipsis" style={ellipsisStyle}>...</li>);
        for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
          items.push(
            <li key={i} style={{ padding: "0.5rem 0.75rem", backgroundColor: i === currentPage ? 'blue' : 'gray', color: i === currentPage ? 'white' : 'black', cursor: 'pointer' }} onClick={() => onPageChange(i)}>
              {i}
            </li>
          );
        }
      } else {
        items.push(<li key="ellipsis" style={ellipsisStyle}>...</li>);
        for (let i = currentPage - Math.floor(visiblePages / 2); i <= currentPage + Math.floor(visiblePages / 2); i++) {
          items.push(
            <li key={i} style={{ padding: "0.5rem 0.75rem", backgroundColor: i === currentPage ? 'blue' : 'gray', color: i === currentPage ? 'white' : 'black', cursor: 'pointer' }} onClick={() => onPageChange(i)}>
              {i}
            </li>
          );
        }
        items.push(<li key="ellipsis" style={ellipsisStyle}>...</li>);
      }
    }

    return items;
  };

  return (
    <ul style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
      {generatePaginationItems()}
    </ul>
  );
};

export default Pagination;
