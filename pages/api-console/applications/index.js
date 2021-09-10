import Link    from 'next/link';
import {useState,useEffect}    from 'react';
import gd      from '../data.json'; // global data
import ld      from './data.json';  // local data
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame.js';
import Table   from '/components/layout/tables/table.js';
import Description from '/components/layout/descriptions/description.js';
import Content from '/components/layout/stacks/index.js';

import { Empty } from 'antd';

export default function Departments(props) { 

	var l_data = JSON.parse(JSON.stringify(ld))
	var g_data = JSON.parse(JSON.stringify(gd))

	const [applications, setApplications] = useState({});
	
	useEffect(async () => {
		let isMounted = true;
		let _applications = await client({url:'/api-console/applications'});
		isMounted?setApplications(_applications):null;
		return () => (isMounted = false)
	},[]);

	g_data.path = l_data.path;
	
	l_data.content 	= getContent(applications,l_data);
	g_data.content  = (<Content data={l_data} />);

	return ( <Frame user={props.user} apps={props.apps} data={g_data} active="1"  />)
} 
									
export function getContent(applications,data){
	
	if(applications && applications.length>0){
		applications.map((item,i)=>{
			let names = "";
			if(typeof item.departments!=='string'){
				item.departments.map((department,d)=>{
					names += department.name+","
				});
				names = names.slice(0, -1)
				applications[i].departments = names;
			}
		})	
		data.table.columns[0].render = (record)=><img src={(record.image?record.image.url:'')===''?"/icons/app.png":record.image.url} width={36} height={36} />;
		data.table.columns[4].render = (record)=><Link href={"/api-console/applications/modify/"+record._id}>Edit</Link>;
		data.table.dataSource = applications;
		data.table.dataSource.forEach((item)=>{
			item.key=item.short;
			item.source = "application"
			item._expandable = (<Description data={{...data.table.expandable}} record={{...item}} />)
		});
		return (<Table data={data.table} />)
	}else{
		return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
	}	
}





