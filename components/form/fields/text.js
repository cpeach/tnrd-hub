import React,{useRef,useState} from 'react';
import style from '../Form.module.css';

export default class Text extends React.Component {
	
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
	

	handleChange(e) {
		
		this.setState({value:event.target.value},function(){
			this.props.onChange?this.props.onChange(this.validate()):null;	  
		});
	}
	
	getValue(){return this.state.value}
	getName(){return this.state.name}
	
	validate(){
		var v     = this.state.value;
		var valid = true;
		
	// 	check string
		valid = this.props.required?v.trim()===""?false:true:valid;
		let description = valid ? this.state.descriptions.valid : this.state.descriptions.invalid;
		
		this.setState({value:v,valid:valid,description:description})
		
		return {valid:valid,value:v,description:description};
	}
	render(){ 
		return (<input  className={style.input} {...this.props.data.attributes} onChange={this.handleChange}/>)
	 }
}
