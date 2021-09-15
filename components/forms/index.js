
import style from './Form.module.css';

import {forwardRef,useState,useImperativeHandle,useRef} from 'react';
import Frame from '/components/frames/frame.js';
import Field from './fields/field.js';

import {message,notification,Modal,Popconfirm,Divider} from 'antd';

const Form = forwardRef((props, ref) => {
	
	const [data,setData] = useState(props.data);

	const fieldRefs = useRef(new Array());

	useImperativeHandle(ref, () => ({
		clear:()=>{

			var refs = fieldRefs.current
			for(var i=0;i<refs.length;i++){
				refs[i].clearField();
			} 
		},
		set:(d)=>{
			var refs = fieldRefs.current
			for(var i=0;i<refs.length;i++){
				refs[i].setField(d[refs[i].getName()]);
				//refs[i].setField();
			} 
		}
	}));

	const handleSubmit = async(e)=>{
		
		e.preventDefault();
		let data = {},field,valid=true;
		var refs = fieldRefs.current
		for(var i=0;i<refs.length;i++){
			field = await refs[i].getField();
			data[field.name] = field.value;
			valid = !field.valid ? false : valid;
		}
		if(valid){
			console.log(data)
			props.onSubmit(data)
		}else{
			message.warning("Please address field errors")
		}

	}

	
	const handleChange = (p)=>{
		//console.log("FORM CHANGE")
	}

	const getSection=(section,s)=>{
		
		return(
			<div key={"section-"+s}>
				{section.label?<Divider key={"s-"+s} >{section.label}</Divider>:<></>}
				{
					data.containers.map((container,i)=>{
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
				data.fields.map((field,k)=>{
					return field.container==i? getField(field,i,k) : "" 
				})
			}
			</div>
		)
	}
	const getField = (field,i,k)=>{
		return <Field ref={(element) => {fieldRefs.current[k]=element}} key={"field-"+i+"-"+k} data={field} onChange={handleChange}/>
	}


	data.content = (
		<>
		<div className={style.form_heading}>
			<div className={style.form_heading_wrapper}>
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
					data.sections.map((section,s)=>(
						getSection(section,s)
					))
				}
	
				{	
				!props.dialog?
					(<>
					<hr/>
					<div className={style.form_actions}>
						<input className={style.submit} type="submit" defaultValue="Submit" />
						<div className={style.cancel}><a href={data.path.back.href}>Cancel</a></div>
					</div></>) 
					: 
					<></>	
				}	
				
			</div>

		</form>
		</>
	)

	return props.dialog ? 
		(<Modal visible={props.visible} onOk={handleSubmit} onCancel={props.cancel}>{data.content}</Modal>)
		:
		(<Frame user={props.user} apps={props.apps} path={data.path} background="light" data={data} active="1"  navigation="false" />)
	 

	 
})

export default Form;

export function success(data){
		notification['success']({duration:4,message:data[0],description:data[1]});
	}
export function error(data){
		notification['error']({duration:4,message:data[0],description:data[1]});
	}
 