import { makeTheme } from 'bootstrap-styled/lib/theme';
import { backgroundSecondary } from './colors';
import '@ibm/plex/css/ibm-plex.css';

const inkTheme = makeTheme({
  '$font-family-sans-serif:':
    "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  '$font-family-base': "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  '$text-color': '#fff',
  '$headings-color': '#fff',
  '$body-bg': '#000',
  '$brand-primary': '#446487',
  '$jumbotron-bg': backgroundSecondary,
});

export default inkTheme;
