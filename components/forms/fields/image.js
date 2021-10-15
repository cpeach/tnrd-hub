import {forwardRef,useState,useRef,useImperativeHandle,useEffect} from 'react';
import Image                from 'next/image';
import style      			from '../Form.module.css';
import { Upload, message }  from 'antd';
import { InboxOutlined }   	from '@ant-design/icons';
import ImgCrop 				from 'antd-img-crop';
const { Dragger } = Upload;

const _Image = forwardRef((props, ref) => {

	var defaultFileList = [{
		uid: '-1',
		name: props.data.meta?props.data.meta.filename:'',
		status: 'done',
		url:props.data.meta?props.data.meta.url:'',
		thumbUrl: props.data.meta?props.data.meta.url:'',
	}]


	const [original, setOriginal] = useState(props.data.value);
	const [value, setValue]     = useState(props.data.value);
	const [name, setName]       = useState(props.data.attributes.name);
	const [img, setImage]       = useState(props.data.meta?props.data.meta.url:'/icons/upload.svg');
	const [fileList,setFileList] = useState([...defaultFileList])

	const imgRef = useRef();

	const update = () => {
		if(value && value.file){
			if (value.file.status === 'uploading' || value.file.status === 'done') {
				let flist = [...value.fileList];
				var reader = new FileReader();
				reader.onload = (event)=>{imgRef.current.src = event.target.result}
				reader.readAsDataURL(value.file.originFileObj);
				setFileList(flist);
				value.file.status = "done";
			} 
			else if (value.file.status === 'error') {
				message.error(`${value.file.name} file upload failed.`);
			}
		}
	}



	const  submit = async()=>{
		let _value   =  {value:value,name:name,valid:true,error:""};
		console.log("submit image")
		console.log(original)
		console.log(value)
		/* _value.valid = props.data.required?value?true:false:true;
		_value.error = _value.valid?"":"This field required an image.";
		props.onChange(_value);
		if(_value.valid&&!props.dialog&&original!==value){
			const fd = new FormData();
			fd.append("image", value.file.originFileObj);
			var params = {method:"POST",body:fd,headers:{'x-application':"60906b4cf5e24d7d2498642b"}}
			var res = await fetch("https://api.tnrdit.ca/api-console/images",params);
			var out = await res.json();
			
			if(original){
				var params = {method:"DELETE",headers:{'x-application':"60906b4cf5e24d7d2498642b"}}
				await fetch("https://api.tnrdit.ca/api-console/images/"+original,params);
			}
			_value.value = out._id
		} */
		return _value
	}


	useEffect(() => {update()},[value]);
	
	useImperativeHandle(ref, () => ({
		getName    : ()=>{return name},
		clearField : ()=>{
			imgRef.current.src = '/icons/upload.svg';
			setFileList([]);
			setValue();
		},
		setField   : (v)=>{setValue({...v})},
		getField   : ()=>{return submit();}
	}));

	
	
	var body = (
		<div className={style.image}>
			<Dragger 
				
				fileList = {fileList}
				multiple={false} 
				maxCount={1} 
				name={name} 

				beforeUpload={(file)=>{
					let valid = props.data.types.includes(file.type);
					let error = valid ? error : `${file.name} is an invalid file type`;
					props.onChange({valid:valid,error:error})
					return valid ? true : Upload.LIST_IGNORE;
				}}

				onChange={(e)=>{setValue(e)}}

				{...props.data.attributes}>  
				
				<p className="ant-upload-drag-icon">
					{
						<img ref={imgRef} src={img} width="48px" height="48px" />
					}
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
				<p className="ant-upload-hint">
					This field supports single files only. Please choose from .png, .jpg, .tiff, .svg or .gif formats.  
				</p>
			</Dragger>
		</div>
	)
	
	return ( props.data.crop?<ImgCrop aspect={1} >{body}</ImgCrop>:body)
	 
})

export default _Image;
