import React from 'react';

// components
import Card, { TemplateCard } from './Card';

const Deck = ({ deck }) => {
	const cards = deck.map((card, index) => <Card data={card} key={index} />);

	while (cards.length < 8) {
		cards.push(<TemplateCard key={cards.length - 1} />);
	}

	return <div className="deck">{cards}</div>;
};

export default Deck;
