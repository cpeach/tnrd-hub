import React      from 'react';
import style      from '../Form.module.css';
import 'antd/lib/style/index.css';
import 'antd/lib/select/style/index.css';
import 'antd/lib/pagination/style/index.css';

import {Select}   from 'antd';
const {Option} = Select;

export default class _Select extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valid:true,
			value:this.props.data.attributes.defaultValue,
			name:this.props.data.attributes.name,
			description:"",
			descriptions : {
				valid   : "",
				invalid : "This field requires a value"
			}
			
		};
		this.handleChange = this.handleChange.bind(this);
		this.getValue     = this.getValue.bind(this);
		this.getName      = this.getName.bind(this);
		this.validate     = this.validate.bind(this);
	  }

	handleChange(p) {
		console.log(p)
		
		this.setState({value:p},function(){
			this.props.onChange?this.props.onChange(this.validate()):null;	  
		});
	}
	
	getValue(){return this.state.value}
	getName(){return this.state.name}
	
	validate(){
		var v     = this.state.value;
		var valid = true;
		
	// 	check string
		valid = this.props.required?v.length>0?true:false:valid;
		let description = valid ? this.state.descriptions.valid : this.state.descriptions.invalid;
		
		this.setState({value:v,valid:valid,description:description})
		
		return {valid:valid,value:v,description:description};
	}
	
	 render() { 
		
		return (
			<Select className={style.multi_select} ref="field" {...this.props.data.attributes} style={{ width: '100%',fontSise:"9px"}} bordered={false} onChange={this.handleChange}>
				{
					this.props.data.options.map(option=>(
						<Option key={option.name} value={option.value}>{option.label}</Option>
					))
				}
			</Select>
		)
	 }
}
