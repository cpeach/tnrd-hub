
import Container from '/components/layout/containers/index.js';
import Link      from 'next/link';
import style     from '/styles/Index.module.css';
import {withRouter} from 'next/router';
import api 	   	from '/scripts/api.js';
import Frame    from '/components/frames/frame.js';
import { FileTextOutlined } from '@ant-design/icons';
function _Application(props) { 
	
	const {application}  = props.router.query
	const data           = {};

	const menu = (menu,type)=>{
		var items = menu.map((item,i)=>{
			if(item.type===type){
				return <Link key={"link-"+i} href={item.link}>{item.label}</Link>
			}
		});
		return items; 
	}

	var _application     = api({url:'/admin/hub/applications/'+application}) || {};
	if(_application.ui){
		data.content = (
		<>
			<Container key="heading" size="12" color="primary" align="center" padding={{y:"md",x:"xxl"}}>
				<div className={style.landing_content} >
					<h1 className={style.landing_title}>{_application.name}</h1>
					<div  className={style.landing_dash}></div>
					<p className={style.landing_description}>{_application.description}</p>
				</div>
			</Container>
			<Container key="nav" size="12" padding={{x:"xl"}}>
				
					<div className={style.landing_actions}>
						{menu(_application.ui.menu,"primary")}
						{menu(_application.ui.menu,"secondary")}
					</div>
				
			</Container>
			<Container key="options" size="12" padding={{y:"lg"}} >
				<div className={style.landing_options}>
					<span>Request Access</span><i></i><span>Report an Issue</span><i></i><span>Support</span>
				</div>
			</Container>
			<Container key="documentation" size="12" align="center" >
				

				<div className={style.landing_links}>
					<FileTextOutlined style={{fontSize:"20px",display:"inline-block"}} /><h3>Resources</h3>
					<p>The following is a list of related application resources. If you are unable to find what you are looking for then please contact @Administator for Help</p>
					<label>External Links</label>
					<ul>
						<li>
							A guide to adding TNRD Hub applications
						</li>
						<li>
							Managing User Rolls
						</li>
					</ul>
					<label>Guides</label>
					<ul>
						<li>
							A guide to adding TNRD Hub applications
						</li>
						<li>
							Managing User Rolls
						</li>
					</ul>
					<label>Documentation</label>
					<ul>
						<li>
							A guide to adding TNRD Hub applications
						</li>
						<li>
							Managing User Rolls
						</li>
					</ul>	
					<label>Frequently Asked Questions</label>
					<ul>
						<li>
							A guide to adding TNRD Hub applications
						</li>
						<li>
							Managing User Rolls
						</li>
					</ul>								
				</div>


			</Container>
		</>
	)
	}
		
	return (<Frame key="frame" data={data} active="1" navigation="false" />)		
} 

export default withRouter(_Application)



