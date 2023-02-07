import { Styles } from '@ijstech/components';

export default Styles.style({
  $nest: {
    '.anchor-item': {
      opacity: 0.85,
      $nest: {
        '&:hover': {
          opacity: 1
        }
      }
    }
  }
});