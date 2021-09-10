import {forwardRef,useState,useImperativeHandle} from 'react';
import style from '../Form.module.css';

const Text = forwardRef((props, ref) => {
	
	const [value, setValue]     = useState(props.data.attributes.defaultValue);
	const [name, setName]       = useState(props.data.attributes.name);
	const [description, setDescription]   = useState("");

	const handleChange = (e) => {
		props.onChange(validate(e.currentTarget.value))
	}
	
	const validate = (v)=>{

        var valid = props.data.required?v.trim()===""?false:true:true;
		
		setValue(v);
		setDescription(valid ? "" : "This field requires a value");
		
		return {valid:valid,value:v,description:description};
	}
	useImperativeHandle(ref, () => ({getValue() {return value}}));

	return (<input  className={style.input} {...props.data.attributes} onChange={handleChange}/>)
	 
})

export default Text;