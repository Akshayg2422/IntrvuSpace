


interface CommonTableProps {
  isPagination?: boolean
  currentPage?: number
  noOfPage?: number
  previousClick?: () => void;
  nextClick?: () => void;
  paginationNumberClick?: (text: number) => void;
  rightArrow?:boolean,
  leftArrow?:boolean,

}

// interface ChildComponentProps {
 
//   text:number;
// }
interface GetPaginatorSetProps {
  currentPage?: number;
  totalPages?: number;
  leftArrow?:boolean;
  rightArrow?:boolean;
}




function PageNation({ isPagination, currentPage, noOfPage,previousClick, nextClick, rightArrow,leftArrow }: CommonTableProps) {



  const GetPaginatorSet = ({ currentPage, totalPages,leftArrow=false ,rightArrow=false}: GetPaginatorSetProps) => {


    if (currentPage && totalPages) {
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
      }

      return (
        <div className="">
          <ul className="pagination col justify-content-end mb-0">
        {leftArrow &&
           <li className={`${currentPage === 1 ? 'disabled' : ''} page-item `} onClick={currentPage === 1 ? undefined : previousClick}>
              <a className="">
                <i className="fas fa-angle-left"></i>
                <span className="sr-only">Previous</span>
              </a>
            </li>
    }
          {rightArrow &&  <li className={`${currentPage >= totalPages ? 'disabled' : ''} page-item `} onClick={currentPage >= totalPages ? undefined : nextClick} >
              <a className="">
                <i className="fas fa-angle-right"></i>
                <span className="sr-only">Next</span>
              </a>
            </li>
    }
          </ul>

        </div >
      )
    } else {
      return <></>
    }

  }
  return (
   <>
      {isPagination && <GetPaginatorSet currentPage={currentPage} totalPages={noOfPage}leftArrow={leftArrow} rightArrow={rightArrow} />}
      </>
  

  );
}

export { PageNation }