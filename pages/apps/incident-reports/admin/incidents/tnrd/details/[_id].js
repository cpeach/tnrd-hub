
import client 	from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import Page    from '/components/layout/pages/index.js'
import {useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import { Descriptions, Badge } from 'antd';
import moment  from 'moment';

export default function Update(props){

	const router = useRouter();
	const data   = {
		"path"  : {"back":{"label":"Back to Incidents","href":"/incident-reports/admin/incidents/tnrd"}}};
	const {_id}  =  router.query;

	const [item, setItem] = useState();
	const [settings, setSettings] = useState();
	const [administrators, setAdministrators] = useState();
	


	useEffect(async () => {
		let isMounted = true;
		let _item = await client({url:"/incident-reports/incidents/tnrd/"+_id});
		let _settings = await client({url:"/incident-reports/settings/tnrd"});
		var _administrators = await client({url:"/incident-reports/settings/administrators"});
		
		if(isMounted){
			setItem(_item)
			setSettings(_settings)
			setAdministrators(_administrators);
		}
		return () => (isMounted = false)
	},[]);


	
	if(item && settings && administrators){

	let critical_types = item['type-critical'].map(item=>settings['critical-types'][item].name)
	

	

	

	let submited = moment(item.submited,"YYYY-MM-DD").format("LL")
	let date     = moment(item.date,"YYYY-MM-DD").format("LL")
	let issuer;
	administrators.map(_item=>{if(_item._id===item.issuer){issuer = _item.name}})

	console.log(item.issuer)
	console.log(issuer)

	data.content = (

			<Page>
				<h1 className="mar_md pad_bottom_sm">Incident Report</h1>
				<p className="mar_md pad_bottom_xl _11"> Incident Report Forms are used to notify Safety of an Injury, Near Miss or Hazard encounter.</p>
				<div className={"mar_x_md"}>
					<Descriptions  bordered>
						<Descriptions.Item label="Submitted Date" span="3">{submited}</Descriptions.Item>
						<Descriptions.Item label="Incident Date" span="3">{date+" @"+item.time}</Descriptions.Item>
						<Descriptions.Item label="Reported By" span="3">{issuer}</Descriptions.Item>
						<Descriptions.Item label="Reported to supervisor" span={3}>
							<Badge status={item.reported?"success":"error"} text={item.reported?"Yes":"No"} />
						</Descriptions.Item>
						<Descriptions.Item label="Committee (Union)" span="3">{item['committee']==="0"?"BCGEU":"CUPE"}</Descriptions.Item>
						<Descriptions.Item label="General Type" span="3">{settings['general-types'][item['type-general']].name}</Descriptions.Item>
						<Descriptions.Item label="Critical Types" span="3">{
							critical_types.map(_item=>{
								return (<li>{_item}</li>);
							})
						}</Descriptions.Item>
						
						<Descriptions.Item label="Department"span="3">{settings.departments[item.department].name}</Descriptions.Item>
						<Descriptions.Item label="Location"span="3">{item.location}</Descriptions.Item>
						
						<Descriptions.Item label="Estimate of property damage" span="3">{item.estimate}</Descriptions.Item>

						<Descriptions.Item label="Incident Description" span="3">{item.description}</Descriptions.Item>

						<Descriptions.Item label="People Involved" span="3">{
							item.parties.map(_item=>{
								return <div className="mar_y_md "><b>{_item.label}</b><br/><p className="small">{_item.description}</p></div>
							})
						}</Descriptions.Item>

						<Descriptions.Item label="What corrective action was taken?" span="3">{item["corrective-action"]}</Descriptions.Item>

						<Descriptions.Item label="Action Items" span="3">{
							item["action-items"].map(_item=>{
								return <div className="mar_y_md "><b>{_item.label}</b><br/><p className="small">{_item.description}</p></div>
							})
						}</Descriptions.Item>

		
					</Descriptions>
				</div>
			</Page>
		
		);

		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)	
		
	}else{   
		return <></>
	}

	
	
}



