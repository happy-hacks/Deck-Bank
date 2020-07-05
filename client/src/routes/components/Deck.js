import React, { useState, useEffect } from 'react';
import '../../sass/Deck.scss';

// libraries
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faShareAlt, faTint, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

// components
import Card, { TemplateCard } from './Card';

const Deck = () => {
	const [deck, setDeck] = useState([]);
	const [deckUrl, setDeckUrl] = useState('');
	const [averageElixir, setAverageElixir] = useState(0);
	const [cookies, setCookie, removeCookie] = useCookies();

	useEffect(() => {
		setDeck(cookies.deck ? Object.values(cookies.deck) : []);
		if (cookies.deck) {
			setDeckUrl(handleGetDeck());
		}
	}, [cookies.deck]);

	useEffect(() => {
		if (deck.length > 0) handleAverageElixir();
	}, [deck]);

	const getCards = () => {
		const cards = deck.map((card, index) => <Card data={card} key={index} atDeck={true} />);
		while (cards.length < 8) cards.push(<TemplateCard key={cards.length} />);

		return cards;
	};

	const handleAverageElixir = () => {
		const total = deck.reduce((accumulator, card) => accumulator + card.info.elixir, 0);
		const amount = deck.length;
		const average = (total / amount).toFixed(2);

		setAverageElixir(average);
	};

	const handleReset = () => {
		removeCookie('deck');
		setDeck([]);
	};

	// ATT:: not implemented
	const handleSave = () => {
		console.log('save');
	};

	// ATT:: not implemented
	const handleShare = () => {
		console.log('share');
	};

	// ATT:: not implemented
	const handleGetDeck = () => {
		const api_codes = deck.map((card) => card['api-code']);

		if (deck.length !== 8) return ''; // console.error('8 cards is required');
		const api_url = `https://link.clashroyale.com/deck/en?deck=${api_codes.join(';')}`;

		return api_url;
	};

	return (
		<div className="Deck">
			<span>
				avg elixir {averageElixir}
				<FontAwesomeIcon icon={faTint} />
			</span>
			<div className="cards">{getCards()}</div>
			<div className="deck-toolbar">
				<div onClick={handleReset}>
					<FontAwesomeIcon icon={faTrash} />
					delete
				</div>

				<div onClick={handleSave}>
					<FontAwesomeIcon icon={faSave} />
					save
				</div>

				<div onClick={handleShare}>
					<FontAwesomeIcon icon={faShareAlt} />
					share
				</div>

				<div onClick={() => {}}>
					<FontAwesomeIcon icon={faShare} />
					get
				</div>
			</div>
		</div>
	);
};

export default Deck;
