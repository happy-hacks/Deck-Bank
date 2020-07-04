import React, { useState } from 'react';
import '../../sass/Card.scss';

// libraries
import { useCookies } from 'react-cookie';

const Card = ({ data }) => {
	const [selected, setSelected] = useState(false);
	const [cookies, setCookie, removeCookie] = useCookies();

	// removeCookie('deck');

	const handleClick = () => {
		setSelected((previous) => !previous);

		if (cookies.deck && cookies.deck.length === 8) return console.error('notification:: deck is full');

		const key = data['api-code'];

		if (!cookies.deck) setCookie('deck', { key: data }, { path: '/' });
		else setCookie('deck', { ...cookies.deck, key: data }, { path: '/' });

		console.log(cookies.deck);
	};

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
