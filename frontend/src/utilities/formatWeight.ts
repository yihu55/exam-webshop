const WEIGHT_FORMATTER = new Intl.NumberFormat(undefined, {
  style: "unit",
  unit: "gram",
});

export function formatWeight(number: number) {
  return WEIGHT_FORMATTER.format(number);
}
