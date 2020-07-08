import React, { useState, useEffect } from 'react';
import '../../sass/Deck.scss';

// libraries
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faShareAlt, faTint, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

// components
import Card, { TemplateCard } from './Card';

// script
import { fetchJson } from '../../scripts/Utils';

const Deck = () => {
	const [deck, setDeck] = useState([]);
	const [deckUrl, setDeckUrl] = useState('');
	const [deckName, setDeckName] = useState('');
	const [averageElixir, setAverageElixir] = useState(0);
	const [cookies, setCookie, removeCookie] = useCookies();

	useEffect(() => {
		setDeck(cookies.deck ? Object.values(cookies.deck) : []);
		setDeckName(cookies.deckName ? cookies.deckName : []);
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
		const average = (total / amount).toFixed(1);

		setAverageElixir(average);
	};

	const handleReset = () => {
		removeCookie('deck');
		setDeck([]);
	};

	// ATT:: not implemented
	const handleSave = async () => {
		if (!cookies.deck) return console.error('no deck detected');
		if (Object.keys(cookies.deck).length != 8) return console.error('8 cards is required');
		if (!deckName) return console.error('deck name is required');

		const deck = Object.keys(cookies.deck);

		const method = 'POST';
		const url = 'http://localhost:5000/deck';

		// body from cookies
		const body = {
			username: 'tobias',
			'deck-name': deckName,
			deck: deck,
		};

		const response = await fetchJson(method, url, body);
		console.log(response);
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

	const nameHandler = (event) => {
		setDeckName(event.target.value);
	};

	return (
		<div className="Deck">
			<div className="deck-header">
				<input type="text" value={deckName} onChange={nameHandler} className="input-deck-name" placeholder="deck name here..." />
				<span>
					avg elixir {averageElixir}
					<FontAwesomeIcon icon={faTint} />
				</span>
			</div>
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

				<a href="" target="_blank">
					<FontAwesomeIcon icon={faShare} />
					get
				</a>
			</div>
		</div>
	);
};

export default Deck;
