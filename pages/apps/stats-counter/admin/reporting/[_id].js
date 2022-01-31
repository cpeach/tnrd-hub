import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';
import {useState,useEffect} from 'react';

export default function Insert(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query

	const [locations, setLocations] = useState();
	const [report, setReport] = useState();

	const handleSubmit = async(data) => {
		
		report.name = data.name;
		report.description     = data.description;
		report.parameters.to   = data.to;
		report.parameters.from = data.from;
		report.parameters.locations = data.locations;
		
		var results = await client({url:"/stats-counter/reports/items",params:{method:"PUT",body:report}})
		success(["Success","Your Report record was updated."]);
		window.location.href = '/stats-counter/admin/reporting/';  
	}

	useEffect(async () => {
		let isMounted = true;
		let _report = await client({url:'/stats-counter/reports/items/'+_id});
		let _locations = await client({url:'/stats-counter/locations'});

		if(isMounted){
			setReport(_report);
			setLocations(_locations);
		}
		return () => (isMounted = false)
	},[]);

	const handleDelete = async(data) => {
		var results = await client({url:"/stats-counter/reports/"+_id,params:{method:"DELETE"}})
		console.log(results)
		if(results.code===1){
			success(["Success","Your report record was deleted."]);
			window.location.href = '/stats-counter/admin/reporting/'; 
		}else{
			error(["Failed",results.message]);
		}
	}	
	
	if(report&&locations){

		data.form.subtitle = "ID : "+_id;
		data.form.title = "Update";

		let group_list = [],id;
		let groups     = [];
		locations.map(item=>{
			id = item.group._id.toString();
			if(!group_list.includes(id)){
				group_list.push(id);
				groups.push(item.group)
			}
		})

		data.form.fields[0].value = report.name;
		data.form.fields[1].value = report.description;
		data.form.fields[2].value = report.parameters.from;
		data.form.fields[3].value = report.parameters.to;

		data.form.fields[4].groups  = groups.map(item=>({label:item.name,name:item.name,value:item._id}));
		data.form.fields[4].options = locations.map(item=>({label:item.name,name:item.name,value:item._id,group:item.group._id}));
		data.form.fields[4].value   = report.parameters.locations;
		data.form.fields[5].value   = _id;
		
		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} onDelete={handleDelete} />
	}else{
		return <></>
	}
	

	
	
}
