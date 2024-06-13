import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../styles/Global';
import Header from '../../components/Header';
import Sidebar from '../../components/SideBar';

const FinancePage = () => {

    const {id, type} = useParams();

    return (
        <PageWrapper>
            <Header/>
            <Sidebar defaultOpen={true}/>
        </PageWrapper>
    );
}

export default FinancePage;