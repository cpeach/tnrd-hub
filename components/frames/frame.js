import style  from './Frames.module.css';
import client from '/scripts/client-api.js';
import {useRouter} from 'next/router';

import Permission from '/components/permissions/index.js';

import { useEffect,useState } from 'react';
import Link   from 'next/link';
import Image  from 'next/image';

import { Drawer, Button, Tooltip, Popover } from 'antd';
import AntIcon 	from '/components/icons/antd/icons.js';
import { CloseCircleFilled,RightOutlined,CaretLeftOutlined  } from '@ant-design/icons';

export default function Frame(props) {

	const [visible, setVisible] = useState(false);
	const [drawerWidth, setdrawerWidth] = useState('300');
	const user = props.user;
	const apps = props.apps;

	const router = useRouter()

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
			return path.map((item,i)=>((<div key={"link-"+i} ><a href={item.href}>{item.label}</a>{i<path.length-1?<span><RightOutlined /></span>:<></>}</div>)));
			
		}else{
			return (<></>)
		}
	};
	const getBack = (path) => {
		return (<div><span><CaretLeftOutlined /></span><a href={path.href}>{path.label}</a></div>)
	}

	const getApplication = (apps,short)=>{
		let app;
		apps.map(item=>{app = item.short===short?item:app});
		return app;
	}
	const onClose    = () => {setVisible(false);};
  const getLogo = (path) => {
        return (
          <>
          <div className={style.header_logo}>
            <a href={path.href}><Image src="/icons/tnrd-logo.png" width="84" height="60" /></a>
          </div>
          
          <div className={style.header_title}>
						<a href={path.href}><label className={style.label_bold}>{data.header.title.sub}</label></a>
						<a href={path.href}><label>{data.header.title.label}</label></a>			
					</div>
          </>
        )
      } 

	const signout = ()=>{
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		window.location.href = '/signin'
	}


	var data = props.data?props.data:{};
	data.header = {account:{},"title":{"sub":"TNRD","label":"Application Hub"}}
	data.header.account 	  = {}
	data.header.account.hover = showDrawer
	data.home = {}
	data.home.href = 'https://hub.tnrdit.ca'

	var path = [];

	if(user && apps){

			if(props.path !== false){
				let pathname = router.pathname;
				let parts,app;
				var href = "";
				if(pathname.indexOf("/apps") === 0){
					parts = pathname.replace('/apps','').split('/');
					parts.shift();
					app = getApplication(apps,parts[0]);
					parts?parts.map((item,i)=>{
						let str = item.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
						href = href +"/"+ item;
						path.push(i===0?{"label":app.name,"href":"/applications/"+app._id}:{"label":str,"href":href});
					}):null

				}else if(pathname.indexOf("/content") === 0){
					parts = pathname.replace('/content','').split('/');
					parts.shift();
					parts?parts.map((item,i)=>{
						let str = item.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
						href = href +"/"+ item;
						/* 
						
						if(parts[1]==="apps" && str.indexOf("[")>-1){
							apps.map(item=>{str = item._id===str?item:str});
							console.log(str)
							//app = getApplication(apps,str);
							str = str.name;
							console.log(str)
						} */
						str = str.indexOf("[")>-1?router.query[str.replace('[','').replace(']','')]:str;
						path.push({"label":str,"href":href});
					}):null
				}
			}
	

		return (
			
				<div className={style.frame}>

					<div className={style.frame_header}>
					
						<header className={style.header}>
							<div className={style.header_left}>
								<div className="vam"></div>
                  {getLogo(data.home)}

							</div>
							<div className={style.header_right}>
								<Tooltip title="Applications" color="rgba(0,0,0,0.7)" >
									<div className={[style.header_btn,style.all_apps]} onClick={()=>{router.push('/')}}>
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
						props.path !== false?props.data.path&&props.data.path.back ?
							<div className={style.frame_body_path}>
								<div></div>{getBack(props.data.path.back)}
							</div> : 
							<div className={style.frame_body_path}>
								<div></div>{getPath(path)}
							</div> :
							<></>
					}
					<Permission user={user} apps={apps}>

						<div className={style.frame_body +" "+ background()}>
							
							<div key="left" className={props.navigation!=="false"&&props.navigation!==false?style.frame_body_left:style.frame_body_left_hide}>
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
								style={{marginTop:"87px"}}
								maskStyle={{backgroundColor:"rgba(0,0,0,0.0)",overflow:"hidden"}}	
							>
								<div className={style.frame_menu} onMouseLeave={()=>{setVisible(false);}}>
									<div className={style.frame_menu_profile} >
										<img className={style.frame_menu_profile_image} src={props.user&&props.user.profile.image_meta?props.user.profile.image_meta.url:"/icons/profile.png"} width="108px" height="108px" />
									</div>
									<ul className={style.frame_menu_nav}>
										<li><Link href="/content/profile/">Profile</Link></li>
										<li><Link href="/content/profile/">Notifications</Link></li>
										<li><a onClick={signout}>Signout</a></li>
									</ul>
								</div>
							</Drawer>

						</div>

					</Permission>

				</div>
			
		)
	 }else{
		return <div></div>
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

