import React        from 'react';
import {withRouter} from 'next/router'
import api 	   from '/scripts/api.js';
import Form     from '/components/form/form.js';
import Frame    from '/components/frames/frame.js';
import Content  from '/components/layout/stacks/index.js';
import {notification,message} from 'antd';
import gd from '../../data.json';
import ld from './data.json';


function Update(props){
	
	const l_data = JSON.parse(JSON.stringify(ld))
	const g_data = JSON.parse(JSON.stringify(gd))
	
	const {_id} = props.router.query
	console.log(_id)
	var user = api({url:"/admin/hub/users/"+_id})
	
	if(user){
		l_data.title   = "Update"
		l_data.path[3] = {"label":"Update","href":"/api-console/user"}	
		l_data.content = this.getForm(user);
		g_data.content = (<Content data={l_data} />);	
			
			
		return ( <Frame user={props.user} apps={props.apps} data={g_data} active="1" />)
	}else{
		return <></>
	}
	
}


export async function handleSubmit(data) {

	var notice = {duration:4}

	data._id = this.props.user._id;
	var results = api({url:"/admin/hub/users",method:"PUT",body:data})

	if(results.nModified===1){
		notice.message = 'user Updated';
		notice.description = 'The contents of '+data.name+' have been sucessfully updated!' 
		notification['success'](notice);
	}else{
		notice.message = 'Update Failed';
		notice.description = 'The contents of '+data.name+' were not able to be updated!' 
		notification['error'](notice);
	}
	this.props.router.push('/api-console/users') 
}
export async function handleDelete(user){

	//var results = await api.users.delete(this.props.user._id);
	var results = api({url:"/admin/hub/users"+user._id,method:"DELETE"})
	this.props.router.push('/api-console/users');
	
	if(results.ok){
		message.success('Record deleted');
	}else{
		message.error('Record could not be deleted');
	}
	console.log(results)

}
export function getForm(user){

		var form = l_data.form
		
		form.id = user._id;
		
		form.fields[0].attributes.defaultValue = user.name;
		form.fields[1].attributes.defaultValue = user.short;
		
		return (<Form ref="form" key="form" size="10" form={form} onSubmit={handleSubmit} onDelete={handleDelete} ></Form>);
}



export default withRouter(Update)

