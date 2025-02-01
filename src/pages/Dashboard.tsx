import { useState } from 'react';
import * as S from '@/styles/pages/Dashboard.style';

import SideBar from '@components/Dashboard/DashSideBar';
import Header from '@components/Dashboard/Header';
import ProjectCard from '@components/Dashboard/ProjectCard';
import CreateModModal from '@components/DashboardModal/CreateModModal';
import DeleteModModal from '@components/DashboardModal/DeleteModModal';
import InviteModal from '@components/DashboardModal/InviteModal';

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
	const [selectedMenu, setSelectedMenu] = useState<'all' | 'recent'>('all');
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
	const [editingProject, setEditingProject] = useState<null | (typeof Projects)[number]>(null);
	const [deletingProject, setDeletingProject] = useState<null | (typeof Projects)[number]>(null);

	const hasProjects = Projects.length > 0;

	const openCreateModal = () => {
		setEditingProject(null);
		setIsCreateModalOpen(true);
	};

	const openEditModal = (project: (typeof Projects)[number]) => {
		setEditingProject(project);
		setIsCreateModalOpen(true);
	};

	const closeCreateModal = () => {
		setIsCreateModalOpen(false);
		setEditingProject(null);
	};

	const openDeleteModal = (project: (typeof Projects)[number]) => {
		setDeletingProject(project);
		setIsDeleteModalOpen(true);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
		setDeletingProject(null);
	};

	const openInviteModal = () => setIsInviteModalOpen(true);
	const closeInviteModal = () => setIsInviteModalOpen(false);

	return (
		<>
			<S.Dashboard>
				<SideBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
				<S.Space>
					<Header />
					<S.TopSpace>
						<S.Title>{selectedMenu === 'all' ? '모든 프로젝트' : '최근 프로젝트'}</S.Title>
						<S.ButtonSpace>
							<S.Button onClick={openCreateModal}>+ 프로젝트 생성</S.Button>
							{hasProjects && <S.Button onClick={openInviteModal}>+ 초대 코드</S.Button>}
						</S.ButtonSpace>
					</S.TopSpace>
					<S.ProjectSpace>
						{hasProjects ? (
							Projects.map((project, index) => (
								<ProjectCard
									key={index}
									{...project}
									onEdit={() => openEditModal(project)}
									onDelete={() => openDeleteModal(project)}
								/>
							))
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

			{isCreateModalOpen && (
				<CreateModModal
					onClose={closeCreateModal}
					isCreate={!editingProject}
					initialData={editingProject ?? undefined}
				/>
			)}
			{isDeleteModalOpen && deletingProject && <DeleteModModal onClose={closeDeleteModal} project={deletingProject} />}
			{isInviteModalOpen && <InviteModal onClose={closeInviteModal} />}
		</>
	);
}

export default Dashboard;
