
export type AppId = 'terminal' | 'explorer' | 'notepad' | 'settings' | 'browser' | 'camera' | 'calculator';

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DesktopIcon {
  id: AppId;
  label: string;
  icon: string;
}

export interface SystemSettings {
  wallpaper: string;
  theme: 'light' | 'dark';
  accentColor: string;
}
