import {forwardRef,useRef,useState,useImperativeHandle,useEffect} from 'react';
import style from '../Form.module.css';
import {MailOutlined} from '@ant-design/icons';

const Email = forwardRef((props, ref) => {

	//const inputRef = useRef();

	const [initial, setInitial] = useState(true);
	const [value, setValue]     = useState(props.data.value||"");
	const [name, setName]       = useState(props.data.name||props.data.attributes.name);
	

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

	const validEmail = (str) => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	
		if(re.test(String(str).toLowerCase())){
			return {valid:true,error:""};
		}else{
			return {valid:false,error:"This is not a valid email address."};
		}
		
	}

	useEffect((e) => {update();},[value]);

	useImperativeHandle(ref, () => ({
		getName : ()=>{return name},
		clearField : ()=>{setInitial(true);setValue("")},
		setField : (v)=>{setInitial(true);setValue(v+"") },
		getField : ()=>{
			var _val    = update();
			var url_val = validEmail(_val.value)
			if(!url_val.valid){
				_val.valid = false;
				_val.error = url_val.error;
				props.onChange(_val)
			}
			return _val;
		}
	}));
	
	

	return (
		<div className={style.url}>
			<div>
				<MailOutlined /> 
			</div>
			<input value={value} type="email" {...props.data.attributes} onKeyUp={validEmail} onChange={(e)=>{setValue(e.currentTarget.value)}}/>
		</div>
	)
	 
})

export default Email;