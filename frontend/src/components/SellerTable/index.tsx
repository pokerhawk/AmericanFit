import DataTable, { TableColumn } from 'react-data-table-component';
import * as S from '../../styles/DataTable';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import PaginationTable from '../PaginationTable';
import { useEffect, useState } from 'react';
import { formatDate, formatStatus } from '../../utils/format/date';
import { useNavigate, useParams } from 'react-router-dom';
import { getSales } from '../../services/sales';
import Button from '../Button';
import ExcelIcon from '../../assets/images/icons/ExcelIcon';
import theme from '../../styles/styled-theme';
import EyeIcon from '../../assets/images/icons/EyeIcon';
import Modal from '../Modal';
import { ColumnWrapper, RowWrapper } from '../../styles/Global';

type Section = {
    title: string;
    sellerId: string | undefined;
}

type SaleProps = {
    id: string;
    saleDate: string;
    transactionValue: string;
    commission: string;
    commissionValue: string;
    quantity: string;
    status: string;
    paymentMethod: string;
    clientAddress: any;
}

type OrderData = {
    data: SaleProps[]
    count: number
    currentPage: number
    nextPage: number
    prevPage: number
    lastPage: number
}

const SellerTable = ({
    title, sellerId
}: Section) => {

    const columns: TableColumn<SaleProps>[] = [
        {
            name: 'Data da Venda',
            selector: (row) => row.saleDate,
            format: (row) => (formatDate(row.saleDate))
        },
        {
            name: 'Forma de Pagamento',
            selector: (row) => row.paymentMethod,
            format: (row) => (row.paymentMethod)
        },
        {
            name: 'Valor da Venda',
            selector: (row) => row.transactionValue,
            format: (row) => (`R$ ${(Number(row.transactionValue)/100)}`)
        },
        {
            name: 'Comissão %',
            selector: (row) => row.commission,
            format: (row) => (`${row.commission}%`)
        },
        {
            name: 'Valor da Comissão',
            selector: (row) => row.commissionValue,
            format: (row) => (`R$ ${(Number(row.commissionValue)/100)}`)
        },
        {
            name: 'Status',
            selector: (row) => row.status,
            format: (row) => (formatStatus(row.status)),
            conditionalCellStyles: [
                {
                    when: (row:SaleProps) => formatStatus(row.status) === "confirmado",
                    style: {
                        color: `${theme.color.green}`
                    }
                },
                {
                    when: (row:SaleProps) => formatStatus(row.status) === "pendente",
                    style: {
                        color: `${theme.color.orange}`
                    }
                },
                {
                    when: (row:SaleProps) => formatStatus(row.status) === "negado",
                    style: {
                        color: `${theme.color.lossRed}`
                    }
                }
            ]
        },
        {
            name: 'Potes',
            selector: (row) => row.quantity,
            format: (row) => (`${row.quantity} Un.`)
        },
        {
            name: 'Dados do Cliente',
            selector: (row) => row.clientAddress,
            format: (row) => (
                <div onClick={()=>{
                    setClientInfo(row.clientAddress)
                    setIsModalOpen(!isModalOpen)
                }}>
                    <EyeIcon/>
                </div>
            )
        }
    ]

    const [sales, setSales] = useState<OrderData>({
        data: [],
        count: 0,
        currentPage: 1,
        nextPage: 2,
        prevPage: 0,
        lastPage: 1
    })

    const {id, type} = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [clientInfo, setClientInfo] = useState<any|undefined>({
        id: '',
        name: '',
        phone: '',
        zipcode: '',
        address: '',
        number: '',
        neighborhood: '',
        complement: '',
        city: '',
        state: '',
        deliveryDate: ''
    })
    
    const handlePageChange = async (page:number) => {
        await salesTableSetter(page)
    }

    const salesTableSetter = async (page = 1, rows = 5, id = sellerId) => {
        try {
            const response = await getSales({page, rows, id});
            setSales(response)
        } catch (err) {
            throw err;
        }
    }

    const exportToExcel = async () => {
        // const response = await excelData();
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("Vendas");

        worksheet.getRow(1).font = {
            name: "Comic Sans MS",
            family: 4,
            size: 12,
            bold: true,
        };

        worksheet.columns = [
            { header: 'Data da Venda', key: 'saleDate', width: 16 },
            { header: 'Forma de Pagamento', key: 'paymentMethod', width: 19 },
            { header: 'Valor Transacionado', key: 'transactionValue', width: 20 },
            { header: 'Comissão %', key: 'commission', width: 13 },
            { header: 'Valor da Comissão', key: 'commissionValue', width: 19 },
            { header: 'Status', key: 'status', width: 19 },
            { header: 'Quantidade de Potes', key: 'quantity', width: 20 },
        ];

        sales.data.map((prop: SaleProps, index: number) => {
            worksheet.addRow({
                // id: index + 1,
                saleDate: prop.saleDate,
                paymentMethod: prop.paymentMethod,
                transactionValue: prop.transactionValue,
                commission: prop.commission,
                commissionValue: prop.commissionValue,
                status: prop.status,
                quantity: prop.quantity,
            })
        })
        workbook.xlsx.writeBuffer()
            .then((buffer) => {
                const blob = new Blob([buffer], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });
                saveAs(blob, `vendas.xlsx`);
            })
    }

    useEffect(() => {
        salesTableSetter();
    }, [])

    return (
        <>
            <S.Section>
                <S.Header>
                    <h1>{title}</h1>
                    {(type === "user") &&
                        <Button commomButton onClick={()=>{navigate(`/${type}/${id}/venda/criar`)}}>
                            Nova Venda
                        </Button>
                    }
                    <Button onClick={exportToExcel} exportExcelButton rightIcon={<ExcelIcon/>}>Exportar</Button>
                </S.Header>
                <S.Wrapper>
                    <DataTable
                        columns={columns}
                        data={sales.data}
                        fixedHeader
                        noDataComponent={<p>Nenhum venda encontrada</p>}
                    />
                </S.Wrapper>
                <S.Pagination>
                    <PaginationTable
                        onChangePage={handlePageChange}
                        currentPage={sales.currentPage}
                        totalCount={sales.count}
                        rowsPerPage={5}
                        rowCount={sales.count}
                    />
                </S.Pagination>
            </S.Section>
            <Modal
                title='Dados de entrega do cliente'
                isOpen={isModalOpen}
                closeModal={()=>{
                    setIsModalOpen(!isModalOpen)
                    setClientInfo(undefined)
                }}
                children={
                    <S.ModalWrapper>
                        {(clientInfo) &&
                            <ColumnWrapper>
                                <RowWrapper>
                                    <h3>Nome:</h3>
                                    {clientInfo.name}
                                </RowWrapper>
                                <RowWrapper>
                                    <h3>Telefone:</h3>
                                    {clientInfo.phone}
                                </RowWrapper>
                                <RowWrapper>
                                    <h3>CEP:</h3>
                                    {clientInfo.zipcode}
                                </RowWrapper>
                                <RowWrapper>
                                    <h3>Endereço:</h3>
                                    {clientInfo.address}
                                </RowWrapper>
                                <RowWrapper>
                                    <h3>Numero:</h3>
                                    {clientInfo.number}
                                </RowWrapper>
                                <RowWrapper>
                                    <h3>Bairro:</h3>
                                    {clientInfo.neighborhood}
                                </RowWrapper>
                                <RowWrapper>
                                    <h3>Cidade:</h3>
                                    {clientInfo.city}
                                </RowWrapper>
                                <RowWrapper>
                                    <h3>Estado:</h3>
                                    {clientInfo.state}
                                </RowWrapper>
                                <RowWrapper>
                                    <h3>Complemento:</h3>
                                    {clientInfo.complement}
                                </RowWrapper>
                                <RowWrapper>
                                    <h3>Data de entrega:</h3>
                                    {formatDate(clientInfo.deliveryDate)}
                                </RowWrapper>
                            </ColumnWrapper>
                        }
                        {(!clientInfo) &&
                            <h2>Nenhum dados de cliente encontrado</h2>
                        }
                    </S.ModalWrapper>
                }
            />
        </>
    )
}

export default SellerTable;