import Image from 'next/image'
import Link from 'next/link'
import {useEffect,useState} from 'react'
import {withRouter} from 'next/router'
import style from './Headers.module.css';
import {Tooltip,Popover} from 'antd'
import api 	  from '/scripts/api.js';
import client from '/scripts/client-api.js';

function Header(props) {
	
	const [user, setUser] = useState({profile:{first_name:'Account',last_name:''}});

	useEffect(async () => {
		var ref = localStorage.getItem('user');
		console.log(ref)
		var _user = await client({url:"/admin/hub/users/"+ref});
		console.log(_user)
		setUser(_user)
	});

	const content = (<a onClick="alert(clicked)">Profile</a>)
	
	return (
		<header className={style.header}>
			<div className={style.header_left}>
				<div className="vam"></div>
				<label className={style.label_bold}>{props.data.title.sub}</label>
				<label>{props.data.title.label}</label>
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
				
				<div id="header_account_label" className={style.header_btn} onMouseEnter={props.data.account.hover} >
					<div className={style.header_btn_inner}><Image src="/icons/account.svg" width={28} height={28} /></div>
					<div className={style.header_btn_inner} >
						<label className={style.header_btn_label}>{user.profile.first_name +" "+ user.profile.last_name}</label>
					</div>
					<div className={style.header_btn_inner}><Image src="/icons/d-arrow.svg" width={28} height={28} /></div>
					<div className="vam"></div>
				</div>				
				

			</div>
		</header>
	)
}


export default withRouter(Header)