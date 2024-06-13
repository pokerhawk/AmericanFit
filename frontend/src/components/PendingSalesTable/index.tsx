import DataTable, { TableColumn } from 'react-data-table-component';
import * as S from '../../styles/DataTable';
import PaginationTable from '../PaginationTable';
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/format/date';
import { useParams } from 'react-router-dom';
import { getPendingSales, updateSaleStatus } from '../../services/sales';
import Button from '../Button';
import SwitchOption from '../SwitchOption';
import CloseModal from '../../assets/images/icons/CloseModal';
import { SimpleWrapper } from '../CheckboxInput/style';

type Section = {
    title: string;
}

type PendingSaleProps = {
    id: string;
    saleDate: string;
    transactionValue: string;
    commission: string;
    commissionValue: string;
    paymentMethod: string;
    quantity: string;
    user: {
        name: string;
    };
}

type OrderData = {
    data: PendingSaleProps[];
    count: number;
    currentPage: number;
    nextPage: number;
    prevPage: number;
    lastPage: number;
}

const columns: TableColumn<PendingSaleProps>[] = [
    {
        name: 'Vendedor',
        selector: (row) => row.user.name,
        format: (row) => (row.user.name)
    },
    {
        name: 'Data da Venda',
        selector: (row) => row.saleDate,
        format: (row) => (formatDate(row.saleDate))
    },
    {
        name: 'Valor',
        selector: (row) => row.transactionValue,
        format: (row) => (`R$ ${(Number(row.transactionValue)/100)}`)
    },
    {
        name: 'Comissão %',
        selector: (row) => row.commission,
        format: (row) => (`${row.commission}%`)
    },
    {
        name: 'Comissão',
        selector: (row) => row.commissionValue,
        format: (row) => (`R$ ${(Number(row.commissionValue)/100)}`)
    },
    {
        name: 'Pagamento',
        selector: (row) => row.paymentMethod,
        format: (row) => (row.paymentMethod)
    },
    {
        name: 'Potes',
        selector: (row) => row.quantity,
        format: (row) => (`${row.quantity} Un.`)
    },
    {
        name: 'Resolver',
        selector: (row) => row.id,
        format: (row, index) => (
            <SwitchOption
                disableType
                setSwitch={(boolean)=>{
                    boolean?
                    updateSaleStatus(row.id, 'confirmed')
                    :''
                }}
            />
        )
    },
    {
        name: 'Negar venda',
        selector: (row) => row.id,
        format: (row) => (
        <S.ModalWrapper onClick={()=>{
            updateSaleStatus(row.id, 'denied')
            }}>
            <CloseModal/>
        </S.ModalWrapper>
        )
    }
]

const PendingSalesTable = ({
    title
}: Section) => {
    const { id } = useParams();
    const [pendingSales, setPendingSales] = useState<OrderData>({
        data: [],
        count: 0,
        currentPage: 1,
        nextPage: 2,
        prevPage: 0,
        lastPage: 1
    })

    const handlePageChange = async (page:number) => {
        await pendingSalesTableSetter(page)
    }

    const pendingSalesTableSetter = async (page = 1, rows = 15) => {
        try {
            const response = await getPendingSales(page, rows, id);
            setPendingSales(response)
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        pendingSalesTableSetter();
    }, [])

    return (
        <S.Section>
            <S.Header>
                <h1>{title}</h1>
                <S.SimpleWrapper>
                    <Button socialButton onClick={()=>{pendingSalesTableSetter()}}>Atualizar Vendas</Button>
                </S.SimpleWrapper>
            </S.Header>
            <S.Wrapper>
                <DataTable
                    columns={columns}
                    data={pendingSales.data}
                    fixedHeader
                    noDataComponent={
                        <SimpleWrapper>
                            <h3>Nenhum venda pendente</h3>
                        </SimpleWrapper>
                    }
                />
            </S.Wrapper>
            <S.Pagination>
                <PaginationTable
                    onChangePage={handlePageChange}
                    currentPage={pendingSales.currentPage}
                    totalCount={pendingSales.count}
                    rowsPerPage={15}
                    rowCount={pendingSales.count}
                />
            </S.Pagination>
        </S.Section>
    )
}

export default PendingSalesTable;
