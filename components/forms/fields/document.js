import {forwardRef,useState,useRef,useImperativeHandle,useEffect} from 'react';
import style      			from '../Form.module.css';
import { Upload, message }  from 'antd';
import { InboxOutlined }   	from '@ant-design/icons';
const { Dragger } = Upload;

const Document = forwardRef((props, ref) => {

	var defaultFileList = [{
		uid: '-1',
		name: props.data.meta?props.data.meta.filename:'',
		status: 'done',
		url:props.data.meta?props.data.meta.url:'',
		thumbUrl: props.data.meta?props.data.meta.url:'',
	}]

	const [original, setOriginal] = useState(props.data.value);
	const [value, setValue]     = useState(props.data.value);
	const [name, setName]       = useState(props.data.name||props.data.attributes.name);
	const [fileList,setFileList] = useState([...defaultFileList])

	const docRef = useRef();

	const update = () => {
		if(value && value.file){
			if (value.file.status === 'uploading' || value.file.status === 'done') {
				let flist = [...value.fileList];
				var reader = new FileReader();
				reader.onload = (event)=>{docRef.current.src = event.target.result}
				reader.readAsDataURL(value.file.originFileObj);
				setFileList(flist);
				value.file.status = "done";
			} 
			else if (value.file.status === 'error') {
				message.error(`${value.file.name} file upload failed.`);
			}
		}
	}



/* 	const  submit = async(p)=>{
		
		const fd = new FormData();
		fd.append("application", p.file.originFileObj);
		var params = {method:"POST",body:fd,headers:{'x-application':"60906b4cf5e24d7d2498642b"}}
		var res = await fetch(process.env.NEXT_PUBLIC_api_host+"/api-console/documents",params);
		var out = await res.json();
		if(p.original){
			var params = {method:"DELETE",headers:{'x-application':"60906b4cf5e24d7d2498642b"}}
			await fetch(process.env.NEXT_PUBLIC_api_host+"/api-console/documents/"+p.original,params);
		}

		_value.value = out._id
		
		return ""//_value
	} */

	const  submit = async()=>{
		let _value   =  {value:value,name:name,valid:true,error:""};
		
		_value.valid = props.data.required?value?true:false:true;
		_value.error = _value.valid&&!props.data.required?"":"This field required an image.";
		props.onChange(_value);
		if(_value.valid&&!props.dialog&&original!==value){
			const fd = new FormData();
			fd.append("application", value.file.originFileObj);
			
			var out = await client({url:"/hub-console/documents",params:{method:"POST",body:fd,ignore:'body',headers:{"Content-Type":"delete"}}})
			
			if(original){
				var _del = await client({url:process.env.NEXT_PUBLIC_api_host+"/hub-console/documents/"+original,params:{method:"DELETE"}})
			}
			_value.value = out._id
		} 
		return _value
	}

	useEffect(() => {update()},[value]);
	
	useImperativeHandle(ref, () => ({
		getName    : ()=>{return name},
		clearField : ()=>{
			docRef.current.src = '/icons/download.svg';
			setFileList([]);
			setValue();
		},
		setField   : (v)=>{setValue({...v})},
		getField   : ()=>{return submit();}
	}));


	
	
	var body = (
		<div className={style.document}>
			<Dragger 
				
				fileList = {fileList}
				multiple={false} 
				maxCount={1} 
				name={name} 

				beforeUpload={(file)=>{
/* 					var types = ["application/pdf","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
					let valid = props.data.types?props.data.types.includes(file.type) : types.includes(file.type);
					let error = valid ? error : `This file is an invalid file type`;
					props.onChange({valid:valid,error:error})
					return valid ? true : Upload.LIST_IGNORE; */
					let valid = props.data.types?props.data.types.includes(file.type):file.type.indexOf("application/")>-1;
					let error = valid ? error : `${file.name} is an invalid file type`;
					props.onChange({valid:valid,error:error})
					return valid ? true : Upload.LIST_IGNORE;
				}}

				onChange={(e)=>{setValue(e)}}

				{...props.data.attributes}>  
				
				<p className="ant-upload-drag-icon">
					{
						<img ref={docRef} src="/icons/download.png" width="48px" height="48px" />
					}
				</p>
				<p className="ant-upload-text">Click or drag document to this area to upload</p>
				<p className="ant-upload-hint">
					This field supports single files only. Please choose from .pdf, .docx, or .xlsx formats.  
				</p>
			</Dragger>
		</div>
	)
	
	return (body)
	 
})

export default Document;
