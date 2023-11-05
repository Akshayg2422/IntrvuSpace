import React from 'react'
import { Table, NoRecordsFound, Heading } from "@Components";

interface CommonPageProps {
  isPagination?: boolean
  currentPage?: number
  noOfPage?: number
  previousClick?: () => void;
  nextClick?: () => void;
  paginationNumberClick?: (text: number) => void;
  card?: boolean
}

interface ChildComponentProps {
  text: number;
}


interface GetPaginatorSetProps {
  currentPage?: number;
  totalPages?: number;
}




function PageNation({ isPagination, currentPage, noOfPage, previousClick, nextClick, paginationNumberClick }: CommonPageProps) {


  const GetPaginatorSet = ({ currentPage, totalPages }: GetPaginatorSetProps) => {


    if (currentPage && totalPages) {

      const children = [];
      if (currentPage && noOfPage) {


        let current_page = currentPage;
        let total_pages = noOfPage;

        let page_range = 5
        let page_range_start = current_page - Math.floor(page_range / 2)
        let page_range_end = current_page + Math.floor(page_range / 2)

        if (page_range_start <= 0) {
          let adjust = Math.abs(page_range_start)
          page_range_start = page_range_start + adjust + 1
          page_range_end = page_range_end + adjust + 1
        }

        if (total_pages < page_range_end) {
          let adjust = page_range_end - total_pages
          page_range_end = total_pages
          page_range_start = page_range_start - adjust
          if (page_range_start <= 0)
            page_range_start = 1
        }

        const ChildComponent = ({ text }: ChildComponentProps) => {
          return (<li className={`${currentPage + "" === text + "" ? 'active' : ''} page-item `} onClick={() => { if (paginationNumberClick) paginationNumberClick(text) }}  ><a className="page-link" >{text}</a></li>);
        }


        for (var i = page_range_start; i <= page_range_end; i++) {
          children.push(<ChildComponent text={i} /> as never)
        }


      }

      return (
        <div className="mb-3 pointer">
          <ul className="pagination col justify-content-end mb-0">
            <li className={`${currentPage === 1 ? 'disabled' : ''} page-item `} onClick={currentPage === 1 ? undefined : previousClick}>
              <a className="page-link">
                <i className="fas fa-angle-left"></i>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {children}
            <li className={`${currentPage >= totalPages ? 'disabled' : ''} page-item `} onClick={currentPage >= totalPages ? undefined : nextClick} >
              <a className="page-link">
                <i className="fas fa-angle-right"></i>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>

        </div >
      )
    } else {
      return <></>
    }

  }
  return (
    <>
      {isPagination && <GetPaginatorSet currentPage={currentPage} totalPages={noOfPage} />}

    </>
  );
}

export { PageNation }