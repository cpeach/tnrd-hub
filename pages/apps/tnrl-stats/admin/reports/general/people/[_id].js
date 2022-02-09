import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Form,{success,error}     from '/components/forms/index.js';
import {useRouter} from 'next/router';
import ld   from './data.json';
import {useState,useEffect} from 'react';

export default function Insert(props){

	const data   = JSON.parse(JSON.stringify(ld));

	const router = useRouter();
	const {_id} =  router.query


	const [report, setReport] = useState();
	const [departments, setDepartments] = useState();
	const [department, setDepartment] = useState();
	const [groups, setGroups] = useState();
	const [group, setGroup] = useState();
	const [locations, setLocations] = useState();

	useEffect(async () => {
		let isMounted = true;
		let _report    = await client({url:'/hub-console/reports/'+_id});
		let _departments = await client({url:'/stats-counter/departments/'});
		let _groups = await client({url:'/stats-counter/groups/'});
		let _locations = await client({url:'/stats-counter/locations/'});
		
		if(isMounted){
			setDepartments(_departments);
			setGroups(_groups);
			setLocations(_locations);
			setReport(_report);
			
		}
		return () => (isMounted = false)
	},[]);


	const handleSubmit = async(data) => {
	
		let params = {year:data.year,departments:data.departments,groups:data.groups,locations:data.locations}

		delete data._id
		delete data.year
		delete data.departments
		delete data.groups
		delete data.locations

		data.parameters = params;
		data._id = _id;


		var results = await client({url:"/tnrl-stats/reports/general/people",params:{method:"PUT",body:data}})
		success(["Success","A new Report record was inserted."]);
		window.location.href = '/tnrl-stats/admin/reports/general/people';
	}

	const handleDelete = async(data) => {
		
		var results = await client({url:"/hub-console/reports/"+_id,params:{method:"DELETE"}})
		if(results.deletedCount===1){
			success(["Success","Your Report record was deleted."]);
			window.location.href = '/tnrl-stats/admin/reports/general/people'; 
		}else{
			error(["Failed",results.message]);
		}
	}

	if(departments && groups && locations && report){
		console.log(report);

		data.form.subtitle = "ID : "+_id;
		data.form.title = "Update General People Report";
		
		data.form.fields[0].value = report.name;
		data.form.fields[1].value = report.description;
		data.form.fields[2].options = [
			{label:"2013",name:"2013",value:"2013"},
			{label:"2014",name:"2014",value:"2014"},
			{label:"2015",name:"2015",value:"2015"},
			{label:"2016",name:"2016",value:"2016"},
			{label:"2017",name:"2017",value:"2017"},
			{label:"2018",name:"2018",value:"2018"},
			{label:"2019",name:"2019",value:"2019"},
			{label:"2020",name:"2020",value:"2020"},
			{label:"2021",name:"2021",value:"2021"},
			{label:"2022",name:"2022",value:"2022"},
			{label:"2023",name:"2023",value:"2023"},
			{label:"2024",name:"2024",value:"2024"}
		]
		data.form.fields[2].value = report.parameters.year;
		
		data.form.fields[3].options = departments.map((item,i)=>({label:item.name,name:item._id,value:item._id}));
		data.form.fields[3].value = report.parameters.departments;

		let default_group;
		data.form.fields[4].options = groups.map((group,g)=>{
			if(group.department == report.parameters.departments){
				default_group = report.parameters.groups || group._id;
				return {label:group.name,name:group._id,value:group._id}
			}
		});
		data.form.fields[4].value = report.parameters.groups

		let vals = [];
		locations.map((location)=>{
			if(location.group._id.toString() == default_group.toString()){
				vals.push({label:location.name,name:location._id,value:location._id})
			}
			
		})
		data.form.fields[5].options = vals;
		data.form.fields[5].value = report.parameters.locations;
		
		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} onDelete={handleDelete} />

	}else{
		return <></>
	}

	
	
}
