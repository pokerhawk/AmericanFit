import * as S from '../../styles/Global';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionsTable from '../../components/TransactionsTable';
import Sidebar from '../../components/SideBar';

const TransactionPage = () => {

    const {id, type} = useParams();
    const navigate = useNavigate();

    return (
        <S.PageWrapper>
            <Header/>
            <Sidebar defaultOpen={false}/>
            {/* <Button commomButton onClick={()=>{navigate(`/${type}/${id}/transacao/criar`)}}>
                Nova Transação
            </Button> */}
            <TransactionsTable title='Transações'/>
        </S.PageWrapper>
    );
}

export default TransactionPage;