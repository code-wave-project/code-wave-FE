import * as S from '@/styles/pages/Dashboard.style';

import SideBar from '@components/Dashboard/DashSideBar';
import Header from '@/components/Dashboard/Header';

function Dashboard() {
	return (
		<>
			<S.Dashboard>
				<SideBar />
				<S.Space>
					<Header />
				</S.Space>
			</S.Dashboard>
		</>
	);
}
export default Dashboard;
