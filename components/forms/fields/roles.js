import {forwardRef,useState,useImperativeHandle,useEffect} from 'react';
import style    from '../Form.module.css';
import client 	from '/scripts/client-api.js';
import 'antd/lib/style/index.css';
import 'antd/lib/select/style/index.css';
import 'antd/lib/pagination/style/index.css';

import {Select}   from 'antd';
const {Option,OptGroup} = Select;

const Roles = forwardRef((props, ref) => {
	const [initial, setInitial] = useState(true);
	const [value, setValue]     = useState();
	const [name, setName]       = useState(props.data.name||props.data.attributes.name);
	const [staff, setStaff] = useState();
	const [users, setUsers] = useState();

	const update = (e) => {
		
		setInitial(false);
		var valid = validate();
		var error = valid?"":"This field requires a value";
		var _value =  {value:value,name:name,valid:valid,error:error};
		props.onChange(_value);
		return _value; 
	}

	const validate = ()=>{
		let valid = true;
		if(props.data.required&&!initial){
			valid = value.length<1?false:true;
		}
		return valid
	}

	const submit = async()=>{
		
		let _value =  {value:value,name:name,valid:true,error:""};
		var _res = await client({url:"/hub-console/applications/users/role",params:{"method":"PUT",body:{"code":props.data.application,"role":props.data.role,"users":value}}});
		console.log(_res)
		return _value; // "_$delete";
	}

	useEffect(() => {update()},[value]);
	useEffect(async () => {
		let isMounted = true;
		
		var _users = await client({url:"/hub-console/applications/users/role",params:{"method":"POST",body:{"code":props.data.application,"role":props.data.role}}});
		var _staff = await client({url:"/hub-console/users"});
		
		if(isMounted){
			setStaff(_staff);
			setValue(_users.map(item=>item._id));
		}
		return () => (isMounted = false)
	},[]);


	useImperativeHandle(ref, () => ({
		getName    : ()=>{return name},
		clearField : ()=>{setInitial(true);setValue([])},
		setField   : (v)=>{setInitial(true);setValue(v)},
		getField   : ()=>{return submit();}
	}));


	const getOptions = (group)=>{
		let options = [];
		let disabled = props.data.disabled,_disabled;
		!staff || staff.map((option,o)=>{
			_disabled = disabled&&disabled.includes(option.value)?true:false;
			options.push(<Option key={option._id} disabled={_disabled} value={option._id}>{option.name}</Option>);
		});
		return options;
	}
	return (
		<Select mode="multiple" className={style.multi_select} value={value} {...props.data.attributes}  style={{ width: '100%'}} placeholder="Select one or more items" onChange={(e)=>{setValue(e)}}>
			{
				getOptions()
			}
		</Select>
	)
})



export default Roles;