import React, { useState } from 'react';
import styled from 'styled-components';
import SideBar from '../components/IDE/SideBar';
import SidePanel from '../components/IDE/SidePanel';
import FileExplorePanel from '../components/IDE/SidePanel/panels/FileExplorePanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ChatPanel from '../components/IDE/SidePanel/panels/ChatPanel';
import Editor from '../components/IDE/Editor';
import { COLOR } from '../const/color';

const IDE: React.FC = () => {
	const [activeSidePanel, setActiveSidePanel] = useState<string | null>(null);
	const [code, setCode] = useState('');

	const [files, setFiles] = useState([]);
	const [openTabs, setOpenTabs] = useState(['test.jsp']);

	return (
		<Container>
			<SideBar onSidePanelChange={panel => setActiveSidePanel(panel)} activePanel={activeSidePanel} />

			<MainContainer>
				<ContentWrapper>
					{activeSidePanel && (
						<DndProvider backend={HTML5Backend}>
							<SidePanel
								title={activeSidePanel === 'files' ? '탐색기' : activeSidePanel === 'chat' ? '채팅' : '코드 스타일'}>
								{activeSidePanel === 'files' ? <FileExplorePanel /> : activeSidePanel === 'chat' ? <ChatPanel /> : null}
							</SidePanel>
						</DndProvider>
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

						<Editor defaultValue={code} onChange={value => setCode(value || '')} language="go" />
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
	width: 100vw;
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
	max-width: 100%;
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

const Footer = styled.div`
	display: flex;
	gap: 15px;
	padding: 5px 10px;
	background-color: #f8f9fa;
	border-top: 4px solid ${COLOR.GRAY100};
`;

const FooterItem = styled.div`
	font-size: 12px;
	color: #868e96;
`;

export default IDE;
