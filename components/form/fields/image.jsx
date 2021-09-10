import React      			from 'react';
import Image                from 'next/image';
import style      			from '../Form.module.css';
import { Upload, message }  from 'antd';
import { InboxOutlined }   	from '@ant-design/icons';
import ImgCrop 				from 'antd-img-crop';
const { Dragger } = Upload;

export default class _Image extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valid:true,
			application:this.props.data.application,
			value:this.props.data.attributes.defaultValue,
			name:this.props.data.attributes.name,
			description:"",
			descriptions : {
				valid   : "",
				invalid : "This field requires a value"
			},
			file : undefined,
			img : this.props.data.meta ? this.props.data.meta.url : '/icons/upload.svg',
			changed : false
		};
		this.handleChange = this.handleChange.bind(this);
		this.getValue     = this.getValue.bind(this);
		this.getName      = this.getName.bind(this);
		this.validate     = this.validate.bind(this);
	  }

	async handleChange(info) {
		if (info.file.status === 'done') {
			this.setState({file:info.file.originFileObj})
			this.setState({changed:true})
			message.success(`${info.file.name} file uploaded is pending.`);
			var reader = new FileReader();
			var id = "img-"+this.props.data.attributes.name;
			console.log(id)
			console.log(document.getElementById(id))
			reader.onload = (event)=>{document.getElementById(id).src = event.target.result}
			reader.readAsDataURL(this.state.file);

		} 
		 else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	}

	async getValue(){
		
		const original = this.state.value;
		if(this.state.changed){
			
			const fd = new FormData();
			fd.append("image", this.state.file);
			var params = {method:"POST",body:fd,headers:{'x-application':this.state.application}}
			var res = await fetch("https://api.tnrdit.ca/api-console/images",params);
			var out = await res.json();
			
			if(original){
				var params = {method:"DELETE",headers:{'x-application':this.state.application}}
				await fetch("https://api.tnrdit.ca/api-console/images/"+original,params);
			}
			this.state.value = out._id 
			return this.state.value;
		}else{
			return this.state.value;
		}
		
	}
	getName(){return this.state.name}
	
	validate(){
		var v     = this.state.value;
		var valid = true;
		
	// 	check string
		//valid = this.props.required?v.length>0?true:false:valid;
		//let description = valid ? this.state.descriptions.valid : this.state.descriptions.invalid;
		
		//this.setState({value:v,valid:valid,description:""})
		
		return {valid:valid,value:v,description:''};
	}

	
	
	
	render() { 
		var fileList = [
			{
				uid: '-1',
				name: this.props.data.meta?this.props.data.meta.filename:'',
				status: 'done',
				url: this.props.data.meta?this.props.data.meta.url:'',
				thumbUrl: this.props.data.meta?this.props.data.meta.url:'',
			}
		]
		
		var body = (
			<Dragger 
				
				defaultFileList={[...fileList]} 
				multiple={false} 
				maxCount={1} 
				name={this.state.name} 
				onChange={this.handleChange}
				{...this.props.data.attributes}>  
				
				<p className="ant-upload-drag-icon">
					{
						
						<img id={"img-"+this.props.data.attributes.name} src={this.state.img} width="60px" height="60px" />
					
					}
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
				<p className="ant-upload-hint">
					This field supports single files only. Please choose from .png, .jpg, .tiff, .svg or .gif formats.  
				</p>
			</Dragger>
		)
		
		return ( this.props.data.crop?<ImgCrop {...this.props.data.crop}>{body}</ImgCrop>:body)
	 }
}
