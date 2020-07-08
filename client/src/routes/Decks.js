import React, { useState, useEffect } from 'react';
import '../sass/Decks.scss';

// libraries
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faShareAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

// components
import { TransitionRoute as Route } from './statics/Transition';

// scripts
import { fetchJson } from '../scripts/Utils';

const Decks = (props) => {
	const [deck, setCards] = useState();

	// fetch assets
	const getDecks = async () => {
		const body = { username: 'tobias' };
		const response = await fetchJson('POST', 'http://127.0.0.1:5000/decks', body);
		setCards(Object.entries(response));
	};

	useEffect(() => {
		getDecks();
	}, []);

	return (
		<Route {...props}>
			<h2>Decks</h2>
			<main className="main">
				{deck && deck.map(([title, data], index) => <Deck title={title} data={data} key={index} />)}
				<Link to="/create-deck" className="decks-new-button">
					<FontAwesomeIcon icon={faPlus} />
				</Link>
			</main>
		</Route>
	);
};

const Deck = ({ title, data }) => {
	const [apiUrl, setApiUlr] = useState('');
	const [cookies, setCookie] = useCookies();

	const history = useHistory();

	const totalElixir = data.reduce((accumulator, card) => accumulator + card.info.elixir, 0);
	const averageElixir = (totalElixir / 8).toFixed(1);

	const handleShare = () => {
		// copy to clipboard
	};

	const handleEdit = () => {
		setCookie('deck', data, { path: '/' });
		setCookie('deckName', title, { path: '/' });
		history.push('/create-deck');
	};

	useEffect(() => {
		const codes = data.map((card) => card['api-code']);
		const url = `https://link.clashroyale.com/deck/en?deck=${codes.join(';')}`;
		setApiUlr(url);
	}, []);

	return (
		<div className="deck-container">
			<h3 className="deck-titel">{title}</h3>
			<figure className="card-container">
				{data.map((card, index) => (
					<img className="deck-img" src={card['image-url']} alt={card.name} key={index} />
				))}
			</figure>
			<div className="deck-info">
				<h3 className="deck-average">{averageElixir} avg. elixir</h3>
				<div className="deck-icons">
					<FontAwesomeIcon icon={faShareAlt} onClick={handleShare} />
					<FontAwesomeIcon icon={faEdit} onClick={handleEdit} />
					<a href={apiUrl} target="_blank">
						<FontAwesomeIcon icon={faShare} />
					</a>
				</div>
			</div>
		</div>
	);
};

export default Decks;
