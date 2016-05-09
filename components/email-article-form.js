import React from 'react';

import GiftOrNotSelection from './gift-or-not-selection';
import EmailAddressList from './email-address-list';

export default ({ mode, isReady, isOpen, isGift, onIsGiftChange, credit,
		emailAddresses, emailAddressErrors, onEmailAddressChange, onAddEmailAddress, onRemoveEmailAddress,
		onSend, isSending, onClose }) => (
	<div className={`email-article email-article--${isReady && isOpen ? 'open' : 'closed'}`}>
		<button onClick={onClose} type="button" className="o-buttons o-buttons--medium email-article__close"><i>Close</i></button>
		<div className="email-article__container">
			<h1 className="email-article__title">Email this subscriber-only article</h1>
			<GiftOrNotSelection
					isGift={isGift}
					onIsGiftChange={onIsGiftChange}
					credit={credit}
			/>
			<div className="email-article__section-break"></div>
			<EmailAddressList
					items={emailAddresses}
					errors={emailAddressErrors}
					onItemChange={onEmailAddressChange}
					onAdd={onAddEmailAddress}
					onRemove={onRemoveEmailAddress}
					isGift={isGift}
					credit={credit}
			/>
			<button onClick={onSend} disabled={isSending} className="email-article__submit o-buttons o-buttons--standout o-buttons--big">Send article</button>
			<div className="email-article__footnote">
				This email will show up in their inbox form the Financial Times
			</div>
		</div>
	</div>
);
