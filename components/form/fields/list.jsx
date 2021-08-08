import React   from 'react';
import style   from '../Form.module.css';
import { PlusCircleFilled,EditOutlined,DeleteFilled } from '@ant-design/icons';

import { Popconfirm, Modal,message }  from 'antd';

export default class _List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valid:true,
			values:this.props.data.attributes.defaultValue,
			current : {},
			name:this.props.data.attributes.name,
			isModalVisible : false,
			index : 0,
			action : ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.getValue     = this.getValue.bind(this);
		this.getName      = this.getName.bind(this);
		this.delete       = this.delete.bind(this);
		this.add     	  = this.add.bind(this);
		
		this.update       = this.update.bind(this);
		this.close     	  = this.close.bind(this);
		this.validate     = this.validate.bind(this);
		this.fieldChange  = this.fieldChange.bind(this);
	  }

	async handleChange(e) {

		var index   = this.state.index;
		var values  = this.state.values;
		var current = this.state.current;
		console.log(index);
		console.log(values);
		console.log(current)
		for(var c in current){
			values[index][c] = current[c];
		}
		this.setState({values:values})
		this.setState({isModalVisible:false})
		/*
		var value = [];
		for(var ref in this.refs){
			var r = this.refs[ref];
			value.push({[ref]:'23'})
		}
		console.log(value)*/
		/*
		console.log(p)
		
		this.setState({value:p},function(){
			this.props.onChange?this.props.onChange(this.validate()):null;	  
		});*/
	}
	
	getValue(){return this.state.values}
	getName(){return this.state.name}
	
	validate(){
		
		
		/* var v     = this.state.values;
		var valid = true;
		
		valid = this.props.required?v.length>0?true:false:valid;
		let description = valid ? this.state.descriptions.valid : this.state.descriptions.invalid;
		
		this.setState({value:v,valid:valid,description:description})
		 */
		return {valid:true,value:this.state.values,description:''};
	} 

	update(e){
		var index   = parseInt(e.currentTarget.parentElement.parentElement.getAttribute("name").split("item-")[1])
		var values  = this.state.values[index];
		var current = {}
		for(var v in values){current[v]=values[v];}
		this.setState({action:'update'});
		this.setState({current:current});
		this.setState({index:index});
		this.setState({isModalVisible:true});
	}
	delete(e){
		this.state.values.splice(this.state.index, 1);
		this.state.values=this.state.values.length === 0 ? undefined : this.state.values
		this.setState({values:this.state.values})
	}
	add(e){
		
		if(this.state.values){

			var index  = this.state.values ? parseInt(e.currentTarget.parentElement.getAttribute("name").split("item-")[1]) : 0
			var values = this.state.values ? this.state.values : {};
			var node   = JSON.parse(JSON.stringify(values[index]));

			index = index+1;

			values.splice(index,0,node);
			values = values[index]
			
			var current = {}

			var fields = this.props.data.attributes.fields;

			for(var f in fields){
				var val = fields[f].attributes
				values[fields[f].name] = val && val.defaultValue?val.defaultValue:'';
				current[fields[f].name]=values[fields[f].name];
			}
			this.setState({action:'add'});
			this.setState({current:current});
			this.setState({index:index});
			this.setState({isModalVisible:true})
			
		}else{
			var index   = 0;
			var values  = [{}];
			var current = {};
			var fields  = this.props.data.attributes.fields;
			
			
			for(var f in fields){
				var val = fields[f].attributes;
				values[index][fields[f].name] = val && val.defaultValue?val.defaultValue:'';
				current[fields[f].name]=values[index][fields[f].name];
			} 
			console.log(values)
			this.setState({values:values});
			this.setState({action:'add'});
			this.setState({current:current});
			this.setState({index:index});
			this.setState({isModalVisible:true})
		}


	}

	close(){
		
		if(this.state.action === 'add'){
			var values =  this.state.values;
			delete values[this.state.index];
			this.setState({values:values});
		}
		
		this.setState({isModalVisible:false})
	}

	inputs(item,i){
		var field;
		switch(item.type){
			case 'input':
				field = (<input onChange={this.fieldChange} key="field" data-index={i} name={item.name} value={this.state.current[item.name]} />);
				break;
			case 'select':
				field = (
					<select onChange={this.fieldChange} key="field" data-index={i}  name={item.name}   >
						{
							item.options.map(item=>(
								<option value={item.name} >{item.value}</option>
							))
						}
					</select>
				);
				break;
		}
		return field;
	}

	fieldChange(e){
		var input  = e.currentTarget;
		var index  = this.state.index;
		var name   = input.getAttribute("name");
		var current = this.state.current;

		switch (input.tagName.toLowerCase()) {
			case 'input':
				current[name] = input.value;
				break;
			case 'select':
				current[name] = input.options[input.selectedIndex].value;
				break;		
		}
		
		this.setState({current:current});
	}
	

	fields(fields){
		var _fields = fields.map((item,i)=>{
			return (
				<div key={item.name} className={style.list_field}>
					<label key="label">{item.label}</label>
					{this.inputs(item,i)}
				</div>
			)
		})
		return _fields;
	}

	render() { 

		var fields = this.props.data.attributes.fields;
		
		return ( 
			<div className={style.list} >
				<ul key="list">
					{
						this.state.values ? 
							this.state.values.map((item,i)=>(
								<li data-index={i} key={"item-"+i} name={"item-"+i} onMouseOver={(e)=>(this.setState({"index":e.currentTarget.dataset.index}))}>
									<div key="add" onClick={this.add}><PlusCircleFilled /></div>
									<label key="label">
										{this.state.values[i][this.props.data.ref]}
									</label>
									<div>
										<EditOutlined onClick={this.update}/>
										<div className={style.list_sep}></div>
										 <Popconfirm title="Are you sure to delete this item?"  onConfirm={this.delete} okText="Yes" cancelText="No" >
											<DeleteFilled />	
										</Popconfirm>
									</div>
								</li>							
							))
						: <li className={style.list_add}><div onClick={this.add}>Add Item</div></li>
					}
				</ul>
				<Modal key="model" id="model" title="Add Item" visible={this.state.isModalVisible} onOk={this.handleChange} onCancel={this.close}>
					{
						this.fields(fields)
					}
				</Modal>
			</div>
	
		)
	 }
}
//onOk={} onCancel={}