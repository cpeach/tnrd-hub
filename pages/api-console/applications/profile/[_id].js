//import { Button } from 'tnrd-components';

import Container from '/components/layout/containers/index.js';
import Link      from 'next/link';
import style     from '/styles/Index.module.css';
import {withRouter} from 'next/router';
import api 	   	from '/scripts/api.js';
import Frame    from '/components/frames/frame.js';
import { FileTextOutlined } from '@ant-design/icons';
function _Application(props) { 
	
	const {_id}  = props.router.query
	const data           = {};

	const menu = (menu,type)=>{
		var items = menu.map((item,i)=>{
			if(item.type===type){
				return <Link key={"link-"+i} href={item.link}>{item.label}</Link>
			}
		});
		return items; 
	}

	const resources = (resources)=>{
		var items = resources.map((item,i)=>{
			return (<li><a target="_blank" href={item.link}>{item.title}</a></li>)
		});
		return items; 
	}

	var _application     = api({url:'/admin/hub/applications/'+_id});
	
		if(_application){
			
			data.content = (
			<>
				<Container key="heading" size="12" color="primary" align="center" padding={{y:"sm",x:"xxl"}}>
					<div className={style.landing_content} >
						
						<div  className={style.landing_icon}>
							<div></div>
							<img src={(_application.image_meta?_application.image_meta.url:'')===''?"/icons/app.png":_application.image_meta.url} width={40} height={40} />
						</div>
						<h1 className={style.landing_title}>{_application.name}</h1>
						<div  className={style.landing_dash}></div>
						<p className={style.landing_description}>{_application.description}</p>
					</div>
				</Container>
				{
					_application.ui ?  (
					<Container key="nav" size="12" padding={{x:"xl"}}>
						
						<div className={style.landing_actions}>
							{menu(_application.ui.menu,"primary")}
							{menu(_application.ui.menu,"secondary")}
						</div>
					
					</Container>) : <></>
				}
				<Container key="options" size="12" padding={{y:"lg"}} >
					<div className={style.landing_options}>
						<span>Request Access</span><i></i><span>Report an Issue</span><i></i><span>Support</span>
					</div>
				</Container>
				<Container key="documentation" size="12" align="center" >
					

					<div className={style.landing_links}>
						<FileTextOutlined style={{fontSize:"20px",display:"inline-block"}} /><h3>Resources</h3>
						<p>The following is a list of related application resources. If you are unable to find what you are looking for then please contact @Administator for Help</p>
						
						<ul>
							{resources(_application.ui.resources)}					
						</ul>
								
					</div>


				</Container>
			</>
		)
	}
		
	return ( <Frame user={props.user} apps={props.apps} key="frame" data={data} active="1" navigation="false" path={false} />)		
} 

export default withRouter(_Application)



