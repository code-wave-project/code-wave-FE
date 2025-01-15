import React from 'react';
import { Container, Header, Content } from '../../../styles/IDE/SidePanel.style';

interface SidePanelProps {
	title: string;
	children?: React.ReactNode;
}

const SidePanel: React.FC<SidePanelProps> = ({ title, children }) => {
	return (
		<Container>
			<Header>{title.toUpperCase()}</Header>
			<Content>{children}</Content>
		</Container>
	);
};

export default SidePanel;
