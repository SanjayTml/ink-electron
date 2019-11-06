import { makeTheme } from 'bootstrap-styled/lib/theme';
import {
  buttonPrimary,
  buttonSecondary,
  buttonInfo,
  backgroundPrimary,
  backgroundSecondary,
  backgroundPanel
} from './colors';
import '@ibm/plex/css/ibm-plex.css';

const inkTheme = makeTheme({
  '$font-family-sans-serif:':
    "'Roboto', 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  '$font-family-base': "'Roboto', 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  '$text-color': '#fff',
  '$headings-color': '#fff',
  '$body-bg': backgroundPrimary,
  '$brand-primary': backgroundPrimary,
  '$brand-info': backgroundSecondary,
  '$link-decoration': 'none',
  '$headings-font-weight': 300,
  '$panel-bg': backgroundPanel,
  '$btn-primary-bg': buttonPrimary,
  '$btn-secondary-bg': buttonSecondary,
  '$btn-secondary-border': buttonSecondary,
  '$btn-secondary-color': '#fff',
  '$btn-info-bg': buttonInfo,
  '$btn-line-height': '1em'
});

export default inkTheme;
