import Link   from 'next/link';
import Image   from 'next/image';
import style  from './Frames.module.css';
import Header from '/components/headers/header.js';
import AntIcon from '/components/icons/antd/icons.js';

import { CloseCircleFilled  } from '@ant-design/icons';
import { useState } from 'react';
import { Drawer, Button } from 'antd';


export default function Frame(props) {
	const background=()=>{
		switch(props.background){
			case 'light':
			return style.frame_body_light;
		}
	}

	const [visible, setVisible] = useState(false);
	const [drawerWidth, setdrawerWidth] = useState('300');
	const showDrawer = () =>{
		setVisible(true);
		var e = document.getElementById('header_account_label');
		var size = e?parseInt(e.offsetWidth):200;
		size = size > 200 ? size : 200;
		size = size < 420 ? size : 420;
		setdrawerWidth(size);
	};
	const onClose    = () => {setVisible(false);};


	props.data.header.account = {};
	props.data.header.account.hover = showDrawer
	
	return (
		<div className={style.frame}>

			<div key="header" className={style.frame_header}><Header data={props.data.header} /></div>
			<div key="body" className={style.frame_body +" "+ background()}>
				<div key="left" className={props.navigation!=="false"?style.frame_body_left:style.frame_body_left_hide}>
					{props.data.navigation ? navigation(props) : null}
				</div>
				<div key="right" className={style.frame_body_right}>
					{props.data.content}
				</div>	


				<Drawer
					placement="right"
					closable={false}
					onClose={onClose}
					visible={visible}
					getContainer={false}
					width={drawerWidth}
					style={{marginTop:"84px"}}
					maskStyle={{backgroundColor:"rgba(0,0,0,0.0)",overflow:"hidden"}}	
				>
					<div className={style.frame_menu} onMouseLeave={()=>{setVisible(false);}}>
						<div className={style.frame_menu_profile} >
							<Image src="/icons/profile.png" width="84px" height="84px" />
						</div>
						<ul className={style.frame_menu_nav}>
							<li>Dashboard</li>
							<li>Notifications</li>
							<li>Settings</li>
							<li>Signout</li>
						</ul>
					</div>
				</Drawer>


			</div>
		</div>
	)
	 
}


export function navigation(props){
	
	return (
	
		<nav key="name" className={style.nav}>

			{
				props.data.navigation.items.map((item,i)=>(
					<Link key={"link-"+i} href={item.href}>
						<div className={parseInt(props.active)===i ?style.nav_item_active:style.nav_item}>
							<i><AntIcon name={item.icon?item.icon:"t"} /></i>
							<div>{item.label}</div>
						</div>
					</Link>
				))
			}

		</nav>
	
	)
	
}

