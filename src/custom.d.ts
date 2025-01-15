// SVG 파일에 대한 타입 선언을 추가
declare module '*.svg?react' {
	import React from 'react';
	const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	export default SVGComponent;
}

declare module '*.svg' {
	const content: string;
	export default content;
}
