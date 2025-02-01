import { useState, useEffect } from 'react';
import * as S from '@components/Common/InputText.style';

interface InputTextProps {
	label: string;
	placeholder: string;
	warningMsg?: string;
	isEssential?: boolean;
	onInputChange?: (value: string, isEssential?: boolean) => void;
}

function InputText({ label, placeholder, warningMsg, isEssential, onInputChange }: InputTextProps) {
	const [inputData, setInputData] = useState('');
	const [showWarning, setShowWarning] = useState(false);
	const [hasInteracted, setHasInteracted] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputData(value);
		setHasInteracted(true);

		if (onInputChange) {
			onInputChange(value, isEssential);
		}
	};

	useEffect(() => {
		if (isEssential && hasInteracted && inputData.trim().length === 0) {
			setShowWarning(true);
		} else {
			setShowWarning(false);
		}
	}, [inputData, isEssential, hasInteracted]);

	return (
		<S.Input>
			<S.LabelSpace>
				<S.Label>{label}</S.Label>
				{isEssential && <S.Essential>*</S.Essential>}
			</S.LabelSpace>
			<S.InputText
				placeholder={placeholder}
				type="text"
				value={inputData}
				onChange={handleInputChange}
				$isInvalid={showWarning}
				required={isEssential}
			/>
			{showWarning && <S.Warn>{warningMsg}</S.Warn>}
		</S.Input>
	);
}

export default InputText;
