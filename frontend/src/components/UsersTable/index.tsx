import DataTable, { TableColumn } from 'react-data-table-component';
import * as S from '../../styles/DataTable';
import PaginationTable from '../PaginationTable';
import { useEffect, useRef, useState } from 'react';
import { getSellersList } from '../../services/user';
import EyeIcon from '../../assets/images/icons/EyeIcon';
import { OrderData, SectionProps, UsersProps, totalProps } from '../../types/usersTable';
import Button from '../Button';
import ExcelIcon from '../../assets/images/icons/ExcelIcon';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { useParams } from 'react-router-dom';
import { dateProps } from '../../services/business';

const columns: TableColumn<UsersProps>[] = [
    {
        name: 'Nome',
        selector: (row) => row.name,
        format: (row) => (row.name)
    },
    {
        name: 'E-mail',
        selector: (row) => row.email,
        format: (row) => (row.email)
    },
    {
        name: 'Chave pix',
        selector: (row) => row.pix,
        format: (row) => (row.pix)
    },
    {
        name: 'Comissão à pagar',
        selector: (row) => row.commission,
        format: (row) => (`R$ ${(Number(row.commission)/100)}`)
    },
    {
        name: 'Potes',
        selector: (row) => row.quantity,
        format: (row) => (`${row.quantity} Un.`)
    },
    {                               //ARRUMAR AQUI
        name: 'Vendas',
        selector: (row) => row.businessId,
        format: (row) => (
            <a href={`/business/${row.id}/vendas/${row.businessId}`} >
                <EyeIcon />
            </a >
        )
    }
]

const totalColumn: TableColumn<totalProps>[] = [
    {
        name: 'Geral',
        selector: (row) => row.name,
        format: (row) => (row.name)
    },
    {
        name: 'Comissão',
        selector: (row) => row.commission,
        format: (row) => (`R$ ${(Number(row.commission)/100)}`)
    },
    {
        name: 'Quantidade',
        selector: (row) => row.quantity,
        format: (row) => (`${row.quantity} Un.`)
    },
]

const UsersTable = ({
    title, subTitle
}: SectionProps) => {

    const { id, type } = useParams();
    const [loadTotal, setLoadTotal] = useState(false);
    const [users, setUsers] = useState<OrderData>({
        data: [],
        count: 0,
        currentPage: 1,
        nextPage: 2,
        prevPage: 0,
        lastPage: 1
    })
    const handlePageChange = async (page:number, totalCount: number) => {
        await usersTableSetter(3, page)
    }
    const usersTableSetter = async (rows = 3, page = 1, type:dateProps = 'allTime') => {
        try {
            const response = await getSellersList(rows, page, type);
            setUsers(response)
        } catch (err) {
            throw err;
        }
    }
    const totals = (data:UsersProps[]) =>{
        const commission = data.map(prop=>{return prop.commission}).reduce((partialSum, a) => partialSum + a, 0)
        const quantity = data.map(prop=>{return prop.quantity}).reduce((partialSum, a) => partialSum + a, 0)
        return [{
            name: 'Total',
            commission,
            quantity
        }];
    }
    const exportToExcel = async () => {
        const totalRow = totals(users.data)
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("Vendas");

        worksheet.getRow(1).font = {
            name: "Comic Sans MS",
            family: 4,
            size: 12,
            bold: true,
        };

        worksheet.columns = [
            { header: 'Nome', key: 'name', width: 16 },
            { header: 'E-mail', key: 'email', width: 20 },
            { header: 'PIX', key: 'pix', width: 15 },
            { header: 'Comissão', key: 'commission', width: 13 },
            { header: 'Quantidade de Potes', key: 'quantity', width: 22 },
        ];

        users.data.map((prop: UsersProps, index: number) => {
            worksheet.addRow({
                name: prop.name,
                email: prop.email,
                pix: prop.pix,
                commission: prop.commission,
                quantity: prop.quantity,
            })
        })
        const [total] = totalRow.map(prop=>{return prop.name});
        const [commission] = totalRow.map(prop=>{return prop.commission});
        const [quantity] = totalRow.map(prop=>{return prop.quantity});

        worksheet.addRow({
            name: total,
            commission: commission,
            quantity: quantity,
        })

        workbook.xlsx.writeBuffer()
            .then((buffer) => {
                const blob = new Blob([buffer], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });
                saveAs(blob, `Vendedores.xlsx`);
            })
    }

    useEffect(() => {
        usersTableSetter();
        if(type === "business"){
            setLoadTotal(true)
        }
    }, [])

    return (
        <S.Section>
            <S.Header>
                <h1>{title}</h1>
                <h3>{subTitle}</h3>
                <Button children={'Exportar'} rightIcon={<ExcelIcon />} onClick={()=>{exportToExcel()}} exportExcelButton />
            </S.Header>
            <S.Wrapper>
                <DataTable
                    columns={columns}
                    data={users.data}
                    fixedHeader
                    noDataComponent={<p>Nenhum registro encontrado</p>}
                />
                { loadTotal && (
                    <DataTable
                        columns={totalColumn}
                        data={totals(users.data)}
                        fixedHeader
                        noDataComponent={<p>Nenhum registro encontrado</p>}
                    />
                )}
            </S.Wrapper>
            <S.Pagination>
                <PaginationTable
                    onChangePage={handlePageChange}
                    currentPage={users.currentPage}
                    totalCount={users.count}
                    rowsPerPage={3}
                    rowCount={users.count}
                />
            </S.Pagination>
        </S.Section>
    )
}

export default UsersTable;