import React, { useState, useEffect } from 'react';

// components
import Card from './Card';

// scripts
import { groupBy } from '../../scripts/Utils';

const Cards = ({ category }) => {
	const [cards, setCards] = useState({});

	// fetch assets
	const getCards = async () => {
		const response = await fetch('http://127.0.0.1:5000/cards');
		const json = await response.json();
		const data = Object.values(json); // server backend (python) maybe?
		const group = groupBy(category, data);
		setCards(group);
	};

	useEffect(() => {
		getCards();
	}, []);

	useEffect(() => {
		const group = groupBy(category, cards);
		setCards(group);
	}, [category]);

	// sort by - hitpoints, damage & speed
	// const sortBy = () => {};

	const groups = Object.entries(cards).map(([name, data], index) => <CardGroup name={name} group={data} category={category} key={index} />);

	return <main>{groups}</main>;
};

export default Cards;

const CardGroup = ({ group, category }) => {
	const cards = group.map((card, index) => <Card data={card} key={index} />);

	const sample = group[0];

	return (
		<div className="cards">
			<GroupLabel category={category} sample={sample} />
			<div className="card-container">{cards}</div>
		</div>
	);
};

const GroupLabel = ({ category, sample }) => {
	if (!sample) return <>loading</>; // needs loader fix

	const target = sample.info[category];

	const All = () => <div className="group-label">{/* maybe some sorting */}</div>;

	const Type = () => (
		<div className="group-label">
			<h2 className={target}>{target}</h2>
		</div>
	);

	const Arena = () => (
		<div className="group-label">
			<img className="arena" src="https://www.deckshop.pro/img/arena/arena_dream.png" />
			<h2>arena {target}</h2>
		</div>
	);

	const Elixir = () => {
		const elixirs = [...Array(target)].map((_, index) => <img src="https://www.deckshop.pro/img/elixirdrop.png" key={index} />);

		return (
			<div className="group-label">
				<span className="elixir">{elixirs}</span>
			</div>
		);
	};

	const Rarity = () => (
		<div className="group-label" data-text={target}>
			<h2 className={target}>{target}</h2>
		</div>
	);

	return (() => {
		switch (category) {
			case 'all':
				return All();
			case 'type':
				return Type();
			case 'arena':
				return Arena();
			case 'elixir':
				return Elixir();
			case 'rarity':
				return Rarity();
		}
	})();
};
