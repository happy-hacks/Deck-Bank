import React, { useState } from 'react';
import '../../sass/Card.scss';

const Card = ({ data }) => {
	const [selected, setSelected] = useState(false);

	const handleClick = () => {
		setSelected((previous) => !previous);
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
