
import style from './Form.module.css';

import {useRef,useState} from 'react';
import Frame from '/components/frames/frame.js';
import Field from './fields/field.js';

import {message,Popconfirm,Divider} from 'antd';

export default function Form(props)  {

	var data = props.data;
	var form = props.data.form;

	const fieldRefs = useRef(new Array());

	const handleSubmit = async(e)=>{
		
		e.preventDefault();
		console.log("handleSubmit");
		console.log(fieldRefs.current[0].getValue())
		
		/* 
		let valid = true;
		let data = {};
		for(let ref in this.refs){
			data[this.refs[ref].getName()] = await this.refs[ref].getValue();
			valid = this.refs[ref].validate().valid ? valid : false;
		}
		console.log(data)
		valid ? this.props.onSubmit(data) : alert("You have issues") */
		
	}

	const handleChange = (p)=>{
		console.log("FORM CHANGE")
	}

	const getSection=(section,s)=>{
		
		return(
			<div key={"section-"+s}>
				<Divider key={"s-"+s}>{section.label}</Divider>
				{
					form.containers.map((container,i)=>{
						if(container.section===s){
							return getContainers(container,i)
						}
					})
				}
			</div>
		)
		
	}

	const getContainers = (container,i)=>{
		return (
			<div className={style.container} key={"container-fields-"+i}>
			{	
				form.fields.map((field,k)=>{
					return field.container==i? getField(field,i,k) : "" 
				})
			}
			</div>
		)
	}
	const getField = (field,i,k)=>{
		
		return <Field ref={(element) => fieldRefs.current.push(element)} key={"field-"+i+"-"+k} data={field} onChange={handleChange}/>
/* 		return (

			<div key={"field-"+i+"-"+k} className={style.field} >
				<label>First Name</label>
				<p>Provide a name to reference this application. Without a name users will not know what this is for.</p>
				<div>
					<input className={style.input} type="text" />
				</div>
			</div>

		) */
	}


	data.content = (
		<>
		<div className={style.form_heading}>
			<div className={style.form}>
				<img src="/icons/form.png" />
				<div>
					<label>{data.subtitle}</label>
					<h1>{data.title}</h1>
				</div>
			</div>
		</div>
		<form onSubmit={handleSubmit} className={style.form}>

			<div className={style.form_panel}>
				
				{
					form.sections.map((section,s)=>(
						getSection(section,s)
					))
				}
	
				<hr/>

				<div className={style.form_actions}>
					<input className={style.submit} type="submit" defaultValue="Submit" />
					<div className={style.cancel}><a href={data.path.back.href}>Cancel</a></div>
				</div>			
				
			</div>

		</form>
		</>
	)
	return ( <Frame user={props.user} apps={props.apps} path={data.path} background="light" data={data} active="1"  navigation="false" />)
}



