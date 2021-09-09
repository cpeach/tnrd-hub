import Link    from 'next/link';
import gd      from '../data.json'; // global data
import ld      from './data.json';  // local data
import api 	   from '/scripts/api.js';
import Frame   from '/components/frames/frame.js';
import Table   from '/components/layout/tables/table.js';
import Description from '/components/layout/descriptions/description.js';
import Content from '/components/layout/stacks/index.js';


export default function Roles(props) { 
		
	const l_data = JSON.parse(JSON.stringify(ld))
	const g_data = JSON.parse(JSON.stringify(gd))
	
	const roles = api({url:'/api-console/roles'});
	if(roles){
		
		roles.sort((a,b)=>{return a.application.localeCompare(b.application);});
		
		var values = []
		roles.map((item,i)=>{values.includes(item.application)?null:values[i]=item.application});
		var filters = values.map(item=>({text:item,value:item}));
		
		l_data.table.columns[0].sortDirections = ['ascend','descend'];
		l_data.table.columns[0].filters=filters;
		l_data.table.columns[0].onFilter = (value, record) => {return record.application.includes(value);}
		
		l_data.table.columns[2].render = (record)=><Link href={"/api-console/roles/modify/"+record._id}>Edit</Link>;
		l_data.table.dataSource = roles;
		l_data.table.dataSource.forEach((item)=>{
			item.key=item._id;
			item._expandable = (<Description data={{...l_data.table.expandable}} record={{...item}} />)
		});

		l_data.content 	= (<Table data={l_data.table} />);
		g_data.content  = (<Content data={l_data} />);


		return ( <Frame user={props.user} apps={props.apps} data={g_data} active="2" />)
	}else{
		return <></>									
	}
} 




