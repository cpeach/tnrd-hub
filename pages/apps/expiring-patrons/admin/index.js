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
            <h1 className="mar_md pad_bottom_sm">Welcome to Expiring Patrons</h1>
            <p className="mar_md pad_bottom_xl _11">The purpose of this application is to list, notifiy and manage TNRL patrons that have expiring library cards. </p>
            <Tile size="12" margin="md" type="lg" data={data.tiles.expiring} />
            <Tile  size="4" margin="md" type="md" data={data.tiles.notified} />
            <Tile  size="4" margin="md" type="md" data={data.tiles.templates} />  
            <Tile  size="4" margin="md" type="md" data={data.tiles.settings} />
        </Page>
    
    );

	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
} 
			





