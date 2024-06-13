import UsersTable from '../../components/UsersTable';
import { PageWrapper } from '../../styles/Global';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/SideBar';

const CommissionPage = () => {

    const {id, type} = useParams()
    const navigate = useNavigate();

    return (
        <PageWrapper>
            <Header/>
            <Sidebar defaultOpen={false}/>
            <Button commomButton onClick={()=>{navigate(`/${type}/${id}/transacao/criar`)}}>
                Nova Transação
            </Button>
            <UsersTable title='Comissão' subTitle='Geral' />
        </PageWrapper>
    );
}

export default CommissionPage;