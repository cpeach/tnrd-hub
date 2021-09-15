
import style from './Form.module.css';

import {forwardRef,useState,useImperativeHandle,useRef,useEffect} from 'react';
import Frame from '/components/frames/frame.js';
import Field from './fields/field.js';

import {message,notification,Modal,Popconfirm,Divider} from 'antd';

const Form = forwardRef((props, ref) => {
    var dataRef = JSON.parse(JSON.stringify(props.data));
	const [data,setData]       = useState(props.data);
	const [content,setContent] = useState();

	

	const fieldRefs = useRef(new Array());

	useImperativeHandle(ref, () => ({
		clear:(_data)=>{
		
			//_data.fields.test = 234;
			
			setData(dataRef);
			/* var refs = fieldRefs.current
			for(var i=0;i<refs.length;i++){
				refs[i].clearField();
			} */
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
			props.onSubmit(data)
		}else{
			message.warning("Please address field errors")
		}

	}

	
	const handleChange = (p)=>{
		//console.log("FORM CHANGE")
	}

	const getSection=(section,s,_data)=>{
		
		return(
			<div key={"section-"+s}>
				{section.label?<Divider key={"s-"+s} >{section.label}</Divider>:<></>}
				{
					_data.containers.map((container,i)=>{
						if(container.section===s){
							return getContainers(container,i,_data)
						}
					})
				}
			</div>
		)
		
	}

	const getContainers = (container,i,_data)=>{
		return (
			<div className={style.container} key={"container-fields-"+i}>
			{	
				_data.fields.map((field,k)=>{
					return field.container==i? getField(field,i,k) : "" 
				})
			}
			</div>
		)
	}
	const getField = (field,i,k)=>{
		return <Field ref={(element) => {fieldRefs.current[k]=element}} key={"field-"+i+"-"+k} data={field} onChange={handleChange}/>
	}

	useEffect((e) => {
		console.log(e);
		console.log(data)
		if(data){
 		var _content = (
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
								getSection(section,s,data)
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
		); 
		setContent(_content)}

	},[data]);

	return (<Modal visible={props.visible} onOk={handleSubmit} onCancel={props.cancel}>{content}</Modal>)
		

	 
})

export default Form;
