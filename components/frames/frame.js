import style  from './Frames.module.css';
import client from '/scripts/client-api.js';

import { useEffect,useState } from 'react';
import Link   from 'next/link';
import Image  from 'next/image';

import { Drawer, Button, Tooltip, Popover } from 'antd';
import AntIcon 	from '/components/icons/antd/icons.js';
import { CloseCircleFilled  } from '@ant-design/icons';

export default function Frame(props) {

	const [user, setUser] = useState({profile:{first_name:'Account',last_name:''}});
	const [visible, setVisible] = useState(false);
	const [drawerWidth, setdrawerWidth] = useState('300');

	useEffect(async () => {
		var ref   = localStorage.getItem('user');
		var _user = await client({url:"/admin/hub/users/"+ref});
		setUser(_user)
	});


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

	const onClose    = () => {setVisible(false);};

	var data = props.data?props.data:{};
	data.header = {account:{},"title":{"sub":"TNRD","label":"Application Hub"}}
	data.header.account 	  = {}
	data.header.account.hover = showDrawer
	
	return (
		<div className={style.frame}>

			<div key="header" className={style.frame_header}>
			
				<header className={style.header}>
					<div className={style.header_left}>
						<div className="vam"></div>
						<label className={style.label_bold}>{data.header.title.sub}</label>
						<label>{data.header.title.label}</label>
					</div>
					<div className={style.header_right}>
						<Tooltip title="Applications" color="rgba(0,0,0,0.7)" >
							<div className={style.header_btn} onClick={()=>{props.router.push('/')}}>
								<div className={style.header_btn_inner}>
									<Image src="/icons/applications.svg" width={32} height={32} />
								</div>
								<div className="vam"></div>
							</div>
						</Tooltip>
						<div className={style.header_sep}></div>
						
						<div id="header_account_label" className={style.header_btn} onMouseEnter={data.header.account.hover} >
							<div className={style.header_btn_inner}><Image src="/icons/account.svg" width={28} height={28} /></div>
							<div className={style.header_btn_inner} >
								<label className={style.header_btn_label}>{user.profile.first_name +" "+ user.profile.last_name}</label>
							</div>
							<div className={style.header_btn_inner}><Image src="/icons/d-arrow.svg" width={28} height={28} /></div>
							<div className="vam"></div>
						</div>	
					</div>
				</header>
			
			</div>
			
			<div key="body" className={style.frame_body +" "+ background()}>
				<div key="left" className={props.navigation!=="false"?style.frame_body_left:style.frame_body_left_hide}>
					{data.navigation ? navigation(props) : null}
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
				data.navigation.items.map((item,i)=>(
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

