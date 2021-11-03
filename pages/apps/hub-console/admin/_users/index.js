import Link    from 'next/link';
import gd      from '../data.json'; // global data
import ld      from './data.json';  // local data
import api 	   from '/scripts/api.js';
import Frame   from '/components/frames/frame.js';
import Table   from '/components/layout/tables/table.js';
import Description from '/components/layout/descriptions/description.js';
import Content from '/components/layout/stacks/index.js';


export default function Users(props) { 
		
	const l_data = JSON.parse(JSON.stringify(ld))
	const g_data = JSON.parse(JSON.stringify(gd))
	
	const users = api({url:'/api-console/users'});
	
	if(users){
		l_data.table.columns[3].render = (record)=><Link href={"/api-console/users/modify/"+record._id}>Edit</Link>;
		l_data.table.dataSource = users;
		l_data.table.dataSource.forEach((item)=>{
			item.key=item._id;
			item._expandable = (<Description data={{...l_data.table.expandable}} record={{...item}} />)
		});

		l_data.content 	= (<Table data={l_data.table} />);
		g_data.content  = (<Content data={l_data} />);


		return ( <Frame user={props.user} apps={props.apps} data={g_data} active="3" />)
	}else{
		return <></>									
	}
} 




