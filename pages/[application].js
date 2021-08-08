import Link    	from 'next/link';
import Container from '/components/layout/containers/index.js';
import {withRouter} from 'next/router';
import api 	   	from '/scripts/api.js';
import gd      	from './data.json'; // global data
import Frame    from '/components/frames/frame.js';
import Landing  from '/components/layout/stacks/landing.js';


function _Application(props) { 
	
	var data = JSON.parse(JSON.stringify(gd))

	const {application}  = props.router.query
	var _application     = api({url:'/admin/hub/applications/'+application}) || {};
	//_application.actions = {primary:{label:"Manage Notifications",href:"/libraries/expiring/notifications/"}}
	if(_application.ui){
		data.content = (<Landing data={_application} />);
	}
		

	return (<Frame data={data} active="1" navigation="false" />)		
} 

export default withRouter(_Application)



