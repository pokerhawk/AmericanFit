import * as S from './style'
import React, { ButtonHTMLAttributes, ForwardRefRenderFunction, forwardRef } from 'react';

type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
    children?: React.ReactNode;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    socialButton?: boolean;
    textButton?: boolean;
    titleButton?: boolean;
    commomButton?: boolean;
    reportButton?: boolean;
    returnButton?: boolean;
    exportExcelButton?: boolean;
} & ButtonTypes;

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({
    children, leftIcon, rightIcon, socialButton, textButton, titleButton, reportButton, returnButton, commomButton, exportExcelButton, ...props
}, ref) => {
    return (
        <S.Button
            socialButton={socialButton}
            textButton={textButton}
            titleButton={titleButton}
            reportButton={reportButton}
            returnButton={returnButton}
            commomButton={commomButton}
            exportExcelButton={exportExcelButton}
            ref={ref}
            {...props}
        >
            {leftIcon}
            {children}
            {rightIcon}
        </S.Button>
    );
}

export default forwardRef(Button);