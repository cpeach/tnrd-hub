import {withRouter}  from 'next/router'
import api 	    from '/scripts/api.js';
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
	
	const {_id} = props.router.query
	console.log(_id)
	const handleSubmit = async (data) => {

		var notice = {duration:4}

		data._id = _id;
		var results = await client({url:"/api-console/departments",params:{method:"PUT",body:data}})
		if(results.nModified===1){
			notice.message = 'Department Updated';
			notice.description = 'The contents of '+data.name+' have been sucessfully updated!' 
			notification['success'](notice);
		}else{
			notice.message = 'Update Failed';
			notice.description = 'The contents of '+data.name+' were not able to be updated!' 
			notification['error'](notice);
		}

		props.router.push('/api-console/departments') 
	}
	const handleDelete = async ()=>{
		var results = await client({url:"/api-console/departments/"+_id,params:{method:'DELETE'}})
		props.router.push('/api-console/departments');
		results.ok ? message.success('Record deleted') : message.error('Record could not be deleted');
	}
	
	var department = api({url:"/api-console/departments/"+_id})
	
	if(department){
		l_data.title   = "Update"
		l_data.path[3] = {"label":"Update","href":"/api-console/department"}	
		l_data.content = getForm(department,l_data,handleSubmit,handleDelete);
		g_data.content = (<Content data={l_data} />);	
		return ( <Frame user={props.user} apps={props.apps} data={g_data} active="1" />)
	}else{
		return <></>
	}
	
}


export function getForm(department,l_data,handleSubmit,handleDelete){

	var form = l_data.form

	form.id = department._id;
	form.fields[0].attributes.defaultValue = department.name;
	form.fields[1].attributes.defaultValue = department.short;

	return (<Form key="form" size="10" form={form} onSubmit={handleSubmit} onDelete={handleDelete} ></Form>);
}



export default withRouter(Update)


