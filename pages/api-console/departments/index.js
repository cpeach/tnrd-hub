import Link    from 'next/link';
import gd      from '../data.json'; // global data
import ld      from './data.json';  // local data
import {useState} from "react"
import api 	   from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Frame   from '/components/frames/frame.js';
import Table   from '/components/layout/tables/table.js';
import Description from '/components/layout/descriptions/description.js';
import Content from '/components/layout/stacks/index.js';
import { Popconfirm, message } from 'antd';
import {DeleteFilled} from '@ant-design/icons';


export default function Departments(props) { 
	
	const l_data = JSON.parse(JSON.stringify(ld))
	const g_data = JSON.parse(JSON.stringify(gd))
	
	const [target,setTarget] = useState();
	
	const departments = api({url:'/api-console/departments'});
	
	const handleDelete = async (e)=>{
		var results = await client({url:"/api-console/departments/"+target,params:{method:'DELETE'}})
		window.location.href = '/api-console/departments' 
	}


	if(departments){
		l_data.table.columns[2].render = (record)=>(
			<Link href={"/api-console/departments/modify/"+record._id}>Edit</Link>
		);
		l_data.table.columns[3].render = (record)=>(
			<Popconfirm title="Are you sure to delete this record?" onConfirm={handleDelete} okText="Yes" 	cancelText="No" >
				<DeleteFilled onMouseOver={()=>{setTarget(record._id)}} style={{color:"rgb(120,120,120)"}} />
			</Popconfirm>
		);
		l_data.table.dataSource = departments;
		l_data.table.dataSource.forEach((item,i)=>{
			item.key=item.short+"-"+i;
			item._expandable = (<Description data={{...l_data.table.expandable}} record={{...item}} />)
		});

		l_data.content 	= (<Table data={l_data.table} />);
		g_data.content  = (<Content data={l_data} />);


		return ( <Frame user={props.user} apps={props.apps} data={g_data} active="0" />)
	}else{
		return (<></>)								
	}
} 





