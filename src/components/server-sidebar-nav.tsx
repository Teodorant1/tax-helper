import React from 'react';
import { SidebarNav } from './sidebar-nav';
import { api } from '~/trpc/server';
import type { CompleteUIConfig, CompleteThemeConfig } from '~/server/db/schema';

const ServerSidebarNav = async () => {
  const uiConfig = await api.uiSettings.getSettings() as CompleteUIConfig;
  const themeConfig = await api.theme.getSettings() as CompleteThemeConfig;
    
  return (
    <div>
      <SidebarNav uiConfig={uiConfig} themeConfig={themeConfig} />
    </div>
  );
};

export default ServerSidebarNav;
