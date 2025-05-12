export const generateAccountNumber = (): string => {
    const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000);
    return `BANK-${randomDigits}`;
  };