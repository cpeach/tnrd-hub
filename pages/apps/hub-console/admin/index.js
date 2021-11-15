import Frame   from '/components/frames/frame2.js';
import Page    from '/components/layout/pages/index.js'
import Tile    from '/components/layout/tiles/index.js'
import style   from '/styles/global.module.css';
import Link    from 'next/link';
import ld      from './data.json';  // local data
export default function Index(props) { 
    
    let data = JSON.parse(JSON.stringify(ld));
    

	data.content  = (

        <Page>
            <h1 className="mar_md pad_bottom_sm">Welcome to Hub Console</h1>
            <p className="mar_md pad_bottom_xl _11">Below you will find all the resources you need to manage the applications, departments, users, and roles that are used to build out content in TNRD's Application Hub  </p>
            <Tile size="12" margin="md" type="lg" data={data.tiles.applications} />
            <Tile  size="4" margin="md" type="md" data={data.tiles.departments} />
            <Tile  size="4" margin="md" type="md" data={data.tiles.users} />
            <Tile  size="4" margin="md" type="md" data={data.tiles.roles} />
        </Page>
    
    );

	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
} 
			





