import React, { useState } from 'react';
import { PrettierConfigProps } from './types';
import '../../styles/components/PrettierConfig.css';

const defaultConfig = {
	printWidth: 80,
	tabWidth: 2,
	useTabs: false,
	semi: true,
	singleQuote: true,
};

const PrettierConfig: React.FC<PrettierConfigProps> = ({ config = defaultConfig, onConfigChange }) => {
	const [currentConfig, setCurrentConfig] = useState(config);

	const handleConfigChange = (key: string, value: any) => {
		const newConfig = {
			...currentConfig,
			[key]: value,
		};
		setCurrentConfig(newConfig);
		onConfigChange?.(newConfig);
	};

	return (
		<div className="prettier-config">
			<h3>Prettier Configuration</h3>
			<div className="config-item">
				<label>Print Width:</label>
				<input
					type="number"
					value={currentConfig.printWidth}
					onChange={e => handleConfigChange('printWidth', Number(e.target.value))}
				/>
			</div>
			<div className="config-item">
				<label>Tab Width:</label>
				<input
					type="number"
					value={currentConfig.tabWidth}
					onChange={e => handleConfigChange('tabWidth', Number(e.target.value))}
				/>
			</div>
			<div className="config-item">
				<label>Use Tabs:</label>
				<input
					type="checkbox"
					checked={currentConfig.useTabs}
					onChange={e => handleConfigChange('useTabs', e.target.checked)}
				/>
			</div>
			<div className="config-item">
				<label>Semicolons:</label>
				<input
					type="checkbox"
					checked={currentConfig.semi}
					onChange={e => handleConfigChange('semi', e.target.checked)}
				/>
			</div>
			<div className="config-item">
				<label>Single Quote:</label>
				<input
					type="checkbox"
					checked={currentConfig.singleQuote}
					onChange={e => handleConfigChange('singleQuote', e.target.checked)}
				/>
			</div>
		</div>
	);
};

export default PrettierConfig;
