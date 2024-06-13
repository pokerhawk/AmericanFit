import LogoLoginPage from '../../assets/images/logos/LogoLoginPage';
import * as S from './styles';

interface IFormHeaderProps {
    title: string;
    subtitle: string;
}

const FormHeader = ({ title, subtitle }: IFormHeaderProps) => {
    return (
        <>
            {/* <LogoLoginPage /> */}
            <S.Header1>{title}</S.Header1>
            <S.Header3>{subtitle}</S.Header3>
        </>
    );
}

export default FormHeader;
