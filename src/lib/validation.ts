export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  opportunityType?: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  const name = data.name?.trim();
  if (!name || name.length < 2) {
    errors.name = "Please provide your name (at least 2 characters).";
  } else if (name.length > 80) {
    errors.name = "Name must be under 80 characters.";
  }

  const email = data.email?.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = "Please provide a valid email address.";
  } else if (!emailRegex.test(email)) {
    errors.email = "The email address format appears invalid.";
  }

  const message = data.message?.trim();
  if (!message || message.length < 15) {
    errors.message = "Message must be at least 15 characters long.";
  } else if (message.length > 3000) {
    errors.message = "Message exceeds the 3000 character limit.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
