import React, { useState, useEffect } from 'react';
import '../../sass/Card.scss';

// libraries
import { useCookies } from 'react-cookie';

const Card = ({ data, atDeck }) => {
	const [selected, setSelected] = useState(false);
	const [cookies, setCookie] = useCookies();

	const key = data['api-code'];
	const deck = { ...cookies.deck } || {};

	const handleClick = () => {
		if (!deck) {
			setSelected(true);
			deck[key] = data;
			return setCookie('deck', deck, { path: '/' });
		}

		if (deck[key]) {
			setSelected(false);
			delete deck[key];
			return setCookie('deck', deck, { path: '/' });
		}

		if (Object.keys(deck).length === 8) return console.error('notification:: deck is full');

		setSelected(true);
		deck[key] = data;
		return setCookie('deck', deck, { path: '/' });
	};

	useEffect(() => {
		const isSelected = !atDeck && deck && deck[key];
		setSelected(isSelected);
	}, [deck]);

	return (
		<div className={selected ? 'Card selected' : 'Card'} onClick={handleClick}>
			<img className="image" src={data['image-url']} alt={data.name} />
			<img className="elixir-image" src="https://www.deckshop.pro/img/elixirdrop.png" alt="elixir-badge" />
			<span className="elixir-value">{data.info.elixir}</span>
		</div>
	);
};

export const TemplateCard = () => {
	return (
		<div className="template-card">
			<span>empty</span>
		</div>
	);
};

export default Card;
