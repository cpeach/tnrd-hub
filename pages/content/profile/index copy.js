import {forwardRef,useState,useRef,useImperativeHandle,useEffect} from 'react';
import Link      from 'next/link';
import Image      from 'next/image';
import api       from '/scripts/api.js';
import Frame     from '/components/frames/frame.js';
import Container from '/components/layout/containers/index.js';
import Content  from '/components/layout/stacks/index.js';
import { SearchOutlined,BellOutlined,AppstoreAddOutlined} from '@ant-design/icons';
import { Empty,Descriptions,Badge,Upload,message  } from 'antd';	
import gd from '../../data.json'; 

import style  from './Profile.module.css';

import ImgCrop from 'antd-img-crop';
const { Dragger } = Upload;

export default function Profile(props) {
	
	var g_data = JSON.parse(JSON.stringify(gd))

	const [value, setValue]     = useState();
	const [img, setImage] = useState();
	//const [fileList,setFileList] = useState([...defaultFileList])
	
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

	useEffect(() => {update()},[value]);

	if(true){
		
		g_data.content = (
			<Container size="8" padding={{y:"xl"}} align="left">
				
				<div className={style.profile_left}>
					<div className={style.profile_image}>
						<Dragger 
							showUploadList={false}
							multiple={false} 
							maxCount={1} 
							
							beforeUpload={(file)=>{
								let valid = props.data.types.includes(file.type);
								let error = valid ? error : `${file.name} is an invalid file type`;
								valid? null : message(`${file.type} is an invalid file type.`)
								return valid ? true : Upload.LIST_IGNORE;
							}}
							onChange={(e)=>{setValue(e)}}
						> 
							<Image ref={imgRef} src="/icons/profile-gray.png" width="144px" height="144px" />
						</Dragger>
						
					</div>	
					<div className={style.profile_notifications}>
						<BellOutlined />
						<label>Notifications (12)</label>
					</div>
					<div className={style.profile_applications}>
						<label>Applications </label>
					</div>
					<ul>
						<li>Applications (3)</li>
					</ul>
				
				</div>

				<div className={style.profile_right}>
					<h1>Cory Peach</h1>
					<Descriptions layout="vertical" bordered>
						
						<Descriptions.Item label="Department" >Information Technology</Descriptions.Item>
						<Descriptions.Item label="Title" >Applications Developer / Database Administrator</Descriptions.Item>
						
					</Descriptions>
				</div>
				
			</Container>
		);	
	}			
							
	return ( <Frame user={props.user} apps={props.apps} key="frame" data={g_data}  active="1" navigation="false" />)
	 
}


