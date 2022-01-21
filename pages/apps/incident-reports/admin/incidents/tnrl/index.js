

import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Locations(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))

	const data = JSON.parse(JSON.stringify(ld))
	
	const [items, setItems] = useState();
	const [settings, setSettings] = useState();
	const [administrators, setAdministrators] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _items = await client({url:'/incident-reports/incidents/tnrl/list',params:{method:'POST',body:{}}});
		var _settings = await client({url:"/incident-reports/settings/tnrl"});
		var _administrators = await client({url:"/incident-reports/settings/administrators"});

		if(isMounted){
			setItems(_items);
			setSettings(_settings);
			setAdministrators(_administrators);
		}
		return () => (isMounted = false)
	},[]);

	

	if(items&&settings&&administrators){

		console.log(items)
		console.log(settings)
		console.log(administrators)
		l_data.list.columns[0].render = (p)=>{return p.split("T")[0]}
		l_data.list.columns[1].render = (p)=>{return administrators.map(item=>{
			if(p === item._id){return item.name}
		})}
		
		l_data.list.columns[2].render = (p)=>{return settings.branches[p].name}
		l_data.list.columns[3].render = (p)=>{return <Link href={"/incident-reports/admin/incidents/tnrd/details/"+p}>VIew</Link>}
		l_data.list.columns[4].render = (p)=>{return <Link href={"/incident-reports/admin/incidents/tnrd/edit/"+p}>Edit</Link>}
		
		l_data.list.rows   = items;
		
		let data = {};
		//data.path = {"back":{"label":"Back incident categories","href":"/incident-reports/admin/incidents"}}
		data.content  = 
					(
						<Page><List data={l_data.list} ><div>List</div></List></Page>
					);
		
		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)

	}else{
		return ( <></>)
	}

}





