import Link      from 'next/link';
import Image      from 'next/image';
import api       from '/scripts/api.js';
import Frame     from '/components/frames/frame.js';
import Container from '/components/layout/containers/index.js';
import Content  from '/components/layout/stacks/index.js';
import { SearchOutlined } from '@ant-design/icons';
import { Empty } from 'antd';	
import gd        from '../data.json'; 

export default function Settings(props) { 
	
	var g_data = JSON.parse(JSON.stringify(gd))

	const applications = api({url:'/admin/hub/applications/'});
	const departments  = api({url:'/admin/hub/departments/'});

	if(departments && applications){
		
		g_data.content = (
			<Container size="5" align="left" padding={{y:"xl"}}>
				
				<Image src="/icons/profile-gray.png" width="96px" height="96px" style={{opacity:"0.5"}}/>
				
				<h1  style={{marginTop:"15px"}}>Cory Peach</h1>
				<Container>
				
						<div style={{marginTop:"15px"}} >
							<label>Applications Developer</label>
						</div>
				
					
				
				</Container>
			</Container>
		);	
	}			
							
	return ( <Frame user={props.user} apps={props.apps} key="frame" data={g_data}  active="1" navigation="false" />)
} 

