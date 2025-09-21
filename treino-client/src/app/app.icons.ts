import { provideIcons } from '@ng-icons/core';
import {
  heroUsers,
  heroHome,
  heroBell,
  heroCog,
  heroXMark,
  heroCheck,
} from '@ng-icons/heroicons/outline';

export const provideNgIcons = () =>
  provideIcons({ heroUsers, heroHome, heroBell, heroCog, heroXMark, heroCheck });
