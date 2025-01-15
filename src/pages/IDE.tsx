import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar from '../components/IDE/SideBar';
import SidePanel from '../components/IDE/SidePanel';

const IDE: React.FC = () => {
	// const [activeTab, setActiveTab] = useState('test.jsp');
	const [activeSidePanel, setActiveSidePanel] = useState<string | null>(null);
	// const tabs = ['test.jsp', 'a.jsp', 'b.jsp'];

	return (
		<Container>
			<SideBar onSidePanelChange={panel => setActiveSidePanel(panel)} activePanel={activeSidePanel} />

			<MainContainer>
				<ContentWrapper>
					{activeSidePanel && (
						<SidePanel
							title={activeSidePanel === 'files' ? '탐색기' : activeSidePanel === 'chat' ? '채팅' : '코드 스타일'}>
							{/* Panel content here */}
						</SidePanel>
					)}

					<MainContent>
						<HeaderContainer>
							<TopHeader>
								<HomeIcon>🏠</HomeIcon>
								<BreadcrumbPath>workspace / project / src</BreadcrumbPath>
								<ViewControls>
									<ViewButton>⊞</ViewButton>
									<ViewButton>☰</ViewButton>
								</ViewControls>
							</TopHeader>
							<BottomHeader>
								{/* <TabList>
									{tabs.map(tab => (
										<Tab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
											{tab}
											{activeTab === tab && <CloseButton>×</CloseButton>}
										</Tab>
									))}
								</TabList> */}
							</BottomHeader>
						</HeaderContainer>
						<Editor>
							<LineNumbers>
								{Array.from({ length: 10 }, (_, i) => (
									<LineNumber key={i}>{i + 1}</LineNumber>
								))}
							</LineNumbers>
							<EditorContent>
								<CodeLine>// hello world</CodeLine>
							</EditorContent>
						</Editor>
					</MainContent>
				</ContentWrapper>

				<Footer>
					<FooterItem>▲ 0</FooterItem>
					<FooterItem>◉ 0</FooterItem>
					<FooterItem>✉</FooterItem>
				</Footer>
			</MainContainer>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	height: 100vh;
	background-color: #f8f9fa;
`;

const MainContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const ContentWrapper = styled.div`
	display: flex;
	flex: 1;
	overflow: hidden;
`;

const MainContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const HeaderContainer = styled.div`
	background-color: #fff;
	border-bottom: 1px solid #dee2e6;
`;

const TopHeader = styled.div`
	display: flex;
	align-items: center;
	padding: 5px 10px;
	border-bottom: 1px solid #eee;
`;

const BottomHeader = styled.div`
	display: flex;
	align-items: center;
	padding: 5px;
`;

const BreadcrumbPath = styled.div`
	flex: 1;
	margin-left: 10px;
	color: #666;
	font-size: 13px;
`;

const HomeIcon = styled.div`
	margin: 0 10px;
`;

const TabList = styled.div`
	display: flex;
	gap: 2px;
`;

const Tab = styled.div<{ active?: boolean }>`
	padding: 5px 15px;
	background-color: ${props => (props.active ? '#fff' : '#f8f9fa')};
	border: 1px solid #dee2e6;
	border-radius: 4px 4px 0 0;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const CloseButton = styled.span`
	font-size: 16px;
`;

const ViewControls = styled.div`
	margin-left: auto;
	display: flex;
	gap: 10px;
	margin-right: 10px;
`;

const ViewButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
`;

const Editor = styled.div`
	flex: 1;
	display: flex;
	background-color: #fff;
`;

const LineNumbers = styled.div`
	width: 40px;
	padding: 10px 0;
	background-color: #f8f9fa;
	text-align: right;
`;

const LineNumber = styled.div`
	color: #868e96;
	padding: 0 5px;
	font-size: 12px;
`;

const EditorContent = styled.div`
	flex: 1;
	padding: 10px;
`;

const CodeLine = styled.div`
	font-family: monospace;
	color: #40c057;
`;

const Footer = styled.div`
	display: flex;
	gap: 15px;
	padding: 5px 10px;
	background-color: #f8f9fa;
	border-top: 1px solid #dee2e6;
`;

const FooterItem = styled.div`
	font-size: 12px;
	color: #868e96;
`;

export default IDE;
