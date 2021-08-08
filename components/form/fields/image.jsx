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
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleDrop   = this.handleDrop.bind(this);
		this.getValue     = this.getValue.bind(this);
		this.getName      = this.getName.bind(this);
		this.validate     = this.validate.bind(this);
	  }

	async handleChange(info) {

		if (info.file.status === 'done') {
			this.state.value = info.file.response._id;
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (info.file.status === 'error') {
			console.log('error')
			message.error(`${info.file.name} file upload failed.`);
		}
		/*
		console.log(p)
		
		this.setState({value:p},function(){
			this.props.onChange?this.props.onChange(this.validate()):null;	  
		});*/
	}
	handleDrop(e) {
   		console.log('Dropped files', e.dataTransfer.files);
  	}
	getValue(){return this.state.value}
	getName(){return this.state.name}
	
	validate(){
		var v     = this.state.value;
		var valid = true;
		
	// 	check string
		valid = this.props.required?v.length>0?true:false:valid;
		let description = valid ? this.state.descriptions.valid : this.state.descriptions.invalid;
		
		this.setState({value:v,valid:valid,description:description})
		
		return {valid:valid,value:v,description:description};
	}

	


	render() { 
		var headers = {'x-application':this.state.application};
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
			<Dragger  defaultFileList={[...fileList]} multiple={false} maxCount={1} name={this.state.name} headers={headers} {...this.props.data.attributes} action="https://api.tnrdit.ca/admin/hub/images" onChange={this.handleChange} handleDrop={this.handleDrop}>
				<p className="ant-upload-drag-icon">
					{
						
						this.state.value === ''?
							<InboxOutlined style={{ color: 'rgb(120,162,47)' }}  />
							:
							<img src={this.props.data.meta.url} width="60px" height="60px" />
					
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
