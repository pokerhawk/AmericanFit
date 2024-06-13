import BusinessCreateTransaction from '../../components/BusinessCreateTransaction';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../styles/Global';
import Header from '../../components/Header';

const NewTransactionPage = () => {
    return (
        <PageWrapper>
            <Header/>
            <BusinessCreateTransaction/>
        </PageWrapper>
    );
}

export default NewTransactionPage;