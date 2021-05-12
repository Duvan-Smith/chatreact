import * as React from 'react'
import {
	TitleBar,
	IconButton,
	CloseIcon,
} from '@livechat/ui-kit'
import minimize from './Minimized';

class Maximized extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render(){
    return(
      <div>
        <TitleBar rightIcons={[<IconButton key="close" onClick={minimize}>
			<CloseIcon />
        </IconButton>,]}
        title="Chat react - dsmr"/>
      </div>
    )
  }
}
export default Maximized;
