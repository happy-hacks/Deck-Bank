import React, { useState, useEffect } from 'react';
import '../sass/CreateDeck.scss';

// component
import { TransitionRoute as Route } from './statics/Transition';
import Card from './components/Card';

// scripts
import { groupBy } from '../scripts/Utils';

const CreateDeck = (props) => {
	const [groupedBy, setGroupedBy] = useState('all');

	return (
		<Route {...props}>
			<CreateDeckHeader {...props} setGroupedBy={setGroupedBy} />
			<Cards {...groupedBy} />
		</Route>
	);
};

export default CreateDeck;

// modulate
// needs sorts, filters and selectors
const CreateDeckHeader = ({ setGroupedBy }) => {
	return (
		<header>
			<h2>CARDS BY</h2>
			<div className="group-selector">
				<span onClick={() => setGroupedBy('all')}>all</span>
				<span onClick={() => setGroupedBy('elixir')}>elixir</span>
				<span onClick={() => setGroupedBy('arena')}>arena</span>
				<span onClick={() => setGroupedBy('type')}>type</span>
				<span onClick={() => setGroupedBy('rarity')}>rarity</span>
			</div>
		</header>
	);
};

// modulate
const Cards = ({ groupedBy }) => {
	const [cards, setCards] = useState({});

	const getCards = async () => {
		const response = await fetch('http://127.0.0.1:5000/cards');
		const json = await response.json();
		const data = Object.values(json); // server backend (python) maybe?
		const group = groupBy(groupedBy, data);
		setCards(group);
	};

	useEffect(() => {
		getCards();
	}, []);

	useEffect(() => {
		const group = groupBy(groupedBy, cards);
		setCards(group);
	}, [groupedBy]);

	// sort by - hitpoints, damage & speed
	// const sortBy = () => {};

	const groups = Object.entries(cards).map(([name, data], index) => <CardGroup name={name} group={data} groupType={groupedBy} key={index} />);

	return <main>{groups}</main>;
};

// modulate
const CardGroup = ({ name, group, groupType }) => {
	// optimize
	const label = (() => {
		switch (groupType) {
			case 'all':
				return <h2>{name}</h2>;
			case 'type':
				return <h2>type {name}</h2>;
			case 'arena':
				return <h2>img of arena {name}</h2>;
			case 'elixir':
				return <h2>some elixir imgs X {name}</h2>;
			case 'rarity':
				return <h2>colorfully {name}</h2>;
		}
	})();

	const cards = group.map((card, index) => <Card data={card} key={index} />);

	return (
		<div className="cards">
			{label}
			<div className="card-container">{cards}</div>
		</div>
	);
};
