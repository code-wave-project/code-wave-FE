import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '@/styles/pages/Dashboard.style';

import SideBar from '@components/Dashboard/DashSideBar';
import Header from '@components/Dashboard/Header';
import ProjectCard from '@components/Dashboard/ProjectCard';
import CreateModModal from '@components/DashboardModal/CreateModModal';
import DeleteModModal from '@components/DashboardModal/DeleteModModal';
import InviteModal from '@components/DashboardModal/InviteModal';

import { useCheckProjects } from '@/hooks/dashboard/useCheckProjects';

function Dashboard() {
	const { checkProjects, data, isLoading, isError } = useCheckProjects();
	const projects = data?.data?.projects ?? [];
	const navigate = useNavigate();

	const [selectedMenu, setSelectedMenu] = useState<'all' | 'recent'>('all');
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
	const [editingProject, setEditingProject] = useState<null | (typeof projects)[number]>(null);
	const [deletingProject, setDeletingProject] = useState<null | (typeof projects)[number]>(null);

	useEffect(() => {
		checkProjects();
	}, []);

	const handleNavLinkClick = (path: string): void => {
		navigate(path);
	};

	const hasProjects = projects?.length > 0;

	const sortedProjects = [...projects].sort(
		(a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
	);

	const displayedProjects = selectedMenu === 'recent' ? sortedProjects : projects;

	const openCreateModal = () => {
		setEditingProject(null);
		setIsCreateModalOpen(true);
	};

	const openEditModal = (project: (typeof projects)[number]) => {
		setEditingProject(project);
		setIsCreateModalOpen(true);
	};

	const closeCreateModal = () => {
		setTimeout(() => {
			setIsCreateModalOpen(false);
			setEditingProject(null);
			checkProjects();
		}, 1000);
	};

	const openDeleteModal = (project: (typeof projects)[number]) => {
		setDeletingProject(project);
		setIsDeleteModalOpen(true);
	};

	const closeDeleteModal = () => {
		setTimeout(() => {
			setIsDeleteModalOpen(false);
			setDeletingProject(null);
			checkProjects();
		}, 1000);
	};

	const openInviteModal = () => setIsInviteModalOpen(true);

	const closeInviteModal = () => {
		setTimeout(() => {
			setIsInviteModalOpen(false);
			checkProjects();
		}, 1000);
	};

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
						{isLoading ? (
							<S.NonProject>로딩 중...</S.NonProject>
						) : isError ? (
							<S.NonProject>프로젝트를 불러오는 중 오류가 발생했습니다.</S.NonProject>
						) : displayedProjects.length > 0 ? (
							displayedProjects.map(project => (
								<ProjectCard
									key={project.projectId}
									title={project.title}
									text={project.description}
									user={project.initiator}
									date={new Date(project.createdAt).toLocaleDateString()}
									member={project.users.map(user => user.username).join(', ')}
									inviteCode={project.inviteCode}
									onEdit={() => openEditModal(project)}
									onDelete={() => openDeleteModal(project)}
									onClick={() => handleNavLinkClick(`/editor/${project.projectId}`)}
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
