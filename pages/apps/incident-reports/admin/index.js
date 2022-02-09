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
            <h1 className="mar_md pad_bottom_sm">Incident Reporting - Admin Console</h1>
            <p className="mar_md pad_bottom_xl _11"> Incident Report Forms are used to notify Safety of an Injury, Near Miss or Hazard encounter. Use this admin console to view history,pull reports and update form settings.</p>
            <Tile size="12" margin="md" type="lg" data={data.tiles.incidents} />
            <Tile  size="6" margin="md" type="md" data={data.tiles.stats} />
            <Tile  size="6" margin="md" type="md" data={data.tiles.settings} />
        </Page>
    
    );

	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
} 
			





