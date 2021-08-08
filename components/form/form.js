import React from 'react';
import style from './Form.module.css';

import Container from '/components/layout/containers/index.js';
import Field     from './fields/field.jsx';
import Submit    from './buttons/submit.jsx';
import Cancel    from './buttons/cancel.jsx';
import Icon		 from '/components/icons/antd/icons.js';

import { Popconfirm, message,Divider } from 'antd';

export default class Form extends React.Component {
	constructor(props) {
		super(props); 
		this.state = {count:'',fields:[]};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.getSection   = this.getSection.bind(this);
		this.getContainers = this.getContainers.bind(this);
		this.getField     = this.getField.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		
		let valid = true;
		let data  = {};
		for(let ref in this.refs){
			data[this.refs[ref].getName()] = this.refs[ref].getValue()
			valid = this.refs[ref].validate().valid ? valid : false;
		}
		valid ? this.props.onSubmit(data): alert("You have issues")
		
	}
	
	handleChange(p){
		console.log("FORM CHANGE")
	}
	
    handleDelete(e) {this.props.onDelete()}
	
	getSection(section,s){
		
		return(
			<>
			<Divider key={"s-"+s}>{section.label}</Divider>
			{
				this.props.form.containers.map((container,i)=>{
					if(container.section===s){
						return this.getContainers(container,i)
					}
				})
			}
			</>
		)
		return containers 
	}
	getContainers(container,i){
		return (
			<Container size="12" key={"container-fields-"+i}>
			{	
				this.props.form.fields.map((field,k)=>{
					return field.container==i? this.getField(field,i,k) : "" 
				})
			}
			</Container>
		)
	}
	getField(field,i,k){
		return <Field ref={i+"-"+k} key={i+"-"+k} data={field} onChange={this.handleChange}/>
	}

	render() {
		
		return (
			
			<form key="form" onSubmit={this.handleSubmit} className={style.form + ' _'+this.props.size} >
				{
					this.props.form.sections.map((section,s)=>(
						this.getSection(section,s)
					))
				}
				<hr />
				<Container pad='sm' key="container-actions" size="12">
					<Container align="left" size="6">
						<Submit key="submit" label={this.props.form.submit.label}  />
						<Cancel key="cancel" href={this.props.form.cancel.href} />
					</Container>
					
					{
					this.props.onDelete ? 	
					<Container align="right" size="6">
						 <Popconfirm title="Are you sure to delete this record?" onConfirm={this.handleDelete} okText="Yes" 	cancelText="No" >
							<div className={style.delete}><Icon name="DeleteFilled" /></div>	
						</Popconfirm>

					</Container> : ""
					}
				</Container>

			</form>
		)
	}
}



