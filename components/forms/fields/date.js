import {forwardRef,useRef,useState,useImperativeHandle,useEffect} from 'react';
import {DatePicker} from 'antd';
import style from '../Form.module.css';
import moment from 'moment';

const _Date = forwardRef((props, ref) => {

	//const inputRef = useRef();

	const [initial, setInitial] = useState(true);
	const [value, setValue]     = useState(props.data.value?moment(props.data.value,"YYYY-MM-DD"):moment());
	const [name, setName]       = useState(props.data.name||props.data.attributes.name);
	

	const update = () => {
		var valid = validate();
		var error = valid?"":"This field requires a value";
		var _value =  {value:value,name:name,valid:valid,error:error};
		!initial?props.onChange(_value):null;
		_value.value = _value.value.format("YYYY-MM-DD");

		setInitial(false);
		return _value;
	}

	const validate = ()=>{
		let valid = true;
		return valid
	}

	useEffect((e) => {update();},[value]);

	useImperativeHandle(ref, () => ({
		getName : ()=>{return name},
		clearField : ()=>{setInitial(true);setValue(moment())},
		setField : (v)=>{
			setInitial(true);setValue(moment(v)) 
		},
		getField : ()=>{return update();}
	}));
	
	return (<DatePicker className={style.date} value={value} format="YYYY-MM-DD" onChange={(d,s)=>{setValue(moment(s,"YYYY-MM-DD"));}}  />)
	  
               
})

export default _Date;