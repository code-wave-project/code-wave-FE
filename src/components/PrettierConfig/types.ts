export interface PrettierConfigProps {
  // Prettier 설정을 위한 props
  config?: {
    printWidth?: number;
    tabWidth?: number;
    useTabs?: boolean;
    semi?: boolean;
    singleQuote?: boolean;
    // 기타 Prettier 설정...
  };
  onConfigChange?: (newConfig: any) => void;
} 