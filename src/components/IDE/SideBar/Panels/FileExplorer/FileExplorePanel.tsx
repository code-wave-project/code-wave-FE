import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	min-width: 20rem;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

export const FileExplorePanel: React.FC = () => {
	return (
		<Container>
			<div>FileExplorePanel</div>
		</Container>
	);
};
