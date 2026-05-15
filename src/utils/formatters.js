// 8430 → "8,430"
export const formatNumber = (value) => {
  const num = Number(value) || 0;
  return num.toLocaleString('en-US');
};

// 2890.66 → "2,890.66"  (her zaman 2 ondalık)
export const formatMoney = (value) => {
  const num = Number(value) || 0;
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// -49.88 → "-49.88"   |   +99.99 → "+99.99"
// Income/Expense satırlarında prefix gerekli
export const formatSignedMoney = (value) => {
  const num = Number(value) || 0;
  const sign = num > 0 ? '+' : '';
  return sign + num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};