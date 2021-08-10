
import Container from '/components/layout/containers/index.js';
import Link      from 'next/link';
import style     from '/styles/Index.module.css';
import {withRouter} from 'next/router';
import api 	   	from '/scripts/api.js';
import Frame    from '/components/frames/frame.js';
 
function _Application(props) { 
	
	const {application}  = props.router.query
	const data           = {};

	const menu = (menu,type)=>{
		var items = menu.map((item)=>{
			if(item.type===type){
				return <Link href={item.link}>{item.label}</Link>
			}
		});
		return items; 
	}

	var _application     = api({url:'/admin/hub/applications/'+application}) || {};
	if(_application.ui){
		data.content = (
		<>
			<Container size="12" color="primary" align="left" padding={{y:"md",x:"xxl"}}>
				<div className={style.landing_content} >
					<h1 className={style.landing_title}>{_application.name}</h1>
					<div  className={style.landing_dash}></div>
					<p className={style.landing_description}>{_application.description}</p>
					<div className={style.landing_actions}>
						{menu(_application.ui.menu,"primary")}
					</div>
				</div>
			</Container>
			<Container size="12" padding={{x:"xl"}} style={{borderBottom:"1px solid rgb(200,200,200)"}}>
				<div className={style.landing_menu}>
					<div>{menu(_application.ui.menu,"secondary")}</div>
				</div>
			</Container>
		</>
	)
	}
		
	return (<Frame data={data} active="1" navigation="false" />)		
} 

export default withRouter(_Application)



