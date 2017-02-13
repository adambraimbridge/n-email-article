import React from 'react';

import EmailAddressList from './email-address-list';
import Footnote from './footnote';
import CustomMessage from './custom-message';

export default ({ isReady, isOpen,
		emailAddresses, emailAddressErrors, onEmailAddressChange, onAddEmailAddress, onRemoveEmailAddress,
		customMessage, onMessageTyping, messageLength, onSend, isSending, onClose }) => (
	<div className={`email-article email-article--${isReady && isOpen ? 'open' : 'closed'}`}>
		<div className="email-article__border">
			<button onClick={onClose} type="button" className="o-buttons o-buttons--medium email-article__close"><i>Close</i></button>
			<form noValidate onSubmit={(e) => { e.preventDefault(); onSend() }} className="email-article__container">
				<h1 className="email-article__title">Email this free article</h1>
				<EmailAddressList
						items={emailAddresses}
						errors={emailAddressErrors}
						onItemChange={onEmailAddressChange}
						onAdd={onAddEmailAddress}
						onRemove={onRemoveEmailAddress}
				/>
				<CustomMessage
						customMessage={customMessage}
						onMessageTyping={onMessageTyping}
						messageLength={messageLength}
				/>
				<button type="submit" disabled={isSending} className="email-article__submit o-buttons o-buttons--standout o-buttons--big">Send article</button>
				<Footnote />
			</form>
		</div>
	</div>
);
