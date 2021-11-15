
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

	let data = JSON.parse(JSON.stringify(ld))

	const [user, setUser] = useState();
	const [roles, setRoles] = useState(<Option></Option>);
	const [role, setRole] = useState(<Option></Option>);
	const [application, setApplication] = useState();
	const [permissions, setPermissions] = useState();
	const [dialogVisable, setDialogVisable] = useState(false);

	const router = useRouter();

	useEffect(async () => {
		let isMounted = true;
		let {_id}  = router.query;
		let _permissions = await client({url:'/hub-console/permissions/list',params:{method:"POST","body":JSON.stringify({search:'',user:_id})}});
		
		if(isMounted){
			setUser(_id);
			setPermissions(_permissions);
		}
		return () => (isMounted = false)
	},[]);

	const onChange = async (p)=>{
		p.user = user;
		return await client({url:'/hub-console/permissions/list',params:{method:"POST","body":JSON.stringify(p)}});
	}

	const loadRoles = async(p)=>{
		setDialogVisable(true)
		setApplication(p._id);
		setRole(p.role._id)
		var _roles  =  await client({url:'/hub-console/roles/application/'+p._id});
		var options = _roles.map((item,i)=>(<Option key={'option-'+i} value={item._id}>{item.name}</Option>))
		setRoles(options)
	}

	const saveRole = async()=>{
		
		let params = JSON.stringify({user:user,application:application,role:role})
		let res = await client({url:'/hub-console/users/role',params:{method:"PUT","body":params}});
		//setDialogVisable(false);
		router.reload(window.location.pathname)
		console.log(res)
	}	
	const getName = (p)=>{
		return p.role.name
	}	

	if(permissions){
		console.log(permissions);
		data.list.columns[1].render = (p)=>{return <a onClick={()=>{loadRoles(p)}}>{getName(p)}</a>}
		
		data.list.rows = permissions;
		data.content  = 
				(
					<>
						<Page><List data={data.list} onFilter={onChange} onSearch={onChange}><div>List</div></List></Page>
						<Modal title="Select Role" visible={dialogVisable} onOk={saveRole} onCancel={()=>{setDialogVisable(false)}}>
						
							<Select  className={""} defaultValue={role}  style={{ width: '100%'}} placeholder="Select a Role." onChange={(p)=>{setRole(p)}}  showSearch={false} showArrow={true} bordered={false}>
								{roles}
							</Select>
							
						</Modal>
					</>
				);
		return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
		
	}else{
		return ( <div></div>)
	}

}





