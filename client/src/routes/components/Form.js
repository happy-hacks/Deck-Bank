import React, { useState } from 'react';
import '../../sass/Form.scss';

// libraries
import Loader from 'react-loader-spinner';

// scripts
import * as Utils from '../../scripts/Utils';

const initializeInputs = (children) => {
	const names = {};

	for (const child of children) {
		const { props } = child;

		const isInput = child.type === 'input';
		const isSubmit = props.type === 'submit';

		if (isInput && !isSubmit) names[props.name] = '';
	}

	return names;
};

const Form = ({ method, url, onSuccess, onFailure, children }) => {
	const [inputs, setInputs] = useState(initializeInputs(children));
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setInputs((previous) => {
			previous[name] = value;
			return previous;
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		for (const key in inputs) {
			if (!inputs[key]) return onFailure(`${key} is required`); // target password input
		}

		setLoading(true);

		try {
			const data = await Utils.fetchJson(method, url, inputs);
			onSuccess(data);
		} catch (error) {
			if (error.status) onFailure(error.message);
			else if (error.message === 'Failed to fetch') onFailure('a server error ocurred');
			else onFailure('an error ocurred - try again');
		}

		// handle input resets
		setLoading(false);
	};

	const inputsFields = children.map((child, index) => React.cloneElement(child, { onChange: handleChange, key: index }));

	return loading ? <Loader type="ThreeDots" color="#fff" height={200} width={200} /> : <form onSubmit={handleSubmit}>{inputsFields}</form>;
};

export const SubmitButton = ({ label, component, onClick }) => {
	const buttonStyle = {
		padding: 0,
		margin: 0,
		background: 'none',
		border: 'none',
		outline: 'none',
		cursor: 'pointer',
	};

	return (
		<button type="submit" onClick={onClick} style={buttonStyle}>
			{label || component}
		</button>
	);
};

export default Form;
