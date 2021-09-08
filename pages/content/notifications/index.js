import Link       from 'next/link';
import Image      from 'next/image';
import api       from '/scripts/api.js';
import Frame     from '/components/frames/frame.js';
import Container from '/components/layout/containers/index.js';
import Content  from '/components/layout/stacks/index.js';
import { SearchOutlined,BellOutlined,AppstoreAddOutlined} from '@ant-design/icons';
import { Empty,Descriptions, Badge  } from 'antd';	
import gd        from '../data.json'; 

import style  from './Notifications.module.css';

export default function Settings(props) { 
	
	var g_data = JSON.parse(JSON.stringify(gd))

	
	if(true){
		
		g_data.content = (
			<Container size="8" padding={{y:"xl"}} align="left">
				
				<div className={style.profile_left}>
					<div className={style.profile_image}>
						<Image src="/icons/profile-gray.png" width="144px" height="144px" />
						<a href="">Update Photo</a>
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

