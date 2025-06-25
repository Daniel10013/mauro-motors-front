export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "-";
  return date.toLocaleDateString("pt-BR");
};

export const formatMoney = (value) => {
  const number = Number(value);
  if (isNaN(number)) return "R$ 0";
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};