import '@emotion/react';
import { ColorType, FontType, UtilityType } from './theme';

declare module '@emotion/react' {
	export interface Theme {
		COLOR: ColorType;
		FONT: FontType;
		UTILITIY: UtilityType;
	}
}
