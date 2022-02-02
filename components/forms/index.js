
import style from './Form.module.css';

import {forwardRef,useState,useImperativeHandle,useRef} from 'react';
import Frame from '/components/frames/frame2.js';
import Field from './fields/field.js';

import {message,notification,Modal,Popconfirm,Divider} from 'antd';
import {DeleteFilled} from '@ant-design/icons';

const Form = forwardRef((props, ref) => {
	
	const [data,setData] = useState(props.data);
	const [submitted,setSubmitted] = useState(false);

	const fieldRefs = useRef(new Array());

	useImperativeHandle(ref, () => ({
		clear:()=>{

			var refs = fieldRefs.current
			for(var i=0;i<refs.length;i++){
				refs[i].clearField();
			} 
		},
		set:(d)=>{
			setTimeout(()=>{
				var refs = fieldRefs.current
				for(var i=0;i<refs.length;i++){
					refs[i].setField(d[refs[i].getName()]);
				} 
			}, 0);
		}
	}));

	const handleSubmit = async(e)=>{
		
		e.preventDefault();
		setSubmitted(true);
		let _data = {},field,valid=true;
		var refs = fieldRefs.current
		
		for(var i=0;i<refs.length;i++){
			field = await refs[i].getField();
			_data[field.name] = field.value
			valid = !field.valid ? false : valid;
		}
		
		if(valid){
			props.onSubmit(_data);
			data.onSubmit?data.onSubmit(_data):null;
		}else{
			message.warning("Please address field errors")
		}

	}

	
	const onChange = (p)=>{
		if(props.onChange && !submitted){
			props.onChange(p);
		}
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
		return <Field ref={(element) => {fieldRefs.current[k]=element}} defer={props.dialog?true:false} dialog={props.dialog} key={"field-"+i+"-"+k} data={field} onChange={onChange}/>
	}


	data.content = (
		<div className={"form center"}>
			<div className={style.form_heading }>
				<div className={style.form_heading_wrapper}>
					<img src="/icons/form.png" />
					<div>
						<h1>{data.title}</h1>
						<label>{data.subtitle}</label>
						
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
								<div className="_7 box">
									<input id="form_submit_btn" className={style.submit} type="submit" value={data.submit?data.submit:"Submit"} />
									<div className={style.cancel}><a href={data.path.back.href} align="center">Cancel</a></div>
								</div>	
								<div className="_5 box right">
									{
										props.onDelete ? 	
										<Popconfirm title="Are you sure to delete this record?" onConfirm={props.onDelete} okText="Yes" cancelText="No" >
											<div className={style.delete}><DeleteFilled /></div>	
										</Popconfirm>
										: ""
									}
								</div>
							</div>
						</>) 
						: 
						<></>	
					}	
					
				</div>

			</form>
		</div>
	)

	return props.dialog ? 
		(<Modal visible={props.visible} onOk={handleSubmit} onCancel={props.cancel}>{data.content}</Modal>)
		:
		(<Frame user={props.user} apps={props.apps} path={data.path} background="light" data={data} active="1"  navigation="false" />)
	 

	 
})

export default Form;

export function success(data){
		notification['success']({duration:6,message:data[0],description:data[1]});
	}
export function error(data){
		notification['error']({duration:6,message:data[0],description:data[1]});
	}
 