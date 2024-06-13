import { useParams } from 'react-router-dom';
import * as S from './styles';
import SellerTable from '../../components/SellerTable';
import { CardWrapper, PageWrapper, SimpleWrapper } from '../../styles/Global';
import Header from '../../components/Header';
import Sidebar from '../../components/SideBar';
import Chart from '../../components/Chart';
import { useEffect, useState } from 'react';
import { getBusinessROI, getBusinessWallet, getTransactions } from '../../services/business';
import Cards from '../../components/Cards';

const HomePage = () => {
    const {id, type} = useParams();
    const [loadingChart, setLoadingChart] = useState(true);
    const [chartData, setChartData] = useState<any>([]);
    const [cardsData, setCardsData] = useState([
        {
            cardTitle: 'Saldo Empresarial',
            value: 0,
            isMonetaryValue: true
        },
        {
            cardTitle: 'ROI',
            value: 0,
            isMonetaryValue: true
        },
        {
            cardTitle: 'ROI %',
            value: 0
        }
    ])

    const getPieChartInfo = async (rows = 0, page = 0, businessId = id) => {
        const transactionRes = await getTransactions({rows, page, businessId})
        const walletRes = await getBusinessWallet(businessId)
        setChartData((prevState:any) => [...prevState, transactionRes.revenue, transactionRes.expense, walletRes.balance])
        setLoadingChart(false)
    }
    
    const getCardsData = async () =>{//Componentizar esses Cards
        const response = await getBusinessWallet(id)
        const roiResponse = await getBusinessROI(id, 'allTime')
        setCardsData((prevState:any)=>{
            return prevState.map((card:any) => {
                if (card.cardTitle === 'Saldo Empresarial') {
                    return {
                        ...card,
                        value: response.balance
                    };
                }
                if (card.cardTitle === 'ROI') {
                    return {
                        ...card,
                        value: roiResponse.roiValue
                    };
                }
                if (card.cardTitle === 'ROI %') {
                    return {
                        ...card,
                        value: `${roiResponse.roiPercentage}%`
                    };
                }
                return card;
            })
        })
    }

    useEffect(()=>{
        setChartData([])
        if(type === 'business'){
            getCardsData()
            getPieChartInfo()
        }
    }, [loadingChart === true])

    return (
        <PageWrapper>
            <Header isHomePage/>
            { type === 'user' && (
                <S.Wrapper>
                    <h1>Suas Vendas</h1>
                    <SellerTable title='Vendas' sellerId={id} />
                </S.Wrapper>
            )}
            { type === 'business' && (
                <SimpleWrapper>
                    <Sidebar defaultOpen={false}/>
                    <CardWrapper>
                        <Cards
                            data={cardsData}
                        />
                    </CardWrapper>
                    <h1>Over View Mensal</h1>
                    <S.Wrapper>
                        { !loadingChart && <Chart
                            title='AmericanFit'
                            type='pie'
                            labels={['Receita', 'Despesa', 'Saldo']}
                            series={chartData}
                        />}
                    </S.Wrapper>
                </SimpleWrapper>
            )}
        </PageWrapper>
    );
}

export default HomePage;