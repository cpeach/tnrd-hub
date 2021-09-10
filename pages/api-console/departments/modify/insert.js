import React    from 'react';
import {withRouter} from 'next/router'
import api 	    from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Form     from '/components/form/form.js';
import Frame    from '/components/frames/frame.js';
import Content  from '/components/layout/stacks/index.js';
import {notification} from 'antd';
import gd   from '../../data.json';
import ld   from './data.json';


import { Empty } from 'antd';



 function Insert(props) { 
	
	var l_data = JSON.parse(JSON.stringify(ld))
	var g_data = JSON.parse(JSON.stringify(gd))
	
	const handleSubmit = async (data) =>{
		var notice = {};

		var results = await client({url:"/api-console/departments",params:{method:"POST",body:data}})
		if(results._id){
			notice.duration    = l_data.notices.insert.complete.duration;
			notice.message     = l_data.notices.insert.complete.message.replace('_$name',results.name);
			notice.description = l_data.notices.insert.complete.description;
			notification['success'](notice);
		}else{
			notice.duration    = l_data.notices.insert.complete.duration;
			notice.message     = l_data.notices.insert.failed.message;
			notification['error'](notice);

		}
		props.router.push("/api-console/departments")
	}
	

	l_data.title = "Insert";
	l_data.path[4] = {"label":"Insert","href":"/api-console/departments"}	
	l_data.content = (<Form key="form" size="10" form={l_data.form} onSubmit={handleSubmit} ></Form>)
	g_data.content = (<Content data={l_data} />);	
	return ( <Frame user={props.user} apps={props.apps} data={g_data} active="0" />)

} 


export default withRouter(Insert)
