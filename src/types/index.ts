// 파일 구조를 위한 타입
export interface FileStructure {
  id: string;
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileStructure[];
  path: string;
  extension?: string;
}

// 사용자 정보를 위한 타입
export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline';
} 