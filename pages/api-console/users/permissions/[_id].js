
import style from './Permissions.module.css';
import {withRouter} from 'next/router';
import {useState,useEffect}    from 'react';
import api 	   from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Frame    from '/components/frames/frame.js';
import Table    from '/components/layout/tables/table.js';
import {Select,notification,message,Switch,Description,Modal } from 'antd';
import ld from './data.json';

const { Option } = Select;

function User(props){

	//var _options = (<Option value="1">1</Option><Option value="2">2</Option>)

	const l_data = JSON.parse(JSON.stringify(ld))
	const {_id} =  props.router.query
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [options,setOptions] = useState();
	const [current,setCurrent] = useState('');
	const [selectRole,setSelectRole] = useState();

	var applications = api({url:"/admin/hub/applications/"})
	var user		 = api({url:"/admin/hub/users/profile/"+_id});

	const onBlock  = async (checked,e)=>{
		var app = e.currentTarget.id.split("-")[1];
		var results = await client({url:"/admin/hub/users/blocked/"+_id+"/"+app,params:{method:"PUT",body:{"blocked":checked}}})
		if(results.n===0){
			message.error('Failed');
		}
		
	}

	const changeRole  = async (e)=>{

		setIsModalVisible(true);

		var id    = e.currentTarget.id;
		var roles = await client({url:"/admin/hub/roles/application/"+id});
		var current_role = user.applications[current] ? user.applications[current].role._id:roles[0]._id
		
		setCurrent(id);

		var _options = (
						<>
							{roles.map((item,i)=>(<Option key={"option-"+i} value={item._id}>{item.name}</Option>))}
						</>
						)
		
		setSelectRole(current_role)								
		setOptions(_options)				
		
	}

	const onOk 		= async ()=>{
		setIsModalVisible(false);
		
		var data    = user.applications[current] || {}
		data.role   = selectRole;
		var results = await client({url:"/admin/hub/users/role/"+_id+"/"+current,params:{method:"PUT",body:data}})
		
		window.location.reload();
	}
	const onCancel  = ()=>{
		setIsModalVisible(false);
	}

	const setRole = (value)=>{setSelectRole(value)}

	if(applications && applications.length>0 && user){

		var name = user.profile.first_name +" "+ user.profile.last_name;
		applications.map((app,a)=>{
			
			app.key = "row-"+a;
			for(var i in user.applications){
				if(i===app._id){
					app.blocked = user.applications[i].blocked===true?true:false;
					app.role = user.applications[i].role.name;
				}
			}
			app.role = app.role || "Public"	
		});
		l_data.table.columns[1].render = (record)=>(<a id={record._id} onClick={changeRole} >{record.role}</a>);
		l_data.table.columns[2].render = (record)=>{return record.blocked ? (<Switch defaultChecked id={"block-"+record._id} onChange={onBlock} />):(<Switch id={"block-"+record._id} onChange={onBlock} />)};
		
		l_data.table.dataSource = applications;

		l_data.content = (
			<div className={style.permissions}>
				<h1>Permissions</h1>
				<div className={style.permissions_details}>
					<label>User: </label>
					<span>{name}</span>
				</div>
				<Table data={l_data.table} options={false} />
				<Modal className={style.permissions_modal} visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
					<h4>Allow Access?</h4>
					<p>By selecting from the following options you will be enabling this user with access and the corasponding funcationality that comes with the respective roles.</p>
					<label>Permissions</label>
					<Select value={selectRole} onChange={setRole}>
						{options}
					</Select>
			</Modal>
			</div>
		);	
	}

	return ( <Frame user={props.user} apps={props.apps} data={l_data} active="1" navigation="false" permissions={['role']} />)

}



export default withRouter(User)


