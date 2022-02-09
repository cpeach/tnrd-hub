
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import { Empty } from 'antd';

import ld      from './data.json';  // local data

export default function Departments(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	
	l_data.list.columns[2].render = (p)=>{return <Link href={p}>View</Link>}
	
	let data = {};
	data.content  = 
				(
					<Page><List data={l_data.list} ><div>List</div></List></Page>
				);
	
	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)



}





