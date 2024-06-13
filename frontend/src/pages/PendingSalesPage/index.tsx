import { PageWrapper } from '../../styles/Global';
import Header from '../../components/Header';
import PendingSalesTable from '../../components/PendingSalesTable';
import Sidebar from '../../components/SideBar';

const PendingSalesPage = () => {
    return (
        <PageWrapper>
            <Header/>
            <Sidebar defaultOpen={false}/>
            <PendingSalesTable title='Vendas à confirmar' />
        </PageWrapper>
    );
}

export default PendingSalesPage;