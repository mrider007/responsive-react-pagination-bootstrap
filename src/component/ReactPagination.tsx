import * as React from "react";
import { useState, useEffect } from "react";
import  Pagination from "react-bootstrap/Pagination";

interface EllipsisPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  md?: number;
  lg?: number;
}

const EllipsisPagination: React.FC<EllipsisPaginationProps> = ({ totalPages, currentPage, onPageChange, md, lg }) => {
  const [visiblePages, setVisiblePages] = useState<number>(lg || 10);
  const ellipsis = <Pagination.Ellipsis disabled />;

  useEffect(() => {
    const updateVisiblePages = () => {
      const newVisiblePages = window.innerWidth < 900 ? md || 5 : lg || 10;
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

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      // If the total number of pages is greater than visible pages, show ellipsis
      const leftEllipsis = currentPage > Math.floor(visiblePages / 2) + 1;
      const rightEllipsis = currentPage < totalPages - Math.floor(visiblePages / 2);

      if (!leftEllipsis) {
        // Show pages without left ellipsis
        for (let i = 1; i <= visiblePages; i++) {
          items.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => onPageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
        items.push(ellipsis);
      } else if (!rightEllipsis) {
        // Show pages without right ellipsis
        items.push(ellipsis);
        for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
          items.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => onPageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
      } else {
        items.push(ellipsis);
        for (let i = currentPage - Math.floor(visiblePages / 2); i <= currentPage + Math.floor(visiblePages / 2); i++) {
          items.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => onPageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
        items.push(ellipsis);
      }
    }

    return items;
  };

  return (
    <Pagination>
      {generatePaginationItems()}
    </Pagination>
  );
};

export default EllipsisPagination;