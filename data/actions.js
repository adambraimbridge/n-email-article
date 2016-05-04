import { actions as constants } from './constants'

import nNotification from 'n-notification'

export default class {
	
	constructor (api) {
		this.api = api
	}
	
	notifySuccess (title, content) {
		return () => { nNotification.show({ title: title, content: content, type: 'success' })}
	}

	notifyError (title, content) {
		return () => { nNotification.show({ title: title, content: content, type: 'error' })}
	}

	toggleOpenTop () {
		const actions = this
		return (dispatch, getState) => {
			dispatch({ type: constants.TOGGLE_OPEN_TOP })
			if (!getState().isReady) dispatch(actions.getCreditInfo())
		}
	}

	toggleOpenBottom () {
		const actions = this
		return (dispatch, getState) => {
			dispatch({ type: constants.TOGGLE_OPEN_BOTTOM })
			if (!getState().isReady) dispatch(actions.getCreditInfo())
		}
	}

	getCreditInfo () {
		const actions = this
		return dispatch => {
			dispatch({ type: constants.GET_CREDIT_INFO })
			return actions.api.creditInfo()
					.then(response => response.json())
					.then(json => dispatch(actions.handleCreditInfoResponse(json)))
					.catch(() => dispatch(actions.notifyError('Oops.', 'We\'re unable to get gift article credit information. Please try again')))
		}
	}

	handleCreditInfoResponse (json) {
		return { type: constants.GET_CREDIT_INFO_SUCCESS, credit: json.credits.remainingCredits }
	}

	isGiftChange (isGift) {
		return { type: constants.IS_GIFT_CHANGE, isGift: isGift }
	}

	emailAddressChange (index, value) {
		return {type: constants.EMAIL_ADDRESS_CHANGE, index: index, value: value}
	}

	addEmailAddress () {
		return { type: constants.ADD_EMAIL_ADDRESS }
	}

	removeEmailAddress (index) {
		return { type: constants.REMOVE_EMAIL_ADDRESS, index: index }
	}

	send () {
		const actions = this
		return (dispatch, getState) => {
			const state = getState()
			dispatch({ type: constants.SEND })
			const fetch = state.isGift ? actions.api.gift : actions.api.nonGift
			return fetch()
					.then(response => response.json())
					.then(json => {
						dispatch(actions.handleSendResponse(json))
						return json
					})
					.then(json => {
						const count = json.results.filter(r => r.success).length
						let message = `This article has been sent to ${count} recipient${count !== 1 ? 's' : ''}`
						if (state.isGift) {
							const remainder = state.credit - count
							message += `. You can send ${remainder} more gift articles this month`
						}
						dispatch(actions.notifySuccess('Sent.', message))
					})
					.then(() => dispatch(actions.getCreditInfo()))
					.catch(() => {
						dispatch(actions.handleSendError())
						dispatch(actions.notifyError('Oops.', 'We\'re unable to send this article right now. Please try again'))
					})
		}
	}

	handleSendResponse () {
		return { type: constants.SEND_SUCCESS }
	}

	handleSendError () {
		return { type: constants.SEND_FAILURE }
	}

	closeTop () {
		return { type: constants.CLOSE_TOP }
	}

	closeBottom () {
		return { type: constants.CLOSE_BOTTOM }
	}

}
