import { ReactNode } from 'react';
import * as S from './styles';
import Button from '../Button';
import CloseModal from '../../assets/images/icons/CloseModal';

type ModalProps = {
    title: string;
    isOpen: boolean;
    closeModal: Function;
    children?: ReactNode;
}

const Modal = ({ title, isOpen, closeModal, children }: ModalProps) => {//colocar prop, ref
    return (
        <S.Wrapper>
            {(isOpen &&
                <S.ModalWrapper>
                    <S.Modal>
                        <S.ModalHeader>
                            <h1>{title}</h1>
                            <Button commomButton onClick={()=>{closeModal()}}>{<CloseModal/>}Fechar</Button>
                        </S.ModalHeader>
                        <S.ModalContent>
                            {children}
                        </S.ModalContent>
                    </S.Modal>
                </S.ModalWrapper>
            )}
        </S.Wrapper>
    )
}

export default Modal;
