import style from './Index.module.css';
import {useState}    from 'react';
import Frame   from '/components/frames/frame2.js';
import Page    from '/components/layout/pages/index.js'
import List    from '/components/lists/index.js';
import ld      from './data.json';  // local data
import { Modal } from 'antd';
import client  from '/scripts/client-api.js';



export default function Index(props) { 

    const [results, setResults] = useState("");
    const [visible, setVisible] = useState(false);

    let data = JSON.parse(JSON.stringify(ld));

    const invoke = async (p)=>{
        let res = p.params?await client({url:p.url,params:p.params}):await client({url:p.url});
        let _results = (<pre>{JSON.stringify(res, null, 4)}</pre>)
        setResults(_results)
        setVisible(true)
    }
    const cancel = ()=>{setVisible(false)}

    data.list.columns[2].render = (p)=>{return <a onClick={()=>{invoke(p)}}>Invoke</a>}

    data.list.rows   = data.endpoints;
    
    const onChange = (p)=>{}

    data.content  = (
        <Page>
            <List data={data.list} ><div>List</div></List>
            <Modal title={<h2>Results</h2>} visible={visible} onOk={cancel} onCancel={cancel}>{results}</Modal>
        </Page>)
	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
} 
			





