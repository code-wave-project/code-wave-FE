import { useState } from 'react';
import * as S from '@/styles/pages/Dashboard.style';

import SideBar from '@components/Dashboard/DashSideBar';
import Header from '@/components/Dashboard/Header';
import ProjectCard from '@/components/Dashboard/ProjectCard';

const Projects = [
	{
		title: '프로젝트 제목',
		text: '프로젝트 설명입니다.',
		user: 'USER',
		date: '0000.00.00.(0)',
		member: 'USER, USER',
		inviteCode: 'PW1234',
	},
];

function Dashboard() {
	// 현재 선택된 메뉴 상태 (초기값: "모든 프로젝트")
	const [selectedMenu, setSelectedMenu] = useState<'all' | 'recent'>('all');

	// 프로젝트가 존재하는지 확인
	const hasProjects = Projects.length > 0;

	return (
		<>
			<S.Dashboard>
				<SideBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
				<S.Space>
					<Header />
					<S.TopSpace>
						<S.Title>{selectedMenu === 'all' ? '모든 프로젝트' : '최근 프로젝트'}</S.Title>
						<S.ButtonSpace>
							<S.Button>+ 프로젝트 생성</S.Button>
							{hasProjects && <S.Button>+ 초대 코드</S.Button>}
						</S.ButtonSpace>
					</S.TopSpace>
					<S.ProjectSpace>
						{hasProjects ? (
							Projects.map((project, index) => <ProjectCard key={index} {...project} />)
						) : (
							<S.NonProject>
								프로젝트가 없습니다.
								<br />
								새로운 프로젝트를 만들어보세요.
							</S.NonProject>
						)}
					</S.ProjectSpace>
				</S.Space>
			</S.Dashboard>
		</>
	);
}
export default Dashboard;
