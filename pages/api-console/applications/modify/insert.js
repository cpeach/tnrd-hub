import React    from 'react';
import {withRouter} from 'next/router';
import api 	    from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Form     from '/components/form/form.js';
import Frame    from '/components/frames/frame.js';
import Content  from '/components/layout/stacks/index.js';
import {notification} from 'antd';
import gd   from '../../data.json';
import ld   from './data.json';



export default function Insert(props){

	const l_data = JSON.parse(JSON.stringify(ld))
	const g_data = JSON.parse(JSON.stringify(gd))
	
	const handleSubmit = async(data) => {
	
		var notice = {duration:4}

		data.ui = data.ui ? data.ui : {};
		data.ui.menu = data.menu || [];
		data.ui.resources = data.resources || []
		delete data.menu;
		delete data.resources;

		var results = await client({url:"/api-console/applications",params:{method:"POST",body:data}})
		
		if(results._id){
			notice.duration    = l_data.notices.insert.complete.duration;
			notice.message     = l_data.notices.insert.complete.message.replace('_$name',results.name);
			notice.description = l_data.notices.insert.complete.description;
			notification['success'](notice);
		}else{
			notice.duration    = l_data.notices.insert.complete.duration;
			notice.message     = l_data.notices.insert.failed.message;
			notice.description = results.message; 
			notification['error'](notice);
	
		}
		
		window.location.href = '/api-console/applications'

	}



	var departments = api({url:"/api-console/departments"})
	if(departments && departments.length>0){
		l_data.title = "Insert";
		l_data.path[4] = {"label":"Insert","href":"/api-console/application"}	
		l_data.form.fields[2].options = departments.map(item=>({label:item.name,name:item.short,value:item._id}));
		l_data.content = (<Form  key="form" size="10" form={l_data.form} onSubmit={handleSubmit} ></Form>)
		g_data.content = (<Content data={l_data} />);	

		return ( <Frame user={props.user} apps={props.apps} data={g_data} active="1" />)
	}else{
		return <></>
	}
	
}

export default withRouter(Insert)
