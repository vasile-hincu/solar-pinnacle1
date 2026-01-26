import emailjs from 'emailjs-com';

// Initialize EmailJS (you'll need to set up an account on emailjs.com)
// Service ID, Template ID, and Public Key need to be configured
const SERVICE_ID = 'service_qz0ac3d'; // Your Email Service ID
const TEMPLATE_ID = 'template_jepalv8'; // Your Email Template ID
const PUBLIC_KEY = 'HNL8FGSPtjaym6K30'; // Your Public Key from EmailJS API Keys

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  systemType: string;
  kw?: string;
  batteryKwh?: string;
  mounting?: string;
  estimatedPriceEur?: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const summaryLines = [
      formData.systemType ? `Tip sistem: ${formData.systemType}` : undefined,
      formData.kw ? `Putere: ${formData.kw} kW` : undefined,
      formData.batteryKwh ? `Baterie: ${formData.batteryKwh} kWh` : undefined,
      formData.mounting ? `Montaj: ${formData.mounting}` : undefined,
      formData.estimatedPriceEur ? `Preț estimat: ${formData.estimatedPriceEur} EUR` : undefined,
    ].filter(Boolean);

    const messageWithSummary =
      summaryLines.length > 0
        ? `${summaryLines.join("\n")}\n\nMesaj client:\n${formData.message || "(fără mesaj)"}`
        : formData.message;

    const emailParams = {
      to_email: 'vasea.2003.55@gmail.com',
      from_name: formData.name,
      from_email: formData.email || 'noreply@solarpinnacle.md',
      phone: formData.phone,
      system_type: formData.systemType || 'Nu a specificat',
      message: messageWithSummary,
      reply_to: formData.email,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      emailParams
    );

    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
