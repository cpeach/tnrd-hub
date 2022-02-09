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
            <Tile size="6" margin="md" type="md" data={data.tiles.tnrd} />
            <Tile  size="6" margin="md" type="md" data={data.tiles.libraries} />
        </Page>
    
    );

	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
} 
			





