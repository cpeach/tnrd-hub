import Link    from 'next/link';
import gd      from '../data.json'; // global data
import ld      from './data.json';  // local data
import api 	   from '/scripts/api.js';
import Frame   from '/components/frames/frame.js';
import Table   from '/components/layout/tables/table.js';
import Description from '/components/layout/descriptions/description.js';
import Content from '/components/layout/stacks/index.js';




export default function Departments() { 
	
	const l_data = JSON.parse(JSON.stringify(ld))
	const g_data = JSON.parse(JSON.stringify(gd))
	
	
	const departments = api({url:'/admin/hub/departments'});
	
	if(departments){
		l_data.table.columns[2].render = (record)=><Link href={"/admin/console/departments/modify/"+record._id}>Edit</Link>;
		l_data.table.dataSource = departments;
		l_data.table.dataSource.forEach((item,i)=>{
			item.key=item.short+"-"+i;
			item._expandable = (<Description data={{...l_data.table.expandable}} record={{...item}} />)
		});

		l_data.content 	= (<Table data={l_data.table} />);
		g_data.content  = (<Content data={l_data} />);


		return (<Frame data={g_data} active="0" />)
	}else{
		return (<></>)								
	}
} 





