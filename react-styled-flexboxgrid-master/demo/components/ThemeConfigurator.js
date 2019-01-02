
import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import UnitSelect from './UnitSelect';
import { Row, Col } from '../../src/index';

class ThemeConfigurator extends Component {

  constructor(props){
    super(props);

    //TODO have state be theme only.  Object.assign for every state change
    const { theme } = this.props;

    this.state = {
      theme: theme,
    }
  }

  //need to call onchange prop func to change the theme config
  setThemeProp = (prop, value)=> {
      const newState = Object.assign({},this.state.theme);
      newState[prop] = parseInt(value);
      this.setState({theme: newState}, this.props.onChange(this.state.theme));
    }
  


  setBreakPoint = (size, width) =>{
    const newState = Object.assign({},this.state.theme);
    newState.breakpoints[size] = parseInt(width);
    this.setState({theme: newState}, this.props.onChange(this.state.theme));
  }
  

  setUnit = (fixture, value) => {
    const newState = Object.assign({},this.state.theme);
    newState[fixture] = parseInt(value);
    this.setState({theme: newState}, this.props.onChange(this.state.theme));
  }

  render(){
    const sizes = ['xs', 'sm', 'md', 'lg'];
    const { 
      theme
    } = this.state;

    const {
      gutterWidthUnits,
      outerMarginUnits,
      breakpointUnits,
      breakpoints,
      outerMargin,
      gutterWidth,
    } = theme;

    return (
      <div>
        <h4>Configuration</h4>
  
        <Row>
          <Col xs={12} sm={6}>
            <UnitSelect onChange={(e)=>this.setUnit('gutterWidthUnits', e.target.value)}/>
            <label>gutterWidth: {gutterWidth}{gutterWidthUnits}</label><br />
            <input type='number' min={0} max={50} step={0.5} value={gutterWidth} onChange={e => this.setThemeProp('gutterWidth', e.target.value)} />
          </Col>
  
          <Col xs={12} sm={6}>
            <UnitSelect onChange={(e)=>this.setUnit('outerMarginUnits', e.target.value)}/>
            <label>outerMargin: {outerMargin}{outerMarginUnits}</label><br />
            <input type='number' min={0} max={5} step={0.5} value={outerMargin} onChange={e => this.setThemeProp('outerMargin', e.target.value)} />
          </Col>
  
          <Col xs={12} sm={6}>
            <UnitSelect onChange={(e)=>this.setUnit('breakpointUnits', e.target.value)}/>
          </Col>
          {sizes.map((size, i) =>
            <Col xs={12} sm={6} key={i}>
              <label>breakpoint.{size}: {breakpoints[size]}{breakpointUnits}</label><br />
              <input type='number' min={0} max={1500} step={5} value={breakpoints[size]} onChange={e => this.setBreakPoint(size, e.target.value)} />
            </Col>
          )}
  
          <Col>
            <label>Theme config:</label>
            <pre>{JSON.stringify(theme, null, 2)}</pre>
          </Col>
        </Row>
  
      </div>
    )
  }
}

export default ThemeConfigurator
