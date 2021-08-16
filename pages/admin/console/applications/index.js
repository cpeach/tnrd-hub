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

export default function Departments() { 

	var l_data = JSON.parse(JSON.stringify(ld))
	var g_data = JSON.parse(JSON.stringify(gd))

	const [applications, setApplication] = useState({});
	
	useEffect(async () => {
		let isMounted = true;
		let _applications = await client({url:'/admin/hub/applications'});
		isMounted?setApplication(_applications):null;
		return () => (isMounted = false)
	},[]);


	//var applications = api({url:'/admin/hub/applications'});
	
	l_data.content 	= getContent(applications,l_data);
	g_data.content  = (<Content data={l_data} />);

	return (<Frame data={g_data} active="1" />)
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

		data.table.columns[3].render = (record)=><Link href={"/admin/console/applications/modify/"+record._id}>Edit</Link>;
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





