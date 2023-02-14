import { Styles } from '@ijstech/components';
import Assets from '@modules/assets';

Styles.Theme.defaultTheme.typography.fontFamily = 'Poppins';

export default Styles.style({
  $nest: {
    '*': {
      boxSizing: 'border-box'
    },
    '@media screen and (min-width: 768px) and (max-width: 1280px)': {
      $nest: {
        '.w-80': {
          width: 'calc(100% - 64px)'
        }
      }
    },
    '@media screen and (max-width: 767px)': {
      $nest: {
        '.w-80': {
          width: 'calc(100% - 32px)'
        }
      }
    }
  }
});

Styles.fontFace({
  fontFamily: "Poppins",
  src: `url("${Assets.fonts.poppins.bold}") format("truetype")`,
  fontWeight: 'bold',
  fontStyle: 'normal'
});

Styles.fontFace({
  fontFamily: "Poppins",
  src: `url("${Assets.fonts.poppins.italic}") format("truetype")`,
  fontWeight: '300',
  fontStyle: 'italic'
});

Styles.fontFace({
  fontFamily: "Poppins",
  src: `url("${Assets.fonts.poppins.regular}") format("truetype")`,
  fontWeight: 'normal',
  fontStyle: 'normal'
});

Styles.fontFace({
  fontFamily: "Poppins",
  src: `url("${Assets.fonts.poppins.medium}") format("truetype")`,
  fontWeight: '600',
  fontStyle: 'normal'
});

Styles.fontFace({
  fontFamily: "Poppins",
  src: `url("${Assets.fonts.poppins.thin}") format("truetype")`,
  fontWeight: '300',
  fontStyle: 'normal'
});
