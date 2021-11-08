import {forwardRef,useRef,useState,useImperativeHandle,useEffect} from 'react';
import style from '../Form.module.css';
import {GlobalOutlined} from '@ant-design/icons';

const URL = forwardRef((props, ref) => {

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

	const validURL = (str) => {
		var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
			'(\\#[-a-z\\d_]*)?$','i'); // fragment locator


		if(!!pattern.test(str)){
			return {valid:true,error:""};
		}else{
			return {valid:false,error:"This is not a valid url."};
		}
		
	}

	useEffect((e) => {update();},[value]);

	useImperativeHandle(ref, () => ({
		getName : ()=>{return name},
		clearField : ()=>{setInitial(true);setValue("")},
		setField : (v)=>{setInitial(true);setValue(v+"") },
		getField : ()=>{
			var _val    = update();
			var url_val = validURL(_val.value)
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
				<GlobalOutlined /> 
			</div>
			<input value={value} type="url" {...props.data.attributes} onKeyUp={validURL} onChange={(e)=>{setValue(e.currentTarget.value)}}/>
		</div>
	)
	 
})

export default URL;