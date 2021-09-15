import {forwardRef,useState,useImperativeHandle,useEffect} from 'react';
import Image                from 'next/image';
import style      			from '../Form.module.css';
import { Upload, message }  from 'antd';
import { InboxOutlined }   	from '@ant-design/icons';
import ImgCrop 				from 'antd-img-crop';
const { Dragger } = Upload;

const _Image = forwardRef((props, ref) => {

	const [initial, setInitial] = useState(true);
	const [original, setoriginal] = useState(props.data.attributes.defaultValue);
	const [value, setValue]     = useState();
	const [name, setName]       = useState(props.data.attributes.name);
	const [img, setImage]       = useState(props.data.meta?props.data.meta.url:'/icons/upload.svg');
	
	const update = () => {
		if(value){
			if (value.file.status === 'done') {
				var id = "img-"+name;
				var reader = new FileReader();
				reader.onload = (event)=>{document.getElementById(id).src = event.target.result}
				reader.readAsDataURL(value.file.originFileObj);
				//setFile(value.file.originFileObj);
				setInitial(false);
			} 
			else if (value.file.status === 'error') {
				message.error(`${value.file.name} file upload failed.`);
			}
		}
	}

	const validate = (file)=>{
		let valid = true;
		
		if(props.data.required&&!initial){
			console.log(value)
			valid = value?false:true;
		}
		return valid
	}

	const submit = ()=>{
		let _value   =  {value:value,name:name,valid:true,error:""};
		_value.valid = props.data.required?value?true:false:true;
		_value.error = _value.valid?"":"This field required an image.";
		props.onChange(_value);
		if(!initial&&_value.valid){
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
	useImperativeHandle(ref, () => ({getField(){return submit();}}));

	
	var fileList = [
		{
			uid: '-1',
			name: props.data.meta?props.data.meta.filename:'',
			status: 'done',
			url: props.data.meta?props.data.meta.url:'',
			thumbUrl: props.data.meta?props.data.meta.url:'',
		}
	]
	
	var body = (
		<Dragger 
			
			defaultFileList={props.data.meta?[...fileList]:[]} 
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
					<img id={"img-"+props.data.attributes.name} src={img} width="48px" height="48px" />
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
