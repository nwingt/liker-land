export default {
  name: 'civic-page',
  experimentID: 'oh7rr21nTliD_UlcyyOKTg',
  isEligible: ({ route }) => !process.server && route.name === 'civic',
  variants: [{ name: 'origin', weight: 5 }, { name: 'variant', weight: 5 }],
};
