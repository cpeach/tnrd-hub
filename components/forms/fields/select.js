import {forwardRef,useState,useImperativeHandle,useEffect} from 'react';
import style      from '../Form.module.css';
import 'antd/lib/style/index.css';
import 'antd/lib/select/style/index.css';
import 'antd/lib/pagination/style/index.css';

import {Select}   from 'antd';
const {Option,OptGroup} = Select;

const _Select = forwardRef((props, ref) => {

	const [initial, setInitial] = useState(true);
	const [value, setValue]     = useState(props.data.value);
	const [name, setName]       = useState(props.data.name||props.data.attributes.name);
	
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

	const getOptions = (group)=>{
		let options = [];
		let disabled = props.data.disabled,_disabled;
		!props.data.options||props.data.options.map((option,o)=>{
			_disabled = disabled&&disabled.includes(option.value)?true:false;
			if(group){
				group.value === option.group?options.push(<Option key={option.name+"-"+o} disabled={_disabled} value={option.value}>{option.label}</Option>):null;
			}else{
				if(option.icon){
					options.push(<Option key={option.name+"-"+o} disabled={_disabled} value={option.value}><img src={option.icon} style={{width:"20px",height:"20px",marginRight:"12px"}} />{option.label}</Option>)
				}else{
					options.push(<Option key={option.name+"-"+o} disabled={_disabled} value={option.value}>{option.label}</Option>)
				}
					
			}
			
		});
		return options;
	}

	useEffect(() => {update()},[value]);
	useImperativeHandle(ref, () => ({
		getName    : ()=>{return name},
		clearField : ()=>{setInitial(true);setValue([])},
		setField   : (v)=>{setInitial(true);setValue(v)},
		getField   : ()=>{return update();}
	}));

	return (
		<Select className={style.multi_select} value={value} {...props.data.attributes} style={{ width: '100%'}} placeholder="Select an item." onChange={(e)=>{setValue(e)}}>
			{
				props.data.groups ? 
					props.data.groups.map((group,g)=>{
						return (<OptGroup key={group.name+"-"+g} label={group.name}>
									{
										getOptions(group)
									}
								</OptGroup>
								)
					})
					:
					getOptions()
					
			}
		</Select>
	)
})

export default _Select;