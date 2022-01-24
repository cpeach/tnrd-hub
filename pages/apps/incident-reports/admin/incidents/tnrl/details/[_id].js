
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
		"path"  : {"back":{"label":"Back to Incidents","href":"/incident-reports/admin/incidents/tnrl"}}};
	const {_id}  =  router.query;

	const [item, setItem] = useState();
	const [settings, setSettings] = useState();
	const [administrators, setAdministrators] = useState();
	


	useEffect(async () => {
		let isMounted = true;
		let _item = await client({url:"/incident-reports/incidents/tnrl/"+_id});
		let _settings = await client({url:"/incident-reports/settings/tnrl"});
		var _administrators = await client({url:"/incident-reports/settings/administrators"});
		
		if(isMounted){
			setItem(_item)
			setSettings(_settings)
			setAdministrators(_administrators);
		}
		return () => (isMounted = false)
	},[]);


	
	if(item && settings && administrators){

		let submited = moment(item.submited,"YYYY-MM-DD").format("LL")
		let date     = moment(item.date,"YYYY-MM-DD").format("LL")
		let reported_by;
		administrators.map(_item=>{if(_item._id===item["reported-by"]){reported_by = _item.name}})

		let staff_present=[];
		administrators.map(_item=>{
			item["staff-present"].map(_staff=>{
				if(_item._id===_staff){staff_present.push(_item.name)}
			})
		})
		
		staff_present = staff_present.toString()

		settings["action-list"][parseInt(item["action-list"])]

		data.content = (

				<Page>
					<h1 className="mar_md pad_bottom_sm">Incident Report</h1>
					<p className="mar_md pad_bottom_xl _11"> Incident Report Forms are used to notify Safety of an Injury, Near Miss or Hazard encounter.</p>
					<div className={"mar_x_md"}>
						<Descriptions  bordered>
							<Descriptions.Item label="Submitted Date" span="3">{submited}</Descriptions.Item>
							<Descriptions.Item label="Incident Date" span="3">{date+" @"+item.time}</Descriptions.Item>
							<Descriptions.Item label="Reported By" span="3">{reported_by}</Descriptions.Item>
							
							<Descriptions.Item label="Branch"span="3">{settings.branches[item.branches].name}</Descriptions.Item>
							<Descriptions.Item label="Location"span="3">{item.location}</Descriptions.Item>
							
							<Descriptions.Item label="Patrons Involved" span="3">{
								item.patrons.map(_item=>{
									return <div className="mar_y_md "><b>{_item.label}</b><br/><span>{_item.barcode}</span><br/><p className="small">{_item.description}</p></div>
								})
							}</Descriptions.Item>
							<Descriptions.Item label="Staff Present" span="3">{staff_present}</Descriptions.Item>
							<Descriptions.Item label="Witnesses" span="3">{
								item.witnesses.map(_item=>{
									return <div className="mar_y_md "><b>{_item.label}</b><br/><p className="small">{_item.description}</p></div>
								})
							}</Descriptions.Item>
							<Descriptions.Item label="Incident Description" span="3">{item.description}</Descriptions.Item>

							<Descriptions.Item label="Actions Taken" span="3">{
								item["action-list"].map(_item=>{
									return (<li>{settings["action-list"][_item].name}</li>);
								})
							}</Descriptions.Item>

							<Descriptions.Item label="Action Details" span="3">{item["action-details"]}</Descriptions.Item>

							<Descriptions.Item label="Action followup items" span="3">{
								item["action-followup-items"].map(_item=>{
									return <div className="mar_y_md "><b>{_item.label}</b><br/><p className="small">{_item.description}</p></div>
								})
							}</Descriptions.Item>

							<Descriptions.Item label="Additional Comments" span="3">{item["additional"]}</Descriptions.Item>

			
						</Descriptions>
					</div>
				</Page>
			
			);

			return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)	
			
	}else{   
		return <></>
	}

	
	
}



