import { Component } from "react";
import Switch, { ReactSwitchProps } from "react-switch";
import * as S from './styles'

interface SwitchProps {
  message?: string;
  setSwitch: (state:boolean)=>void
  disableType?: boolean
}

interface SwitchOptionProps {
  checked: boolean;
}

class SwitchOption extends Component<SwitchProps, SwitchOptionProps> {
  constructor(props: SwitchProps) {
    super(props);
    this.state = {
      checked: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked:boolean) {
    this.setState({ checked });
    this.props.setSwitch(!this.state.checked)
  }
  
  render() {
    return (
      <S.Wrapper>
        <S.label>{this.props.message}</S.label>
        <Switch
          onChange={this.handleChange}
          checked={this.state.checked}
          disabled={this.props.disableType && this.state.checked}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
      </S.Wrapper>
    );
  }
}

export default SwitchOption;
