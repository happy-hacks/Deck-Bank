import React, { useState } from 'react';
import '../sass/CreateDeck.scss';

// component
import { TransitionRoute as Route } from './statics/Transition';
import Deck from './components/Deck';
import Cards from './components/Cards';

const CreateDeck = (props) => {
	const [category, setCategory] = useState('all');

	return (
		<Route {...props}>
			<CreateDeckHeader {...props} setCategory={setCategory} />
			<Deck />
			<Cards category={category} />
		</Route>
	);
};

export default CreateDeck;

// modulate
// needs sorts, filters and selectors
const CreateDeckHeader = ({ setCategory }) => {
	const [selected, setSelected] = useState('all');

	const handleSelection = (selection) => {
		setCategory(selection);
		setSelected(selection);
	};

	return (
		<header>
			<h2>CARDS BY</h2>
			<div className="group-selector">
				<span onClick={() => handleSelection('all')} className={selected === 'all' ? 'selected' : ''}>
					all
				</span>
				<span onClick={() => handleSelection('elixir')} className={selected === 'elixir' ? 'selected' : ''}>
					elixir
				</span>
				<span onClick={() => handleSelection('arena')} className={selected === 'arena' ? 'selected' : ''}>
					arena
				</span>
				<span onClick={() => handleSelection('type')} className={selected === 'type' ? 'selected' : ''}>
					type
				</span>
				<span onClick={() => handleSelection('rarity')} className={selected === 'rarity' ? 'selected' : ''}>
					rarity
				</span>
			</div>
		</header>
	);
};
