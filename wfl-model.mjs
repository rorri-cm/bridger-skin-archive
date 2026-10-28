export function suggestedValue(item, items) {
  if (item.tier === 'Especial' || !/^\d+(\.\d+)?\/10$/.test(item.demand)) return null;
  const rank = items.filter(x => x.tier !== 'Especial').findIndex(x => x.id === item.id);
  return Math.max(1, Math.round(1000 * Math.pow(0.965, rank)));
}
export function evaluateTrade(give, receive) {
  const sum = rows => rows.reduce((total, row) => total + row.value * row.quantity, 0);
  if (!give.length || !receive.length) return {status:'empty'};
  if ([...give,...receive].some(r => r.value === null || !Number.isFinite(r.value) || r.value <= 0)) return {status:'unknown'};
  const yours=sum(give), theirs=sum(receive), difference=theirs-yours;
  const percent=difference/yours*100;
  return {status:Math.abs(percent)<=5?'fair':percent>0?'win':'loss',yours,theirs,difference,percent};
}
