'use strict';

import React, { Component } from 'react';
import { Button, Tag, message } from 'antd';
import ColorPicker from 'app/components/common/ColorPicker';
import { FormattedMessage } from 'react-intl';
import translate from 'app/global/helper/translate';


class BackgroundColor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			background_color: null,
		}

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

		this.change = this.change.bind(this);
		this.update = this.update.bind(this);
		this.enter = this.enter.bind(this);

		this.resetBackgroundColor = this.resetBackgroundColor.bind(this);
	}



	open() {
		this.setState({ edit: true });
	}
	close() {
		this.setState({ edit: false, background_color: null });
	}


	change(value) {
		this.setState({ background_color: value });
	}

	enter(event) {
		if ( event.key === 'Enter' ) {
			event.preventDefault();
			this.update();
		}
	}

	resetBackgroundColor() {
		this.setState({ background_color: '' });
		setTimeout( () => {
			return this.update();
		}, 10);
	}


	update() {
		if ( this.state.background_color === null || this.state.background_color == this.props.data.meta.background_color ) {
			return message.error( translate('messages.card.background.error') );
		}

		this.props.mutate({
			card: this.props.data,
			variables: {
				id: this.props.data.id,
				meta: {
					background_color: this.state.background_color
				}
			}
		})
		.then( res => {
			this.setState({ edit: false });
		});

	}




	render() {



		if ( this.props.public ) {
			return (
				<div className="component__key_val">
					<div className="key"><FormattedMessage id="card.meta.background.title" defaultMessage="Background" />:</div>
					<div className="val">
						{ this.props.data.meta.background_color ?
							( <Tag color={this.props.data.meta.background_color}>{this.props.data.meta.background_color}</Tag> ) :
							( <p><FormattedMessage id="card.meta.background.empty" defaultMessage="Background color not set" /></p> )
						}
					</div>
				</div>
			);
		}



		return (
			<div className="component__key_val">
				<div className="key"><FormattedMessage id="card.meta.background.title" defaultMessage="Background" />:</div>
				<div className="val">
					{ ! this.state.edit && this.props.data.meta.background_color &&
						<div className="full-width flex flex--sb">
							<div className="flex">
								<Tag color={this.props.data.meta.background_color}>{this.props.data.meta.background_color}</Tag>
								<Button type="primary" ghost size="small" onClick={ this.resetBackgroundColor } className="m-l-10"><FormattedMessage id="card.meta.background.reset_color" defaultMessage="Reset Background Color" /></Button>
							</div>
							<Button type="primary" ghost size="small" onClick={ this.open } className="m-l-10">{ this.props.data.meta.background_color ? <FormattedMessage id="card.meta.background.update_color" defaultMessage="Update Background Color" /> : <FormattedMessage id="card.meta.background.set_color" defaultMessage="Set Background Color" /> }</Button>
						</div>
					}

					{ ! this.state.edit && ! this.props.data.meta.background_color &&
						<Button type="primary" ghost size="small" onClick={ this.open }><FormattedMessage id="card.meta.background.set_color" defaultMessage="Set Background Color" /></Button>
					}

					{ this.state.edit &&
						<div className="data--edit--inline flex row nowrap">
							<ColorPicker
								value={ this.state.background_color || this.props.data.meta.background_color }
								onChange={ this.change }
								onKeyPress={ this.enter }
								autoFocus={ true }
							/>
							<Button
								type="primary"
								size="small"
								className="m-l-10"
								onClick={ this.update }>{ this.props.data.meta.background_color ? <FormattedMessage id="card.meta.background.update" defaultMessage="Update Background" /> : <FormattedMessage id="card.meta.background.set" defaultMessage="Set Background" /> }</Button>
							<Button
								type="ghost"
								size="small"
								onClick={ this.close }
								className="m-l-5"><FormattedMessage id="form.cancel" defaultMessage="Cancel" /></Button>

						</div>
					}
				</div>
			</div>
		);

	}

}

export default BackgroundColor;

