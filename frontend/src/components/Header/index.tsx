import Button from "../Button";
import TurnBackIcon from "../../assets/images/icons/TurnBackIcon";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as S from './styles'

type HeaderProps = {
    toBusinessHomePage?: boolean;
    isHomePage?: boolean;
}

const Header = ({toBusinessHomePage, isHomePage}: HeaderProps) => {

    const navigate = useNavigate();
    const {id, type, businessId} = useParams();
    const { logOut } = useAuth()    
    return (
        <S.HeaderWrapper>
            <S.BackButtonWrapper>
                {!isHomePage &&
                    <Button leftIcon={<TurnBackIcon />} onClick={() => history.back()} returnButton>Voltar</Button>
                }
            </S.BackButtonWrapper>
            <S.TitleWrapper>
                {toBusinessHomePage &&
                    <Button titleButton onClick={()=>{navigate(`/${type}/${businessId}`)}}>
                        <h1>AmericanFit</h1>
                    </Button>
                }
                {!toBusinessHomePage &&
                    <Button titleButton onClick={()=>{navigate(`/${type}/${id}`)}}>
                        <h1>AmericanFit</h1>
                    </Button>
                }
            </S.TitleWrapper>
            <S.LogOutWrapper>
                <Button leftIcon={<TurnBackIcon />} onClick={() => logOut()} returnButton>LogOut</Button>
            </S.LogOutWrapper>
        </S.HeaderWrapper>
    );
}

export default Header;
