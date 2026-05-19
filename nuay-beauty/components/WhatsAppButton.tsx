'use client';

import { WhatsappLogo } from '@phosphor-icons/react';
import { useSiteData } from '@/components/SiteDataContext';

export default function WhatsAppButton() {
  const { contact } = useSiteData();
  return (
    <a
      href={`https://wa.me/${contact.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
      style={{ background: '#25D366', color: '#fff', width: 52, height: 52 }}
    >
      <WhatsappLogo size={26} weight="fill" />
    </a>
  );
}
