"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function ProductsPagination({
  totalNumberOfPages,
}: {
  totalNumberOfPages: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const page: string | null = searchParams.get("page") || "1";

  function setCurrentPage(page: number) {
    if (page === 0 || page > totalNumberOfPages) {
      return;
    }
    return router.push(`?page=${page}`, { scroll: false });
  }
  const navigationPages = [];

  if (currentPage <= 1) {
    navigationPages.push(1, 2, 3);
  } else if (currentPage >= totalNumberOfPages) {
    navigationPages.push(
      totalNumberOfPages - 2,
      totalNumberOfPages - 1,
      totalNumberOfPages
    );
  } else {
    navigationPages.push(currentPage - 1, currentPage, currentPage + 1);
  }

  return (
    <Pagination className="dark:!text-white mt-2 min-h-16">
      <PaginationContent className="text-white">
        <PaginationItem className="text-white">
          <PaginationPrevious
            onClick={() => setCurrentPage(parseInt(page) - 1)}
            className="dark:!text-white text-black !text-sm hover:text-white"
            href="#"
          />
        </PaginationItem>

        {navigationPages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={p === currentPage}
              onClick={() => setCurrentPage(Number(p))}
              className="dark:!text-white text-black !text-sm hover:text-white"
              href="#"
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis className="text-black dark:text-white" />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => setCurrentPage(parseInt(page) + 1)}
            className="dark:!text-white text-black !text-sm hover:text-white"
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
