import React from 'react';
import { Download, X } from 'lucide-react';
import './PWAPrompt.css';

const PWAPrompt = ({ onInstall, onDismiss }) => {
  return (
    <div className="pwa-prompt-overlay">
      <div className="pwa-prompt">
        <button 
          className="pwa-prompt-close"
          onClick={onDismiss}
          aria-label="Kapat"
        >
          <X size={20} />
        </button>
        
        <div className="pwa-prompt-content">
          <div className="pwa-prompt-icon">
            <Download size={32} />
          </div>
          
          <h3 className="pwa-prompt-title">Orhan Makine'yi Yükleyin</h3>
          
          <p className="pwa-prompt-description">
            Uygulamayı yükleyerek daha hızlı erişim sağlayın ve 
            çevrimdışı kullanım imkanından yararlanın.
          </p>
          
          <div className="pwa-prompt-actions">
            <button 
              className="pwa-prompt-install"
              onClick={onInstall}
            >
              Yükle
            </button>
            
            <button 
              className="pwa-prompt-later"
              onClick={onDismiss}
            >
              Daha Sonra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAPrompt;