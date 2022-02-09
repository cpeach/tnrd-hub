
import client 	from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import Page    from '/components/layout/pages/index.js'
import {useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import { Descriptions, Badge } from 'antd';
import moment  from 'moment';

export default function Update(props){

	const router = useRouter();
	const data   = {"path"  : {"back":{"label":"Back to list","href":"/archived-permits/list/building"+location.search}}};
	const {_id}  =  router.query;

	const [item, setItem] = useState();
	
	useEffect(async () => {
		let isMounted = true;
		let _item = await client({url:"/archived-permits/records/building/"+_id});
		
		if(isMounted){
			setItem(_item);
		}
		return () => (isMounted = false)
	},[]);


	
	if(item){
		let fields = [];
		for(let i in item){
			fields.push(<Descriptions.Item label={i} span="3">{item[i]}</Descriptions.Item>)
		}

		data.content = (

			<Page>
				<h1 className="mar_md pad_bottom_sm">Archived Permit</h1><br/>
				<div className={"mar_x_md"}>
					<Descriptions  bordered>
						{fields}
					</Descriptions>
				</div>
			</Page>
		
		);

		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)	
		
	}else{   
		return <></>
	}

	
	
}



