
import style from './Permissions.module.css';
import {withRouter} from 'next/router';
import {useState,useEffect}    from 'react';
import api 	   from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Frame    from '/components/frames/frame.js';
import Table    from '/components/layout/tables/table.js';
import {notification,message,Switch,Description } from 'antd';
import ld from './data.json';

function User(props){

	const l_data = JSON.parse(JSON.stringify(ld))
	let {_id} =  props.router.query

	var applications = api({url:"/admin/hub/applications/"})
	var user		 = api({url:"/admin/hub/users/profile/"+_id});
	
	const onChange = ()=>{}

	if(applications && applications.length>0 && user){

		console.log(user)
		console.log(applications)
		
		applications.map((app,a)=>{
			app.key = "row-"+a;
			for(var i in user.applications){
				app.permission = i===app._id?"true":"false";
				app.role = i===app._id? user.applications[i].role.name:"Public";
			}	
		});
		
		l_data.table.columns[2].render = (record)=>{ return record.permission==="true"?(<Switch defaultChecked onChange={onChange} />):(<Switch onChange={onChange} />)};
		
		l_data.table.dataSource = applications;

		/* l_data.table.dataSource.forEach((item)=>{
			l_data.table.dataSource.key=item.short;
			//item.source = "application"
			//item._expandable = (<Description data={{...data.table.expandable}} record={{...item}} />)
		}); */
		l_data.content = (
			<div className={style.permissions}>
				<h1>Manage Access</h1>
				<Table data={l_data.table} options={false} />
			</div>
		);	
	}

	return (<Frame data={l_data} active="1" navigation="false"/>)

}



export default withRouter(User)


