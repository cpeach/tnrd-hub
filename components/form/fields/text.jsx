import {useRef,useState} from 'react';
import style from '../Form.module.css';

export default function Text(props) {
	/*
	constructor(props) {
		super(props);
		this.state = {
			valid:true,
			value:this.props.data.attributes.defaultValue,
			name:this.props.data.attributes.name,
			description:"",
			descriptions : {
				valid   : "",
				invalid : "This field requires a value"
			}
			
		};
		this.handleChange = this.handleChange.bind(this);
		this.getValue     = this.getValue.bind(this);
		this.getName      = this.getName.bind(this);
		this.validate     = this.validate.bind(this);
	  }
	*/

	//const input = useRef();
	
	//const [valid, setValid]     = useState(true);
	const [value, setValue]     = useState(props.data.attributes.defaultValue);
	const [name, setName]       = useState(props.data.attributes.name);
	const [descriptions, setDescriptions] = useState({valid:"",invalid:"This field requires a value"});
	const [description, setDescription]   = useState("");

	const handleChange = (e) => {
		
		setValue(e.target.value)
		props.onChange(validate())
		
	}
	
	const getValue = ()=>{return value;}
	const getName  = ()=>{return name;}
	
	const validate = ()=>{
		var v      = value;
		var valid  = true;
		console.log(v);
		console.log(valid)
		
	// 	check string
        valid = props.required?v.trim()===""?false:true:valid;
		
		setValue(v);
		setDescription(valid ? descriptions.valid : descriptions.invalid);
		
		return {valid:valid,value:v,description:description};
	}
	  
	return (<input  className={style.input} {...props.data.attributes} onChange={handleChange}/>)
	 
}
