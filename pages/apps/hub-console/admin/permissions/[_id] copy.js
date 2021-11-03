
import api 	   from '/scripts/api.js';
import client  from '/scripts/client-api.js';
import Frame   from '/components/frames/frame2.js';
import List    from '/components/lists/index.js';
import Page    from '/components/layout/pages/index.js';
import {useState,useEffect}    from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { Empty,Modal,Select} from 'antd';
const {Option} = Select;

import ld      from './data.json';  // local data

export default function Permissions(props) { 

	let l_data = JSON.parse(JSON.stringify(ld))
	const [user,setUser] = useState();
	const [permissions, setPermissions] = useState();
	const [role, setRole] = useState(<Option></Option>);
	const [roles, setRoles] = useState(<Option></Option>);
	const [application, setApplication] = useState();
	const [dialogVisable, setDialogVisable] = useState(false);
	
	const router = useRouter();

	useEffect(async () => {
		let isMounted = true;
		let _permissions = await client({url:'/hub-console/users/permissions/list',params:{method:"POST","body":JSON.stringify({search:''})}});
		console.log(_permissions)
		let {_id}  = router.query;

		if(isMounted){
			setUser(_id);
			setPermissions(_permissions);
		}
		return () => (isMounted = false)
	},[]);
	
	const onChange = async (p)=>{
		return await client({url:'/hub-console/users/permissions/list',params:{method:"POST","body":JSON.stringify(p)}});
	}	
	const onDelete = async (p)=>{
		
	}
	const saveRole = async()=>{
		
		let params = JSON.stringify({user:user,application:application,role:role})
		let res = await client({url:'/hub-console/users/role',params:{method:"PUT","body":params}});
		setDialogVisable(false);
		console.log(res)
	}	

		
	if(permissions){
		
		l_data.list.columns[1].render = async(p)=>{
			//let rec = await client({url:'/hub-console/roles/'+p});
			//console.log(rec)
			return <a onClick={async()=>{
				setDialogVisable(true)
				setApplication(p);
				var _roles  =  await client({url:'/hub-console/roles/application/'+p});
				var options = _roles.map((item,i)=>(<Option key={'option-'+i} value={item._id}>{item.name}</Option>))
				setRoles(options)
			}
		}>
			Public
		</a>}
		
		l_data.list.rows = permissions;
		
		let value = [{"label":"Downloads","name":"Downloads","value":"downloads"}]

		let data = {};
		data.content  = 
					(
						<>
						<Page><List data={l_data.list} onFilter={onChange} onSearch={onChange}><div>List</div></List></Page>
						<Modal title="Select Role" visible={dialogVisable} onOk={saveRole} onCancel={()=>{setDialogVisable(false)}}>
						
							<Select  className={""}  style={{ width: '100%'}} placeholder="Select a Role." onChange={(p)=>{setRole(p)}}  showSearch={false} showArrow={true} bordered={false}>
								{roles}
							</Select>
							
						</Modal>
						</>
					);
		
		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)

	}else{
		return ( <></>)
	}

}





