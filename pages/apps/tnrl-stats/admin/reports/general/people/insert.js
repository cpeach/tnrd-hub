
import client 	from '/scripts/client-api.js';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';
import {useState,useEffect} from 'react';

export default function Insert(props){

	const data   = JSON.parse(JSON.stringify(ld))

	const [departments, setDepartments] = useState();
	const [department, setDepartment] = useState();
	const [groups, setGroups] = useState();
	const [group, setGroup] = useState();
	const [locations, setLocations] = useState();


	useEffect(async () => {
		console.log("the department changed")
	},[department]);

	useEffect(async () => {
		console.log("the group changed")
	},[group]);

	useEffect(async () => {
		let isMounted = true;
		let _departments = await client({url:'/stats-counter/departments/'});
		let _groups = await client({url:'/stats-counter/groups/'});
		let _locations = await client({url:'/stats-counter/locations/'});

		if(isMounted){
			setDepartments(_departments);
			setGroups(_groups);
			setLocations(_locations);
			
		}
		return () => (isMounted = false)
	},[]);


	const handleSubmit = async(data) => {
	console.log(data)
		let params = {year:data.year,departments:data.departments,groups:data.groups,locations:data.locations}

		delete data._id
		delete data.year
		delete data.departments
		delete data.groups
		delete data.locations

		data.parameters = params;

		console.log(data);

		var results = await client({url:"/tnrl-stats/reports/general/people",params:{method:"POST",body:data}})
		success(["Success","A new Report record was inserted."]);
		window.location.href = '/tnrl-stats/admin/reports/general/people'; 
	}

	const handleChange = (p)=>{
		console.log(p)
	}

	if(departments && groups && locations){
		
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

		
		let default_department = departments[0]._id;
		data.form.fields[3].options = departments.map((item,i)=>({label:item.name,name:item._id,value:item._id}));
		data.form.fields[3].value = default_department;

		let default_group;
		data.form.fields[4].options = groups.map((group,g)=>{
			return {label:group.name,name:group._id,value:group._id}
			/*if(group.department == default_department){
				default_group = default_group || group._id;
				return {label:group.name,name:group._id,value:group._id}
			}*/
		});
		//data.form.fields[4].value = default_group;
		
		let vals = []
		locations.map((location)=>{
			/*
			if(location.group._id.toString() == default_group.toString()){
				vals.push({label:location.name,name:location._id,value:location._id})
			}
			*/
			
		})
		//data.form.fields[5].options = vals;
		
		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} onChange={handleChange} />

	}else{
		return <></>
	}

	
	
}
