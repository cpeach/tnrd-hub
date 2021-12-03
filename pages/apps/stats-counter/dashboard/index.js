import Frame   from '/components/frames/frame2.js';
import Page    from '/components/layout/pages/index.js'
import Tile    from '/components/layout/tiles/index.js'
import style   from '/styles/global.module.css';
import Link    from 'next/link';
import ld      from './data.json';  // local data
import client  from '/scripts/client-api.js';
import moment from 'moment';
import {useState,useEffect,useRef} from 'react';
import {Empty,DatePicker,Divider,Modal,Select} from 'antd';
import {DownOutlined,UpOutlined,CaretDownOutlined,CalendarOutlined } from '@ant-design/icons';
export default function Index(props) { 
   
    let data = JSON.parse(JSON.stringify(ld));
    
    const valueRefs = useRef({});

    const [departmentsVisable,setDepartmentsVisable] = useState(false);
    const [department,setDepartment]             = useState();
    const [departments,setDepartments]           = useState();
    const [departmentsSelect,setDepartmentsSelect]  = useState([]);

    const [groupsVisable,setGroupsVisable] = useState(false);
    const [group,setGroup]             = useState();
    const [groups,setGroups]           = useState();
    const [groupsSelect,setGroupsSelect]  = useState([]);
    const [groupDefault,setGroupDefault]  = useState();

    const [locationsVisable,setLocationsVisable] = useState(false);
    const [location,setLocation]             = useState();
    const [locations,setLocations]           = useState();
    const [locationsSelect,setLocationsSelect]  = useState([]);
 
    const [topicElements,setTopicElements] = useState();
    const [topicCurrent,setTopicCurrent] = useState(0);
    const [topics,setTopics] = useState();
    const [topic,setTopic] = useState();

    const [categoryElements,setCategoryElements] = useState();
    const [categories,setCategories]     = useState();

    const [itemElements,setItemElements] = useState();
    const [items,setItems]               = useState();

    const [values,setValues]             = useState([]);

    const [date,setDate] = useState(moment().format('YYYY-MM-DD'));

    const [queues,setQueues] = useState({});



//  UPDATE
    const update = (p,i)=>{
     
        let element = valueRefs.current[i];
        
        if(element.dataset.loading === "false"){

            let value = p?p+parseInt(element.value):parseInt(element.value);

            element.value = value>-1?value:0;
            
            if(queues[i]){window.clearTimeout(queues[i]);}
            
            queues[i] = window.setTimeout(()=>{
                // set processing
                //element.dataset.loading = "true";
                queues[i] = undefined;
                setQueues(queues);
            },1000);
            setQueues(queues)
        }else{
            console.log("loading...")
        }
    }


//  DATE
    useEffect(async()=>{
       console.log(location)
        if(location && date){
            let _values =  await client({url:'/stats-counter/values/list',params:{method:'POST',body:{filters:{date:date,collection_item:location._id}}}});
            setValues(_values);
        }

	},[date])
 



/* //  VALUES
    useEffect(async()=>{
      console.log("change value")
      console.log(group)
     // console.log(items.length)
      if(group && group.topics[topic]){
          console.log(group.topics[topic]);
          let _categories = group.topics[topic].categories
          _categories?_categories.map(cat=>{
              console.log(values.length)
              for(let i=0;i<values.length;i++){
                  console.log(values[i])
              }
                  
          }):null

      }
      
	},[values])
 */
/* 

//  CATEGORIES
    useEffect(async()=>{
       if(group && topic !== undefined && topic > -1){

        //  let index = typeof topic==='object'?0:topic;
            let _categories = [];
            let _count = 0;
            group.topics[topic].categories?group.topics[topic].categories.map((item,i)=>{
                _categories.push((
                    <div key={"category-"+i} className="pad_x_md">
                        <Divider style={{margin:"48px 0px 48px 0px"}} key={'category-'+i} orientation="center" >{item.name}</Divider>
                        
                        {
                            item.items.map((item,i)=>(
                                <div key={"item"+i} className="border light touch pad_md mar_bottom_lg shadow">
                                    <div className="_6 box middle noselect">
                                        <h2 >{item.name}</h2>
                                        <p className="small mar_top_md">{item.description}</p>
                                    </div>
                                    <div className="_6 box right middle center">
                                        <div className="shim"></div>
                                        <div className="box touch _7 border white ">
                                            <div className="box center _6 middle">
                                                <div className="shim"></div>
                                                <input ref={(element) => {valueRefs.current[item._id]=element}} className="noselect box _11 center" data-loading={false} onChange={(e)=>{update(undefined,item._id)}} type="number" defaultValue="0" style={{fontSize:"24px"}} />
                                            </div>
                                            <div className="box middle b-l _6 center">
                                                <div className="b-b hand-primary" onClick={()=>{update(1,item._id)}} style={{padding:"24px 0px 24px 0px"}}><UpOutlined  style={{fontSize:"21px"}} /></div>
                                                <div className="hand-primary" onClick={()=>{update(-1,item._id)}} style={{padding:"24px 0px 24px 0px"}}><DownOutlined style={{fontSize:"21px"}} /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ))
                 
            }):null

            setCategoryElements(_categories);
            
            window.document.getElementById("topic-"+topicCurrent).className = ""
            window.document.getElementById("topic-"+topic).className = "highlight"
            setTopicCurrent(topic);

            let _values = await client({url:'/stats-counter/values/list',params:{method:'POST',body:{filters:{date:date,collection_item:location._id}}}});
            setValues(_values);

        }


	},[topic])

 */ 
    useEffect(async()=>{
        if(group && topic !== undefined && topic > -1){
            console.log(topics)
            console.log(topics[topic])
            console.log(location.items)
            let _categoryElements=[],itemElements=[];
            topics[topic].categories.map((_cat,c)=>{
                _categoryElements.push(<div className="pad_x_md pad_y_lg light">{_cat.name}</div>)
                location.items.map((_item,i)=>{
                    if(_cat._id === _item.category._id){
                        _categoryElements.push((<div className="pad_x_md pad_y_lg">
                            <div className="_9 box noselect">
                                <b>{_item.name}</b>
                                <p className="small">{_item.description}</p>
                            </div>
                            <div className="_3 box right middle">
                                <div className="border touch box" style={{overflow:"hidden"}}>
                                    <input ref={(element) => {valueRefs.current[_item._id]=element}} className="noselect box _6 center middle" data-loading={false} onChange={(e)=>{update(undefined,_item._id)}} type="number" defaultValue="0" style={{marginTop:"-6px",fontSize:"19px"}} />
                                    <div className="b-r b-l hand-primary box pad_md _3 center" style={{lineHeight:"0px"}} onClick={()=>{update(1,_item._id)}} ><UpOutlined  style={{fontSize:"19px"}} /></div>
                                    <div className="hand-primary box pad_md _3 center" style={{lineHeight:"0px"}} onClick={()=>{update(-1,_item._id)}} ><DownOutlined style={{fontSize:"19px"}} /></div>
                                </div>

                            </div>
                        </div>))
                        
                    }
                })
            })
            setCategoryElements(_categoryElements);
        }
	},[topic])


/* 
const loadContent = async()=>{

    let topics = await client({url:'/stats-counter/topics/list',params:{method:'POST',body:{}}});
    let _topicElements = [];
    let _currentTopics = [];
    
    location.items.map(_item=>{
        topics.map(_topic=>{
            if(_topic._id === _item.category.topic && !_currentTopics.includes(_topic._id)){
                _currentTopics.push(_topic._id);
                _topicElements.push(<span id={"topic-"+i} key={'topic-'+i} data-index={i} className={i===0?'':''} onClick={()=>{setTopic(i)}}>{_topic.name}</span>)
            }
        })
    })

    setTopicElements(_topicElements)
    setTopic(0);
}
 */




//  TOPICS
    useEffect(async()=>{
        if(location && location.name !== "--"){
            let _items  = location.items;
            let _topics = await client({url:'/stats-counter/topics/list',params:{method:'POST',body:{}}});
            let _topicElements = [];
            let _includeTopics = [];
            let _currentTopics = [];

            _items.map((_item,i)=>{
                _topics.map((_topic,t)=>{
                    if(_topic._id === _item.category.topic && !_includeTopics.includes(_topic._id)){
                        _includeTopics.push(_topic._id);
                        _currentTopics.push(_topic);
                        _topicElements.push(<span id={"topic-"+i} key={'topic-'+i} data-index={i} className={i===0?'':''} onClick={()=>{setTopic(i)}}>{_topic.name}</span>)
                    }
                })
            })
           
            setTopicElements(_topicElements);
            setTopics(_currentTopics);
            setTopic(0);
        }

	},[location])

//  LOCATONS
    useEffect(async()=>{
        
	    if(group && group.name !=="--"){

            setGroupsVisable(false);

            // get-set locations
            let _items    = await client({url:'/stats-counter/locations/list',params:{method:'POST',body:{filters:{group:group._id}}}});
           
             let _options = [], _location,_locations={};
             for(let i=0;i<_items.length;i++){
                _locations[_items[i]._id] = _items[i];
                _location = i === 0 ? _items[i] : _location;
                _options.push(<Select.Option key={"location-"+i} value={_items[i]._id}>{_items[i].name}</Select.Option>);
             }

            setLocation(_location);		
            setLocations(_locations);		
            setLocationsSelect(<div className="select_wrapper"><Select style={{padding:"9px 0px"}} bordered={false}  value={_location?_location._id:"--"}  onChange={(p)=>{setLocation(_locations[p])}}> {_options}</Select></div>);		
            
        }else{
            setLocation({name:"--"});
            setCategoryElements(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)
            setLocationsSelect(<div className="select_wrapper"><Select style={{padding:"9px 0px"}} bordered={false}  value={"--"} ></Select></div>);
        }
        

	},[group])

//  GROUPS
    useEffect(async()=>{
	    if(department){
            
            setDepartmentsVisable(false);

            // get-set groups
            let _items = await client({url:'/stats-counter/groups/list',params:{method:'POST',body:{filters:{department:department._id}}}});

             let _options = [], _group,_groups={};
            _items.map((item,i)=>{
                _groups[item._id] = item;
                _group = i === 0 ? item : _group;
                _options.push(<Select.Option key={"group-"+i}  value={item._id}>{item.name}</Select.Option>);
            })

            setGroup(_group || {name:"--"});		
            setGroups(_groups);	
            setGroupsSelect(<div className="select_wrapper"><Select style={{padding:"9px 0px"}} bordered={false} value={_group?_group._id:"--"}  onChange={(p)=>{ setGroup(_groups[p])}}> {_options}</Select></div>);		

        }

	},[department])

//  INIT
    useEffect(async()=>{

		let isMounted = true;
		let _items = await client({url:'/stats-counter/departments/list',params:{method:'POST',body:{}}});
		if(isMounted && _items){
            let _options = [], _department,_departments={};
            _items.map((item,i)=>{
                _departments[item._id] = item;
                _department = item.name === 'Libraries' ? item : _department;
                _options.push(<Select.Option key={"option-"+i} value={item._id}>{item.name}</Select.Option>);
            })
            setDepartment(_department);		
            setDepartments(_departments);	
            console.log(_department)	
			setDepartmentsSelect(<div className="select_wrapper"><Select style={{padding:"9px 0px"}} defaultValue={_department._id} bordered={false} onChange={(p)=>{setDepartment(_departments[p])}} > {_options}</Select></div>);		

		}
       
		return () => (isMounted = false);

	},[])


	data.content  = (
        <>
            <Page>
                <h1 className="mar_md mar_top_xs pad_bottom_lg">Daily Stats Counter</h1>
                <DatePicker onChange={(d,s)=>{setDate(s)}} style={{verticalAlign:"middle",marginLeft:"15px",padding:"12px 12px",marginRight:"12px",borderRadius:"5px"}} defaultValue={moment()} />
                {departmentsSelect}
                {groupsSelect}
                {locationsSelect}
                
                <div className="menubar mar_y_md">
                    <div>{topicElements}</div>    
                </div>
                <div className="mar_md border touch shadow">
                    {categoryElements}
                </div>
            </Page>

                   
        </>
    );

	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
} 
			
 /* <div className="btn_light mar_left_sm " onClick={()=>{setDepartmentsVisable(true)}}>{!department||department.name} <CaretDownOutlined /></div>
                <div className="btn_light mar_left_sm" onClick={()=>{setGroupsVisable(true)}}>{!group||group.name} <CaretDownOutlined /></div>
                <div className="btn_light mar_left_sm" onClick={()=>{setLocationsVisable(true)}}>{!location||location.name} <CaretDownOutlined /></div>
                
 
 
  <Modal visible={departmentsVisable} title="Select Department" onOk={()=>{setDepartmentsVisable(false)}} onCancel={()=>{setDepartmentsVisable(false)}} width={360}>
                <Select defaultValue={!department||department._id } onChange={(p)=>{setDepartment(departments[p])}}> {departmentOptions}</Select>
            </Modal>
            <Modal visible={groupsVisable} title="Select Collection" onOk={()=>{setGroupsVisable(false)}} onCancel={()=>{setGroupsVisable(false)}} width={360}>
                <Select defaultValue={!group||group._id } onChange={(p)=>{setGroup(groups[p])}}> {groupOptions}</Select>
            </Modal>
            <Modal visible={locationsVisable} title="Select Collection Items" onOk={()=>{setLocationsVisable(false)}} onCancel={()=>{setLocationsVisable(false)}} width={360}>
                <Select defaultValue={!location||location._id } onChange={(p)=>{setLocation(locations[p])}}> {locationOptions}</Select>
            </Modal>    
 
 */



