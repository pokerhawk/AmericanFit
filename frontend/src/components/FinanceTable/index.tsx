import DataTable, { TableColumn } from 'react-data-table-component';
import * as S from '../../styles/DataTable';
import PaginationTable from '../PaginationTable';
import { useEffect, useRef, useState } from 'react';
import { getSellersList } from '../../services/user';
import Button from '../Button';
import ExcelIcon from '../../assets/images/icons/ExcelIcon';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { useNavigate, useParams } from 'react-router-dom';
import { FinanceProps, OrderData, SectionProps } from '../../types/financeTable';

const columns: TableColumn<FinanceProps>[] = [
    {
        name: 'AmericanFit',
        selector: (row) => row.name,
        format: (row) => (row.name)
    },
    {
        name: 'Entrada/Saída',
        selector: (row) => row.email,
        format: (row) => (row.email)
    },
    {
        name: 'Descrição',
        selector: (row) => row.pix,
        format: (row) => (row.pix)
    },
    {
        name: 'Tipo',
        selector: (row) => row.commission,
        format: (row) => (`${row.commission}R$`)
    }
]

const FinanceTable = ({
    title
}: SectionProps) => {
    const { id, type } = useParams();

    const [loadTotal, setLoadTotal] = useState(false)
    const [finance, setFinance] = useState<OrderData>({
        data: [],
        count: 0,
        currentPage: 1,
        nextPage: 2,
        prevPage: 0,
        lastPage: 1
    })
    const handlePageChange = async (page:number) => {
        await financeTableSetter(3, page)
    }
    const financeTableSetter = async (rows = 3, page = 1) => {
        try {
            // const response = await getSellersList(rows, page);
            // setFinance(response) //CHANGE GET FUNCTION
        } catch (err) {
            throw err;
        }
    }
    // const exportToExcel = async () => {
    //     const totalRow = totals(finance.data)
    //     const workbook = new Workbook();
    //     const worksheet = workbook.addWorksheet("Vendas");

    //     worksheet.getRow(1).font = {
    //         name: "Comic Sans MS",
    //         family: 4,
    //         size: 12,
    //         bold: true,
    //     };

    //     worksheet.columns = [
    //         { header: 'Nome', key: 'name', width: 16 },
    //         { header: 'E-mail', key: 'email', width: 20 },
    //         { header: 'PIX', key: 'pix', width: 15 },
    //         { header: 'Comissão', key: 'commission', width: 13 },
    //         { header: 'Quantidade de Potes', key: 'quantity', width: 22 },
    //     ];

    //     users.data.map((prop: FinanceProps, index: number) => {
    //         worksheet.addRow({
    //             name: prop.name,
    //             email: prop.email,
    //             pix: prop.pix,
    //             commission: prop.commission,
    //             quantity: prop.quantity,
    //         })
    //     })
    //     const [total] = totalRow.map(prop=>{return prop.name});
    //     const [commission] = totalRow.map(prop=>{return prop.commission});
    //     const [quantity] = totalRow.map(prop=>{return prop.quantity});

    //     worksheet.addRow({
    //         name: total,
    //         commission: commission,
    //         quantity: quantity,
    //     })

    //     workbook.xlsx.writeBuffer()
    //         .then((buffer) => {
    //             const blob = new Blob([buffer], {
    //                 type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //             });
    //             saveAs(blob, `Vendedores.xlsx`);
    //         })
    // }

    useEffect(() => { //LOAD PAGE ONCE
        financeTableSetter();
    }, [])

    return (
        <S.Section>
            <S.Header>
                <h1>{title}</h1>
                {/* <Button children={'Exportar'} rightIcon={<ExcelIcon />} onClick={()=>{exportToExcel()}} exportExcelButton /> */}
            </S.Header>
            <S.Wrapper>
                <DataTable
                    columns={columns}
                    data={finance.data}
                    fixedHeader
                    noDataComponent={<p>Nenhum registro encontrado</p>}
                />
            </S.Wrapper>
            <S.Pagination>
                <PaginationTable
                    onChangePage={handlePageChange}
                    currentPage={finance.currentPage}
                    totalCount={finance.count}
                    rowsPerPage={3}
                    rowCount={finance.count}
                />
            </S.Pagination>
        </S.Section>
    )
}

export default FinanceTable;