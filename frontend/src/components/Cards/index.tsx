import * as S from './styles';

type CardsProps = {
    data: Array<cardDataProps>;
}

type cardDataProps = {
    cardTitle: string;
    value?: number;
    isMonetaryValue?: boolean;
}

const Cards = ({ data }:CardsProps) => {
    return (
        data.map((props)=>{
            return(
                <S.Wrapper>
                    <S.Label>{props.cardTitle}</S.Label>
                    {
                        props.isMonetaryValue
                        ? <S.Value>{`R$ ${props.value}`}</S.Value>
                        : <S.Value>{props.value}</S.Value>
                    }
                </S.Wrapper>
            )
        })
    );
}

export default Cards;
