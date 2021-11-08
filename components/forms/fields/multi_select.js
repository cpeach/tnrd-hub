import {forwardRef,useState,useImperativeHandle,useEffect} from 'react';
import style      from '../Form.module.css';
import 'antd/lib/style/index.css';
import 'antd/lib/select/style/index.css';
import 'antd/lib/pagination/style/index.css';

import {Select}   from 'antd';
const {Option} = Select;

const Multi_Select = forwardRef((props, ref) => {
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
	useEffect(() => {update()},[value]);
	useImperativeHandle(ref, () => ({
		getName    : ()=>{return name},
		clearField : ()=>{setInitial(true);setValue([])},
		setField   : (v)=>{setInitial(true);setValue(v)},
		getField   : ()=>{return update();}
	}));
	//delete props.data.attributes.value
	return (
		<Select mode="multiple" className={style.multi_select} value={value} {...props.data.attributes}  style={{ width: '100%'}} placeholder="Select one or more items" onChange={(e)=>{setValue(e)}}>
			{
				props.data.options?props.data.options.map((option,i)=>(
					<Option key={option.name+"-"+i} value={option.value}>{option.label}</Option>
				)):<></>
			}
		</Select>
	)
})

export default Multi_Select;