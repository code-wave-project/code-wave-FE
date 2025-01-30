import { useState } from 'react';
import * as S from '@/styles/pages/Dashboard.style';

import SideBar from '@components/Dashboard/DashSideBar';
import Header from '@/components/Dashboard/Header';

function Dashboard() {
	// 현재 선택된 메뉴 상태 (초기값: "모든 프로젝트")
	const [selectedMenu, setSelectedMenu] = useState<'all' | 'recent'>('all');

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
							<S.Button>+ 초대 코드</S.Button>
						</S.ButtonSpace>
					</S.TopSpace>
				</S.Space>
			</S.Dashboard>
		</>
	);
}
export default Dashboard;
