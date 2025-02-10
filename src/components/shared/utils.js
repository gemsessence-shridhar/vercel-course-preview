export const nodes = (item) => (
  item.edges.map((edge) => edge.node)
);