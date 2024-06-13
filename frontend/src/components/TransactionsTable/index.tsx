import DataTable, { TableColumn } from 'react-data-table-component';
import * as S from '../../styles/DataTable';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import PaginationTable from '../PaginationTable';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatFlowDescription, formatFlowType } from '../../utils/format/transaction';
import { formatDate } from '../../utils/format/date';
import { getTransactions } from '../../services/business';
import { OrderData, TransactionsProps, TotalProps } from '../../types/transactionTable';
import ExcelIcon from '../../assets/images/icons/ExcelIcon';
import Button from '../Button';
import theme from '../../styles/styled-theme';

type Section = {
    title: string;
}

const columns: TableColumn<TransactionsProps>[] = [
    {
        name: 'Feita por',
        selector: (row) => row.createdBy,
        format: (row) => (row.createdBy)
    },
    {
        name: 'Data',
        selector: (row) => row.createdAt,
        format: (row) => (formatDate(row.createdAt))
    },
    {
        name: 'Valor',
        selector: (row) => row.flowValue,
        format: (row) => (`R$ ${(Number(row.flowValue)/100)}`),
        conditionalCellStyles: [
            {
                when: (row:TransactionsProps) => row.flowType === "revenue",
                style: {
                    color: `${theme.color.green}`
                }
            },
            {
                when: (row:TransactionsProps) => row.flowType === "expense",
                style: {
                    color: `${theme.color.lossRed}`
                }
            }
        ]
    },
    {
        name: 'Tipo',
        selector: (row) => row.flowType,
        format: (row) => (formatFlowType(row.flowType))
    },
    {
        name: 'Descrição',
        selector: (row) => row.flowDescription,
        format: (row) => (formatFlowDescription(row.flowDescription))
    },
    {
        name: 'Descrição extra',
        selector: (row) => row.extraDescription,
        format: (row) => (row.extraDescription)
    }
]

const totalColumn: TableColumn<TotalProps>[] = [
    {
        name: 'Geral',
        selector: (row) => row.name,
        format: (row) => (row.name)
    },
    {
        name: 'Entrada',
        selector: (row) => row.revenue,
        format: (row) => (`R$ ${row.revenue}`)
    },
    {
        name: 'Saida',
        selector: (row) => row.expense,
        format: (row) => (`R$ ${row.expense}`)
    },
]

const TransactionsTable = ({
    title
}: Section) => {

    const { id } = useParams();
    const [transactions, setTransactions] = useState<OrderData>({
        data: [],
        total: [
            {
                name: '',
                revenue: 0,
                expense: 0
            }
        ],
        count: 0,
        currentPage: 1,
        nextPage: 2,
        prevPage: 0,
        lastPage: 1
    })
    
    const handlePageChange = async (page:number) => {
        await transactionsTableSetter(5, page)
    }

    const transactionsTableSetter = async (rows = 5, page = 1, businessId = id) => {
        try {
            const response = await getTransactions({rows, page, businessId});
            setTransactions(response)
        } catch (err) {
            throw err;
        }
    }

    const exportToExcel = async () => {
        // const response = await excelData();
        const excelWorkbookName = 'Transações'
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(excelWorkbookName);

        worksheet.getRow(1).font = {
            name: "Comic Sans MS",
            family: 4,
            size: 12,
            bold: true,
        };

        worksheet.columns = [
            { header: 'Feita por', key: 'createdBy', width: 14 },
            { header: 'Data', key: 'date', width: 14 },
            { header: 'Valor', key: 'value', width: 13 },
            { header: 'Tipo', key: 'type', width: 13 },
            { header: 'Descrição', key: 'description', width: 14 },
            { header: 'Descrição extra', key: 'extraDescription', width: 48 },
        ];

        transactions.data.map((prop: TransactionsProps, index: number) => {
            worksheet.addRow({
                // id: index + 1,
                createdBy: prop.createdBy,
                date: formatDate(prop.createdAt),
                value: prop.flowValue,
                type: prop.flowType,
                description: prop.flowDescription,
                extraDescription: prop.extraDescription
            })
        })
        workbook.xlsx.writeBuffer()
            .then((buffer) => {
                const blob = new Blob([buffer], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });
                saveAs(blob, `${excelWorkbookName}.xlsx`);
            })
    }

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        try{
            transactionsTableSetter();
        } catch(err) {
            throw err;
        } finally {
            setIsLoading(false)
        }
    }, [])

    return (
        ( !isLoading &&
        <S.Section>
            <S.Header>
                <h1>{title}</h1>
                <Button onClick={exportToExcel} exportExcelButton rightIcon={<ExcelIcon/>}>Exportar</Button>
            </S.Header>
            <S.Wrapper>
                <DataTable
                    columns={columns}
                    data={transactions.data}
                    fixedHeader
                    noDataComponent={<p>Nenhum venda encontrada</p>}
                />
                <DataTable
                    columns={totalColumn}
                    data={transactions.total}
                    fixedHeader
                    noDataComponent={<p>Nenhum registro encontrado</p>}
                />
            </S.Wrapper>
            <S.Pagination>
                <PaginationTable
                    onChangePage={handlePageChange}
                    currentPage={transactions.currentPage}
                    totalCount={transactions.count}
                    rowsPerPage={5}
                    rowCount={transactions.count}
                />
            </S.Pagination>
        </S.Section>
        )
    )
}

export default TransactionsTable;