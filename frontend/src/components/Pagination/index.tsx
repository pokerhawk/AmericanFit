import * as S from './styles'

export type PaginationProps = {
  lastPage: number
  currentPage: number
  setPage: (page: number) => void
}

const maxItens = 9
const maxLeft = (maxItens - 1) / 2

const Pagination = ({
  lastPage,
  currentPage,
  setPage
}: PaginationProps) => {

  const firstPage = Math.max(currentPage - maxLeft, 1)

  return (
    <S.Wrapper>
      <S.ListPage>

        {Array.from({ length: Math.min(maxItens, lastPage) }).map(
          (_itemList, index) => {
            return (
              <li key={index}>
                <S.ItemPage
                  onClick={() => setPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + firstPage}
                </S.ItemPage>
              </li>
            )
          }
        )}
      </S.ListPage>
    </S.Wrapper>
  )
}

export default Pagination