//import { Button } from 'tnrd-components';

import Container from '/components/layout/containers/index.js';
import Link      from 'next/link';
import {withRouter} from 'next/router';
import api 	   	from '/scripts/api.js';
import Frame    from '/components/frames/frame.js';
import { FileTextOutlined } from '@ant-design/icons';
import { Popconfirm, message,Divider,Descriptions } from 'antd';

import style from './Index.module.css';

function _Application(props) { 
	
	const {_id}  = props.router.query
	const data   = {};



	const menu = (menu,type)=>{
		let items
		if(menu){
			items = menu.map((item,i)=>{
				if(item.type===type){
					return <Link key={"link-"+i} href={item.link}>{item.label}</Link>
				}
			});
		}else{
			items = <></>
		}
		return items; 
	}

	const tags = (data)=>{
		var items = data.departments.map((item,i)=>{
				return <span key={"link-"+i}>{item.name}</span>
		});
		return items; 
	}

	const resources = (resources)=>{
		var items = resources.map((item,i)=>{
			return (
				<li key={"item-"+i}>
					<a target="_blank" href={item.link}>
						<FileTextOutlined style={{"fontSize":"18px"}} /><label>{item.title}</label>
					</a>
				</li>
			)
		});
		return items; 
	}

	var _application     = api({url:'/api-console/applications/'+_id});
	
		if(_application){

			console.log(_application)
			

			data.content = (
			<div className={style.content}>
				<div className={style.left_panel}>
					<div className={style.img_wrapper}>
					<div></div>
						<img src={(_application.image_meta?_application.image_meta.url:'')===''?"/icons/app.png":_application.image_meta.url} />
					</div>
				</div>
				<div className={style.center_panel}>
					<h1 className={style.title}>{_application.name}</h1>
					<div className={style.tags}>{tags(_application)}</div>
					<p className={style.description}>{_application.description}</p>
					<div style={{display:"none"}}>
					<Descriptions layout="vertical" bordered>
						
						<Descriptions.Item label="Application ID" span={3} >{_application._id}</Descriptions.Item>
						<Descriptions.Item label="Publisher"  >{_application.publisher||"--"}</Descriptions.Item>
						<Descriptions.Item label="Platform" >{_application.platform||"--"}</Descriptions.Item>
						<Descriptions.Item label="Internally Hosted" >{_application.hosted||"--"}</Descriptions.Item>
						
					</Descriptions>
					</div>
					
					<div className={style.resources}>
						{_application.ui&&_application.ui.resources.length>0?
						<Divider style={{fontSize:"19px","marginBottom":"30px"}} >Resources</Divider>
						:<></>}
						<ul>
							{_application.ui&&_application.ui.resources?resources(_application.ui.resources):<></>}					
						</ul>
								
					</div>
				</div>
				<div className={style.right_panel}>
				
					<div className={style.actions}>
						{menu(_application.ui.menu,"primary")}
						{menu(_application.ui.menu,"secondary")}
					</div>
				
				</div>
			</div>
		)
	}
		
	return ( <Frame user={props.user} apps={props.apps} key="frame" data={data} active="1" navigation="false"  />)		
} 

export default withRouter(_Application)



