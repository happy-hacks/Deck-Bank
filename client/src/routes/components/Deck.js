import React, { useState, useEffect } from 'react';

// libraries
import { useCookies } from 'react-cookie';

// components
import Card, { TemplateCard } from './Card';

const Deck = () => {
	const [deck, setDeck] = useState([]);
	const [cookies, setCookie, removeCookie] = useCookies();

	useEffect(() => {
		if (cookies.deck) setDeck(cookies.deck);
	}, [cookies.deck]);

	const cards = Object.values(deck).map((card, index) => <Card data={card} key={index} />);

	while (cards.length < 8) {
		cards.push(<TemplateCard key={cards.length} />);
	}

	return <div className="deck">{cards}</div>;
};

export default Deck;
