import React    from 'react';

import router   from 'next/router'
import api 	   from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Form     from '/components/form/form.js';
import Frame    from '/components/frames/frame.js';
import Content  from '/components/layout/stacks/content.js';
import {notification} from 'antd';
import gd   from '../../data.json';
import ld   from './data.json';



export default function Insert(props){
	
	const l_data = JSON.parse(JSON.stringify(ld))
	const g_data = JSON.parse(JSON.stringify(gd)) 
	

	const handleSubmit = async(data) => {
	
		console.log(l_data);

		var notice = {};
		var results = await client({url:"/admin/hub/users",params:{method:"POST",body:data}})
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
		this.props.router.push('/admin/console/applications')  

	}


	l_data.title   = "Insert";
	l_data.path[4] = {"label":"Insert","href":"/admin/console/users"}	
	//l_data.form.fields[0].options = departments.map(item=>({label:item.name,name:item.short,value:item._id}));
	l_data.content = (<Form  key="form" size="10" form={l_data.form} onSubmit={handleSubmit} ></Form>)
	g_data.content = (<Content data={l_data} />);	

	return (<Frame data={g_data} active="1" />)
	
	
}



/* 
 function Insert() { 
	
	var l_data = JSON.parse(JSON.stringify(ld))
	var g_data = JSON.parse(JSON.stringify(gd))
	
	var users = api({url:'/admin/hub/users'});
	
	if(users){ 
		l_data.title   = "Insert";
		l_data.path[4] = {"label":"Insert","href":"/admin/console/users"}	
		//l_data.form.fields[0].options = users.map(item=>({label:item.name,name:item.short,value:item._id}));
		l_data.content = (<Form key="form" size="10" form={l_data.form} onSubmit={handleSubmit} ></Form>)
		g_data.content = (<Content data={l_data} />);	
			
		return (<Frame data={g_data} active="3" />)
	}else{
		return <></>
	}
} 
									
export async function handleSubmit(data) {
	var notice = {};

	var results = api({url:"/admin/hub/departments",method:"POST",body:data})
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
	this.props.router.push('/admin/console/departments') 
}

export default withRouter(Insert)


 */

