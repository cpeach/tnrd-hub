import {forwardRef,useState,useRef,useImperativeHandle,useEffect} from 'react';
import Image                from 'next/image';
import style      			from '../Form.module.css';
import { Upload, message }  from 'antd';
import { InboxOutlined }   	from '@ant-design/icons';
import ImgCrop 				from 'antd-img-crop';
const { Dragger } = Upload;

const _Image = forwardRef((props, ref) => {

	const [original, setoriginal] = useState(props.data.attributes.defaultValue);
	const [value, setValue]     = useState();
	const [name, setName]       = useState(props.data.attributes.name);
	const [img, setImage]       = useState(props.data.meta?props.data.meta.url:'/icons/upload.svg');
	const [fileList,setFileList] = useState(
		[
			
		]
	)
	const imgRef = useRef();

	const update = () => {
		if(value){
			if (value.file.status === 'done') {
				var reader = new FileReader();
				reader.onload = (event)=>{imgRef.current.src = event.target.result}
				reader.readAsDataURL(value.file.originFileObj);
			} 
			else if (value.file.status === 'error') {
				message.error(`${value.file.name} file upload failed.`);
			}
		}
	}



	const submit = ()=>{
		let _value   =  {value:value,name:name,valid:true,error:""};
		_value.valid = props.data.required?value?true:false:true;
		_value.error = _value.valid?"":"This field required an image.";
		props.onChange(_value);
		if(_value.valid&& !props.dialog){
			console.log("POST IMAGE")
			/* const fd = new FormData();
			fd.append("image", value.file.originFileObj);
			var params = {method:"POST",body:fd,headers:{'x-application':props.data.application}}
			var res = await fetch("https://api.tnrdit.ca/api-console/images",params);
			var out = await res.json();
			
			if(original){
				var params = {method:"DELETE",headers:{'x-application':props.data.application}}
				await fetch("https://api.tnrdit.ca/api-console/images/"+original,params);
			}
			_value.value = out._id  */
		}
		 return _value
	}


	useEffect(() => {update()},[value]);
	
	useImperativeHandle(ref, () => ({
		getName    : ()=>{return name},
		clearField : ()=>{
			imgRef.current.src = '/icons/upload.svg';
			setFileList([])
			setValue(undefined);
			console.log(Upload)
		},
		setField   : (v)=>{setValue(v)},
		getField   : ()=>{return submit();}
	}));

	
	
	var body = (
		<Dragger 
			
		 
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
	)
	
	return ( props.data.crop?<ImgCrop {...props.data.crop}>{body}</ImgCrop>:body)
	 
})

export default _Image;
