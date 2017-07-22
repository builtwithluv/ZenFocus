import macLogo from 'assets/images/blackLogo.png';
import winLogo from 'assets/images/whiteLogo.png';
import { isMacOS } from 'utils/platform.util';

export const getLogo = () => isMacOS() ? macLogo : winLogo;
