/**
 * Validação de CPF brasileiro
 */
export function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/[^\d]/g, "");

  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false;

  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Valida primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(9))) return false;

  // Valida segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(10))) return false;

  return true;
}

/**
 * Valida número de cartão usando algoritmo de Luhn
 */
export function validateCardNumber(cardNumber: string): boolean {
  const cleanCard = cardNumber.replace(/\s/g, "");
  
  // Verifica se tem entre 13 e 19 dígitos
  if (cleanCard.length < 13 || cleanCard.length > 19) return false;
  
  // Verifica se são apenas números
  if (!/^\d+$/.test(cleanCard)) return false;

  // Algoritmo de Luhn
  let sum = 0;
  let isEven = false;

  // Percorre do último dígito para o primeiro
  for (let i = cleanCard.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanCard.charAt(i));

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Valida CVV (3 ou 4 dígitos)
 */
export function validateCVV(cvv: string): boolean {
  const cleanCVV = cvv.replace(/\s/g, "");
  return /^\d{3,4}$/.test(cleanCVV);
}

/**
 * Valida data de validade do cartão (MM/AA)
 */
export function validateExpiry(expiry: string): { valid: boolean; expired?: boolean } {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) {
    return { valid: false };
  }

  const month = parseInt(match[1]);
  const year = parseInt(match[2]);

  // Valida mês (1-12)
  if (month < 1 || month > 12) {
    return { valid: false };
  }

  // Converte para ano completo (20XX)
  const fullYear = 2000 + year;
  const expiryDate = new Date(fullYear, month, 0); // Último dia do mês
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (expiryDate < today) {
    return { valid: true, expired: true };
  }

  return { valid: true, expired: false };
}

/**
 * Formata CPF: 000.000.000-00
 */
export function formatCPF(value: string): string {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
}

/**
 * Formata número de cartão: 0000 0000 0000 0000
 */
export function formatCardNumber(value: string): string {
  const numbers = value.replace(/\s/g, "").replace(/\D/g, "");
  const groups = numbers.match(/.{1,4}/g) || [];
  return groups.join(" ").substring(0, 19); // Máximo 16 dígitos + 3 espaços
}

/**
 * Formata validade: MM/AA
 */
export function formatExpiry(value: string): string {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length === 0) return "";
  if (numbers.length <= 2) return numbers;
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
}

