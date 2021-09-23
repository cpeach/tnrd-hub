import {forwardRef,useRef,useState,useImperativeHandle,useEffect} from 'react';
import style from '../Form.module.css';

const Text = forwardRef((props, ref) => {

	//const inputRef = useRef();

	const [initial, setInitial] = useState(true);
	const [value, setValue]     = useState(props.data.value||"");
	const [name, setName]       = useState(props.data.attributes.name);
	
	const update = () => {
		var valid = validate();
		var error = valid?"":"This field requires a value";
		var _value =  {value:value,name:name,valid:valid,error:error};
		!initial?props.onChange(_value):null;
		setInitial(false);
		return _value;
	}

	const validate = ()=>{
		let valid = true;
		if(props.data.required&&!initial){
			valid = value.trim()===""?false:true;
		}
		return valid
	}

	useEffect((e) => {update();},[value]);

	useImperativeHandle(ref, () => ({
		getName : ()=>{return name},
		clearField : ()=>{setInitial(true);setValue("")},
		setField : (v)=>{setInitial(true);setValue(v) },
		getField : ()=>{return update();}
	}));
	
	
	return (<textarea  className={style.textarea} value={value} {...props.data.attributes} onChange={(e)=>{setValue(e.currentTarget.value)}} />)
	 
})

export default Text;