import * as React from 'react'
import {
	Avatar,
	TitleBar,
	TextInput,
	MessageList,
	Message,
	MessageText,
	AgentBar,
	Title,
	Subtitle,
	MessageGroup,
	MessageButtons,
	MessageButton,
	MessageTitle,
	MessageMedia,
	TextComposer,
	Row,
	Fill,
	Fit,
	IconButton,
	SendButton,
	EmojiIcon,
	CloseIcon,
	Column,
	RateGoodIcon,
	RateBadIcon,
	Bubble,
} from '@livechat/ui-kit'
import minimize from './Minimized';

class Maximized extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      nombre: "",
      foto: "",
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
