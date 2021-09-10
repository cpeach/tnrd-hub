import React       from 'react';
import style       from '../Form.module.css';
import Text        from './text.js';
//import Select      from './select.jsx';
//import MultiSelect from './multi_select.jsx';
//import Image       from './image.jsx';
//import List        from './list.jsx';

export default class Field extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valid:true,
			value:'',//this.props.data.attributes.defaultValue,
			style:style.field,
			styles:{valid:style.field,invalid:style.field_invalid},
			description:""
		};
		this.handleChange = this.handleChange.bind(this);
		this.getValue     = this.getValue.bind(this);
		this.getName      = this.getName.bind(this);
		this.validate     = this.validate.bind(this);
		this.inputs       = this.inputs.bind(this);
	  }

	handleChange(p) {
		this.setState({valid:p.valid,value:p.value,description:p.description,style:p.valid?this.state.styles.valid:this.state.styles.invalid},function(){
			this.props.onChange(p);	
		});
	}
	
	getValue(){return this.refs.field.getValue();}
	getName(){return this.refs.field.getName();}
	validate(){return this.refs.field.validate();}
	
	inputs(){
		switch(this.props.data.tag){
			case 'text':
				return <Text ref="field" required={this.props.data.required} key="input-text" data={this.props.data} onChange={this.handleChange} />
			case 'select':
				return <Select ref="field" key="input-list" data={this.props.data} onChange={this.handleChange} />;
			case 'multi_select':
				return <MultiSelect ref="field" required={this.props.data.required} key="input-multi_select" data={this.props.data} onChange={this.handleChange} />
			case 'image':
				return <Image ref="field" key="input-image" data={this.props.data} onChange={this.handleChange} />;
			case 'list':
				return <List ref="field" key="input-list" data={this.props.data} onChange={this.handleChange}  />;
		}
	}
	
	
	 render() { 
		
		return (
			<div className={this.state.style + " _"+this.props.data.size}>
				<label key="label">{this.props.data.label}</label>
				<div key="inputs">
					{
						this.inputs()
					}
				</div>
				<span key="desc" >{this.state.description}</span>
			</div>		
		)
	 }
}
