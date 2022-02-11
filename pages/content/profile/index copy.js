import {useState,useRef,useEffect} from 'react';
import client 	from '/scripts/client-api.js';
import api 	from '/scripts/api.js';
import {Descriptions,Badge,Upload,message  } from 'antd';	
import ImgCrop from 'antd-img-crop';
import Frame     from '/components/frames/frame2.js';
import Container from '/components/layout/containers/index.js';

import style  from './Profile.module.css';

const { Dragger } = Upload;

export default function Profile(props){

	const [fileList,setFileList] = useState()

	var imgRef = useRef();
	
	var data = {}
	var profile;


	if(props.user){
		profile = props.user.profile;
		console.log(profile)
		data.content = 	(

			<Container size="8" padding={{y:"xl"}} align="left">
				
				<div className={style.profile_left}>
					<div className={style.profile_image}>
						<ImgCrop zoom rotate shape="round" aspect={1}>
						<Dragger 
							showUploadList={false}
							multiple={false} 
							maxCount={1} 
							beforeUpload={(file)=>{
								let valid = ["image/jpg","image/jpeg","image/svg","image/png","image/gif","image/tiff"].includes(file.type);
								valid? null : message(`${file.type} is an invalid file type.`)
								return valid ? true : Upload.LIST_IGNORE;
							}}
							onChange={async (e)=>{
								var reader = new FileReader();
								reader.onload = async (event)=>{
									imgRef.current.src = event.target.result
								}
								reader.readAsDataURL(e.file.originFileObj);

								const fd = new FormData();
								fd.append("image", e.file.originFileObj);
								var params = {method:"POST",body:fd,headers:{'x-application':'60906b4cf5e24d7d2498642b'}}
								var res = await fetch(process.env.NEXT_PUBLIC_api_host+"/api-console/images",params);
								var out = await res.json();
								if(profile.image){
									var params = {method:"DELETE",headers:{'x-application':'60906b4cf5e24d7d2498642b'}}
									await fetch(process.env.NEXT_PUBLIC_api_host+"/api-console/images/"+profile.image,params);
								}
								profile.image = out._id;
								delete profile.application;
								delete profile.__v;
								delete profile.image_meta;
								var results = await client({url:"/api-console/users",params:{method:"PUT",body:profile}})

									
								window.location.reload();
							}}
						> 
							<img ref={imgRef} className={style.image} src={profile.image_meta?profile.image_meta.url:"/icons/profile-gray.png"}/>
						</Dragger>
						</ImgCrop>
					</div>	
					
					<div className={style.profile_applications}>
						<label>Applications </label>
					</div>
					<ul>
						<li>Applications (3)</li>
					</ul>
				
				</div>

				<div className={style.profile_right}>
					<h1>{profile.first_name+" "+profile.last_name}</h1>
					<Descriptions layout="vertical" bordered>
						
						<Descriptions.Item label="Department" >Information Technology</Descriptions.Item>
						<Descriptions.Item label="Title" >Applications Developer / Database Administrator</Descriptions.Item>
						
					</Descriptions>
				</div>
				
			</Container>
		)
	}
	return(
		<Frame user={props.user} apps={props.apps} key="frame" data={data}  active="1" navigation="false" />
	)	
	
	
	

}