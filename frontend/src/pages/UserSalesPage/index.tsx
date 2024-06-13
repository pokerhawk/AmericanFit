import * as S from './styles'
import SellerTable from '../../components/SellerTable';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/user';
import Cards from '../../components/Cards';
import { getAllSalesById } from '../../services/sales';
import { PageWrapper } from '../../styles/Global';
import Header from '../../components/Header';
import Sidebar from '../../components/SideBar';

const UserSalesPage = () => {
    
    const { id } = useParams();
    const [user, setUser] = useState('')
    const [cardsData, setCardsData] = useState([
        {
            cardTitle: 'Valor total de vendas',
            value: 0,
            isMonetaryValue: true
        },
        {
            cardTitle: 'Comissionamento total',
            value: 0,
            isMonetaryValue: true
        }
    ])
    
    const getUsers = async () => {
        const response = await getUser(id)
        setUser(response.name)
    }
    const getCardsData = async () =>{//Componentizar esses Cards
        const response = await getAllSalesById(id)
        setCardsData(prevState=>{
            return prevState.map(card => {
                if (card.cardTitle === 'Valor total de vendas') {
                    return {
                        ...card,
                        value: Math.ceil(response.totalTransaction * 100) / 100
                    };
                }
                if (card.cardTitle === 'Comissionamento total') {
                    return {
                        ...card,
                        value: Math.ceil(response.totalCommission * 100) / 100
                    };
                }
                return card;
            })
        })
    }

    useEffect(() => {
        
        getUsers()
        getCardsData()
    }, []);

    return (
        <PageWrapper>
            <Header toBusinessHomePage/>
            <Sidebar defaultOpen={false}/>
            <S.UserTitleWrapper>{user}</S.UserTitleWrapper>
            <S.CardWrapper>
                <Cards
                    data={cardsData}
                />
            </S.CardWrapper>
            <SellerTable title='Vendas' sellerId={id} />
        </PageWrapper>
    );
}

export default UserSalesPage;