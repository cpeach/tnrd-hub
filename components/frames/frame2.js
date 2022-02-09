import style  from './Frames2.module.css';
import client from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Permission from '/components/permissions/index.js';

import { useEffect,useState } from 'react';
import Link   from 'next/link';
import Image  from 'next/image';

import { Drawer, Button, Tooltip, Popover,Badge } from 'antd';
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
	const align=()=>{
		let align = {
			left   : style.left,
			right  : style.right,
			center : style.center
		}
		return align[props.align?props.align:"left"]
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
		
		if(path && path[0].label==="Applications"){
			return path.map((item,i)=>((<div key={"link-"+i} ><a>{item.label}</a>{i<path.length-1?<span><RightOutlined /></span>:<></>}</div>)));
		}else if(path){
			return path.map((item,i)=>((<div key={"link-"+i} ><Link href={item.href}>{item.label}</Link>{i<path.length-1?<span><RightOutlined /></span>:<></>}</div>)));
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
	data.home.href = '/'

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
					{
					
					!props.hide_headers ?
					
					<div className={style.frame_header}>
					
						<header className={style.header}>
							<div className={style.header_left}>
								<div className="vam"></div>
                  				{getLogo(data.home)}

							</div>
							<div className={style.header_right}>
								<Link href="/">
								<Tooltip title="Applications" color="rgba(0,0,0,0.7)" >
									
										<div className={[style.header_btn,style.all_apps]}>
											
												<div className={style.header_btn_inner}>
													<Image src="/icons/applications.svg" width={38} height={38} />
												</div>
												<div className="vam"></div>
											
										</div>
									
								</Tooltip>
								</Link>
								<div className={style.header_sep}></div>
								<div id="header_account_label" className={style.header_btn} onMouseEnter={data.header.account.hover} >
									<div className={style.header_btn_inner}><Image src="/icons/account.svg" width={28} height={28} /></div>
									<div className={style.header_btn_inner} >
										{user.notices>0?<Badge color="rgb(117, 158, 46)"  style={{position:"absolute",marginLeft:"-6px",marginTop:"-8px"}} ></Badge>:<></>}
										<label className={style.header_btn_label}>{user.profile?user.profile.name:'Account'}</label>
									</div>
									<div className={style.header_btn_inner}><Image src="/icons/d-arrow.svg" width={28} height={28} /></div>
									<div className="vam"></div>
								</div>	
							</div>
						</header>
					</div>
					:
					<></>

					}
					
					{
						!props.hide_headers ? 
						props.path !== false?props.data.path&&props.data.path.back ?
							<div className={style.path}>
								<div></div>{getBack(props.data.path.back)}
							</div> : 
							<div className={style.path}>
								<div></div>{getPath(path)}
							</div> :
							<></>
						:
						<></>	
					}

					<Permission user={user} apps={apps}>

						<div className={style.frame_body +" "+ background() +" "+  align()}>
							
							{data.content}
								
							<Drawer
								placement="right"
								closable={false}
								onClose={onClose}
								visible={visible}
								getContainer={false}
								width={drawerWidth}
								style={{marginTop:"93px"}}
								maskStyle={{backgroundColor:"rgba(0,0,0,0.0)",overflow:"hidden"}}	
							>
								<div className={style.frame_menu} onMouseLeave={()=>{setVisible(false);}}>
									<div className={style.frame_menu_profile} >
										<img className={style.frame_menu_profile_image} src={props.user&&props.user.profile.image_meta?props.user.profile.image_meta.url:"/icons/profile.png"} width="84px" height="84px" />
									</div>
									<ul className={style.frame_menu_nav}>
										<li><a className="box _9" href={"/notifications/"+user.profile._id} >Notifications</a><span className="box _2 right">{user.notices?<Badge count={user.notices} style={{ backgroundColor: 'rgb(117, 158, 46)' }}></Badge>:<></>}</span></li>
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




