import * as S from './styles'
import ArrowRightPagination from '../../assets/images/icons/ArrowRightPagination';
import ArrowLeftPagination from '../../assets/images/icons/ArrowLeftPagination';
import { usePagination } from '../../hooks/usePagination';
import { PaginationChangePage } from 'react-data-table-component/dist/DataTable/types';

export type PaginationTableProp = {
    currentPage: number
    onChangePage: PaginationChangePage
    rowCount: number
    rowsPerPage: number
    totalCount: number
    totalPagesOcurrence?: number
    disabled?: boolean
}

const PaginationTable = ({
    currentPage,
    onChangePage,
    rowCount,
    rowsPerPage,
    totalCount,
    totalPagesOcurrence,
    disabled
}: PaginationTableProp) => {

    const totalPages = Math.ceil(rowCount / rowsPerPage)

    const paginationRange = usePagination({
        currentPage,
        totalCount: totalCount,
        siblingCount: 1,
        pageSize: rowsPerPage
    })
    return(
        <S.WrapperPagination>
            <S.ArrowLeftPagination
                onClick={()=>{
                    onChangePage(currentPage - 1, totalCount)
                }}
                disabled={currentPage === 1 || disabled}
            >
                <ArrowLeftPagination />
            </S.ArrowLeftPagination>
            <S.WrapperPaginationNumbers>
                {paginationRange?.map((page)=> (
                    <S.ButtonPagination
                        key={page}
                        current={currentPage === Number(page)}
                        onClick={() => (Number(page) && onChangePage(Number(page), totalCount))}
                    >
                        {page}
                    </S.ButtonPagination>
                ))}
            </S.WrapperPaginationNumbers>
            <S.ArrowRightPagination
                onClick={() => {
                    onChangePage(currentPage + 1, totalCount)}}
                disabled={
                    disabled || totalPagesOcurrence
                    ? currentPage === totalPagesOcurrence
                    : currentPage === totalPages
                }
            >
                <ArrowRightPagination />
            </S.ArrowRightPagination>
        </S.WrapperPagination>
    )
}

export default PaginationTable;