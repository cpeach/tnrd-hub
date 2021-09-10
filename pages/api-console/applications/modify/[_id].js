import React         from 'react';
import {withRouter} from 'next/router';
import {useState,useEffect}    from 'react';
import api 	   from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Form     from '/components/form/form.js';
import Frame    from '/components/frames/frame.js';
import Content  from '/components/layout/stacks/index.js';
import {notification,message} from 'antd';
import gd from '../../data.json';
import ld from './data.json';


function Update(props){
	
	const l_data = JSON.parse(JSON.stringify(ld))
	const g_data = JSON.parse(JSON.stringify(gd))
	let {_id} =  props.router.query


	const handleSubmit = async (data)=> {

		var notice = {duration:4}

		data._id = _id;
		data.ui = data.ui ? data.ui : {};
		data.ui.menu = data.menu;
		data.ui.resources = data.resources
		delete data.menu;
		delete data.resources;
	
		var results = await client({url:"/api-console/applications",params:{method:"PUT",body:data}})
		if(results.nModified===1){
			notice.message = 'Application Updated';
			notice.description = 'The contents of '+data.name+' have been sucessfully updated!' 
			notification['success'](notice);
		}else{
			notice.message = 'Update Failed';
			notice.description = 'The contents of '+data.name+' were not able to be updated!' 
			notification['error'](notice);
		}
		window.location.href = '/api-console/applications'
	}
	
	const handleDelete = async ()=>{

		var results = await client({url:"/api-console/applications/"+_id,params:{method:"DELETE"}})

		props.router.push('/api-console/applications');
		if(results.ok){
			message.success('Record deleted');
		}else{
			message.error('Record could not be deleted');
		}
		console.log(results)

	}
	
	const getForm = (data,departments,l_data)=>{

			var form = l_data.form

			form.id = data._id;

			
			form.fields[0].attributes.defaultValue = data.name;
			form.fields[1].attributes.defaultValue = data.short;
			form.fields[2].options = departments.map(item=>({label:item.name,name:item.short,value:item._id}));
			form.fields[2].attributes.defaultValue = data.departments.map(item=>(item._id));

			form.fields[3].attributes.defaultValue = data.description;
			form.fields[4].attributes.defaultValue = data.image?data.image:'';
			form.fields[4].meta = data.image_meta;
			form.fields[5].attributes.defaultValue = data.ui&&data.ui.menu?data.ui.menu:'';
			form.fields[6].attributes.defaultValue = data.ui&&data.ui.resources?data.ui.resources:'';

			return (<Form key="form" size="10" form={form} onSubmit={handleSubmit} onDelete={handleDelete} ></Form>);
	}
	
	var application = api({url:"/api-console/applications/"+_id})
	var departments = api({url:"/api-console/departments/"})
	
	if(application && departments && departments.length>0){
		l_data.title   = "Update"
		l_data.path[4] = {"label":"Update","href":"/api-console/application"}	
		l_data.content = getForm(application,departments,l_data);
		g_data.content = (<Content data={l_data} />);	
		
	}

	return ( <Frame user={props.user} apps={props.apps} data={g_data} active="1" />)
	
}



export default withRouter(Update)


