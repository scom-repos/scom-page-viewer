import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

const bounceAnim = Styles.keyframes({
  '0%, 20%, 50%, 80%, 100%': {transform: 'translateY(var(--translateY))'},
  '40%': {transform: 'translateY(calc(-30px + var(--translateY)))'},
  '60%': {transform: 'translateY(calc(-15px + var(--translateY)))'}
})

export default Styles.style({
  scrollBehavior: 'smooth',
  $nest: {
    '.pnl-navigation': {
      bottom: 0,
      position: 'fixed',
      paddingInline: 6,
      paddingTop: 2,
      paddingBottom: 2,
      gap: 2,
      $nest: {
        '.nav-item': {
          flex: '1 1 0%',
          transition: 'background .3s ease-in'
        },
        '.nav-item.is-actived': {
          background: Theme.colors.primary.main
        }
      }
    },
    '#pnlProgress': {
      opacity: 0,
      transition: 'opacity .3s ease-out'
    },
    '.slide-active': {
      transition: 'transform .2s ease-in'
    },
    '.pnl-sections sc-page-viewer-section': {
      transition: 'transform .2s ease-out'
    },
    '.slide-bounce': {
      animationName: bounceAnim,
      animationFillMode: 'both',
      animationDuration: '1s',
      animationIterationCount: "2"
    }
  }
});