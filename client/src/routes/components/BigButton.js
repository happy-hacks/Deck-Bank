import React from 'react';

const BigButton = ({ text, onClick, height, width }) => {
	return (
		<div className="big-button" style={containerStyle} onClick={onClick}>
			<svg width="210" height="110" viewBox="0 0 210 110" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="4" y="4" width="202" height="102" rx="12" fill="#FCE76C" stroke="black" strokeWidth="2" />
				<rect x="5" y="15" width="200" height="90" rx="10" fill="#BA791E" />
				<rect x="5" y="15" width="200" height="80" rx="10" fill="#FDB32E" />
				<rect x="5" y="25" width="200" height="60" rx="10" fill="#FDC342" />
				<rect x="5" y="25" width="200" height="40" rx="10" fill="#fff" fillOpacity="0.40" />
			</svg>

			<span style={textStyle}>{text}</span>
		</div>
	);
};

const containerStyle = {
	position: 'relative',
};

const textStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	fontSize: 32,
};

export default BigButton;
