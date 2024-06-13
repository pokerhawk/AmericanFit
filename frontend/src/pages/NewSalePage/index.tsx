import NewSale from '../../components/NewSale';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../styles/Global';
import Header from '../../components/Header';

const NewSalePage = () => {

    const { id } = useParams();

    return (
        <PageWrapper>
            <Header/>
            <NewSale userId={id}/>
        </PageWrapper>
    );
}

export default NewSalePage;