import * as S from '@components/Dashboard/DashMenu.style';
import { theme } from '@styles/theme';

interface MenuProps {
	icon: React.ElementType;
	title: string;
	selected: boolean;
	onClick: () => void;
}

function DashMenu({ icon: Icon, title, selected, onClick }: MenuProps) {
	return (
		<>
			<S.DashMenu onClick={onClick}>
				<S.SelectBar $isSelected={selected} />
				<S.MenuGroup $isSelected={selected}>
					<Icon width={36} height={36} fill={selected ? theme.COLOR.BLUE500 : theme.COLOR.GRAY600} />
					{title}
				</S.MenuGroup>
			</S.DashMenu>
		</>
	);
}
export default DashMenu;
