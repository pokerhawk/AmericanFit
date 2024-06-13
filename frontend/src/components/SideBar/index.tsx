import React, { useState } from 'react';
import * as S from './styles'
import SidebarArrowLeft from '../../assets/images/icons/SidebarArrowLeft';
import SidebarArrowRight from '../../assets/images/icons/SidebarArrowRight';
import { useNavigate, useParams } from 'react-router-dom';

type SidebarProps = {
  // items: Array<ItemsProps>
  defaultOpen:boolean
}

type ItemsProps = {
  itemName: string;
  itemRef: string;
}

const Sidebar = ({
  defaultOpen
}:SidebarProps) => {

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const {id, type} = useParams();
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarItems = [
    {
      itemName: 'Vendas à confirmar',
      itemRef: 'vendas/pendentes'
    },
    {
      itemName: 'Vendedores e Comissões',
      itemRef: 'comissao'
    },
    {
      itemName: "Transações",
      itemRef: "transacao"
    },
    {
      itemName: "Nova Transação",
      itemRef: "transacao/criar"
    },
    {
      itemName: "Adicionar Mais",
      itemRef: ""
    },
  ]
  
  return (
    <S.SidebarWrapper isOpen={isOpen}>
      <S.ToggleButton onClick={toggleSidebar} isOpen={isOpen}>
        Mais {isOpen? '':<SidebarArrowRight/>}
      </S.ToggleButton>
      <S.SidebarMenu>
          <S.SidebarCloseMenu onClick={toggleSidebar}>
            <SidebarArrowLeft color='#ffffff'/>
          </S.SidebarCloseMenu>
          {sidebarItems.map((prop:ItemsProps)=>{
              return(<S.SidebarMenuItem onClick={()=>{navigate(`/${type}/${id}/${prop.itemRef}`)}}>
                  {prop.itemName}
              </S.SidebarMenuItem>)
          })}
      </S.SidebarMenu>
    </S.SidebarWrapper>
  );
};

export default Sidebar;