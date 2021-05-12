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

const getAvatarForUser = (userId, users) => {
	const foundUser = users[userId]
	if (foundUser && foundUser.avatarUrl) {
		return foundUser.avatarUrl
	}
	return null
}

const parseUrl = (url) => url && 'https://' + url.replace(/^(http(s)?\:\/\/)/, '').replace(/^\/\//, '')

const Maximized = ({
	chatState,
	events,
	onMessageSend,
	users,
	ownId,
	currentAgent,
	minimize,
	maximizeChatWidget,
	sendMessage,
	rateGood,
	rateBad,
	rate,
}) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}
		>
			<TitleBar
				rightIcons={[
					<IconButton key="close" onClick={minimize}>
						<CloseIcon />
					</IconButton>,
				]}
				title="Chat react - dsmr"
			/>
			<AgentBar>
				<Row flexFill>
					<Column>
						<Avatar imgUrl={'https://www.chiquipedia.com/imagenes/imagenes-animo09.jpg'} />
					</Column>
					<Column flexFill>
						<Title>{'Duvan'}</Title>
						<Subtitle>Apodo: Ja</Subtitle>
					</Column>
					<Column flexFit>

						<Row>
							<IconButton onClick={rateGood}>
								<RateGoodIcon style={{
									opacity: rate === 'good' ? '1' : '0.5'
								}} />
							</IconButton>
							<IconButton onClick={rateBad}>
								<RateBadIcon style={{
									opacity: rate === 'bad' ? '1' : '0.5'
								}} />
							</IconButton>
						</Row>

					</Column>
				</Row>
			</AgentBar>

			<div
				style={{ flexGrow: 1, minHeight: 0, height: '100%', }}>
				<MessageList>
					<MessageGroup /* key={index}  */ onlyFirstWithMeta>
						{/*<Message avatarUrl={parseUrl(getAvatarForUser(message.authorId, users))} date={message.parsedDate} isOwn={message.authorId === ownId || message.own === true} key={message.id} >*/}
						<Message date={'14 oct 14:49'}>
							<Bubble /* isOwn={message.authorId === ownId || message.own === true} */>
								{/* {'message.title' && <MessageTitle title={'Cliente'} />} */}
								{'message.text' && <MessageText>{'Hola'}</MessageText>}
								{'message.imageUrl' && (
									<MessageMedia>
										<img src={'https://www.chiquipedia.com/imagenes/imagenes-animo09.jpg'} />
									</MessageMedia>
								)}
							</Bubble>
						</Message>
					</MessageGroup>
					<MessageGroup /* key={index}  */ onlyFirstWithMeta>
						<Message date={'15 oct 14:49'}>
							<Bubble /* isOwn={message.authorId === ownId || message.own === true} */>
								{/* {'message.title' && <MessageTitle title={'Cliente'} />} */}
								{'message.text' && <MessageText>{'Hola?'}</MessageText>}
							</Bubble>
						</Message>
					</MessageGroup>
				</MessageList>
			</div>
			<TextComposer /* onSend={onMessageSend} */>
				<Row align="center">
					<Fill>
						<TextInput />
					</Fill>
					<Fit>
						<SendButton />
					</Fit>
				</Row>
			</TextComposer>

			<div
				style={{
					textAlign: 'center',
					fontSize: '.6em',
					padding: '.4em',
					background: '#fff',
					color: '#888',
				}}
			>
				{'Powered by LiveChat'}
			</div>
		</div>
	)
}

export default Maximized
