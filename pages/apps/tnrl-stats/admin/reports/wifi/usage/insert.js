import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';
import {useState,useEffect} from 'react';

export default function Insert(props){

	const data   = JSON.parse(JSON.stringify(ld))

	const [locations, setLocations] = useState();

	useEffect(async () => {
		let isMounted = true;
		let _locations = await client({url:'/stats-counter/locations'});
		
		if(isMounted){
			setLocations(_locations);
			
		}
		return () => (isMounted = false)
	},[]);


	const handleSubmit = async(data) => {
	
		let params = {to:data.to,from:data.from,locations:data.locations}

		delete data._id
		delete data.to
		delete data.from
		delete data.locations

		data.parameters = params;

		console.log(data);

		var results = await client({url:"/stats-counter/reports/items",params:{method:"POST",body:data}})
		success(["Success","A new Report record was inserted."]);
		window.location.href = '/stats-counter/admin/reporting/'; 
		console.log(results)
	}

	if(locations){
		
		let group_list = [],id;
		let groups = [];
		locations.map(item=>{
			id = item.group._id.toString();
			if(!group_list.includes(id)){
				group_list.push(id);
				groups.push(item.group)
			}
		})
		console.log(groups)
		data.form.fields[4].groups  = groups.map(item=>({label:item.name,name:item.name,value:item._id}));
		data.form.fields[4].options = locations.map(item=>({label:item.name,name:item.name,value:item._id,group:item.group._id}));

		//data.form.fields[4].options = locations.map(item=>({label:item.name,name:item._id,value:item._id}));
		
		
		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} />

	}else{
		return <></>
	}

	
	
}
