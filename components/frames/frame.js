import style  from './Frames.module.css';
import client from '/scripts/client-api.js';
import Router from 'next/router';

import Permission from '/components/permissions/index.js';

import { useEffect,useState } from 'react';
import Link   from 'next/link';
import Image  from 'next/image';

import { Drawer, Button, Tooltip, Popover } from 'antd';
import AntIcon 	from '/components/icons/antd/icons.js';
import { CloseCircleFilled,RightOutlined  } from '@ant-design/icons';

export default function Frame(props) {

	const [visible, setVisible] = useState(false);
	const [drawerWidth, setdrawerWidth] = useState('300');
	const user = props.user;
	const apps = props.apps;

	const background=()=>{
		switch(props.background){
			case 'light':
			return style.frame_body_light;
		}
	}

	const showDrawer = () =>{
		setVisible(true);
		var e = document.getElementById('header_account_label');
		var size = e?parseInt(e.offsetWidth):200;
		size = size > 200 ? size : 200;
		size = size < 420 ? size : 420;
		setdrawerWidth(size);
	};
	const getPath = (path) =>{
		if(path){
			return path.map((item,i)=>((<div key={"link"+i} ><a href={item.href}>{item.label}</a><span><RightOutlined /></span></div>)));
		}else{
			return (<></>)
		}
	};
	const onClose    = () => {setVisible(false);};

	var data = props.data?props.data:{};
	data.header = {account:{},"title":{"sub":"TNRD","label":"Application Hub"}}
	data.header.account 	  = {}
	data.header.account.hover = showDrawer
	
	
	if(user && apps){
		
		return (
			
				<div className={style.frame}>

					<div className={style.frame_header}>
					
						<header className={style.header}>
							<div className={style.header_left}>
								<div className="vam"></div>

								<div className={style.header_logo}>
									<Image src="/icons/tnrd-logo.png" width="84" height="60" />
								</div>

								<div className={style.header_title}>
									<label className={style.label_bold}>{data.header.title.sub}</label>
									<label>{data.header.title.label}</label>						
								</div>

							</div>
							<div className={style.header_right}>
								<Tooltip title="Applications" color="rgba(0,0,0,0.7)" >
									<div className={style.header_btn} onClick={()=>{Router.push('/')}}>
										<div className={style.header_btn_inner}>
											<Image src="/icons/applications.svg" width={38} height={38} />
										</div>
										<div className="vam"></div>
									</div>
								</Tooltip>
								<div className={style.header_sep}></div>
								<div id="header_account_label" className={style.header_btn} onMouseEnter={data.header.account.hover} >
									<div className={style.header_btn_inner}><Image src="/icons/account.svg" width={28} height={28} /></div>
									<div className={style.header_btn_inner} >
										<label className={style.header_btn_label}>{user.profile?user.profile.first_name +" "+ user.profile.last_name:'Account'}</label>
									</div>
									<div className={style.header_btn_inner}><Image src="/icons/d-arrow.svg" width={28} height={28} /></div>
									<div className="vam"></div>
								</div>	
							</div>
						</header>
					</div>
					{
						props.path!==false?
							<div className={style.frame_body_path}>
								<div></div>
								{
									getPath(props.data.path)
								}
								
							</div> : <></>
					}
					<Permission user={user} apps={apps}>

						<div className={style.frame_body +" "+ background()}>
							

							<div key="left" className={props.navigation!=="false"?style.frame_body_left:style.frame_body_left_hide}>
								{data.navigation ? navigation(data.navigation,props.active) : null}
							</div>
							
							<div key="right" className={style.frame_body_right}>
									
									{data.content}
								
							</div>	

							<Drawer
								placement="right"
								closable={false}
								onClose={onClose}
								visible={visible}
								getContainer={false}
								width={drawerWidth}
								style={{marginTop:"96px"}}
								maskStyle={{backgroundColor:"rgba(0,0,0,0.0)",overflow:"hidden"}}	
							>
								<div className={style.frame_menu} onMouseLeave={()=>{setVisible(false);}}>
									<div className={style.frame_menu_profile} >
										<Image src="/icons/profile.png" width="90px" height="90px" />
									</div>
									<ul className={style.frame_menu_nav}>
										<li><Link href="/profile/">Profile</Link></li>
										<li>Notifications</li>
										<li>Signout</li>
									</ul>
								</div>
							</Drawer>

						</div>

					</Permission>

				</div>
			
		)
	 }else{
		return <div>Set User Frame props</div>
	 }
}


export function navigation(data,active){
	
	return (
	
		<nav key="name" className={style.nav}>

			{
				data.items.map((item,i)=>(
					<Link key={"link-"+i} href={item.href}>
						<div className={parseInt(active)===i ?style.nav_item_active:style.nav_item}>
							<i><AntIcon name={item.icon?item.icon:"t"} /></i>
							<div>{item.label}</div>
						</div>
					</Link>
				))
			}

		</nav>
	
	)
	
}
