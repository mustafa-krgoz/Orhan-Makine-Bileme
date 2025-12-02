import React, { useState } from 'react';
import { 
  FaTimes, FaCopy, FaWhatsapp, FaFacebook, FaTwitter, 
  FaEnvelope, FaLink, FaCheck 
} from 'react-icons/fa';
import './ShareModel.css';

const ShareModal = ({ isOpen, onClose, productName, productUrl }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Link kopyalanamadı:', err);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      color: '#25D366',
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${productName} - ${productUrl}`)}`, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: <FaFacebook />,
      color: '#1877F2',
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`, '_blank');
      }
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      color: '#1DA1F2',
      action: () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productName)}`, '_blank');
      }
    },
    {
      name: 'E-posta',
      icon: <FaEnvelope />,
      color: '#EA4335',
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(productName)}&body=${encodeURIComponent(`Bu ürünü incelemelisin: ${productUrl}`)}`;
      }
    }
  ];

  return (
    <div className="share-modal-overlay">
      <div className="share-modal">
        <div className="share-modal-header">
          <h3>Ürünü Paylaş</h3>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="share-link-section">
          <div className="link-input-group">
            <FaLink className="link-icon" />
            <input 
              type="text" 
              value={productUrl} 
              readOnly 
              className="link-input"
            />
            <button 
              className={`copy-button ${copied ? 'copied' : ''}`}
              onClick={handleCopyLink}
            >
              {copied ? <FaCheck /> : <FaCopy />}
              {copied ? 'Kopyalandı!' : 'Kopyala'}
            </button>
          </div>
        </div>

        <div className="share-platforms">
          <h4>Paylaş</h4>
          <div className="platform-grid">
            {shareOptions.map((platform, index) => (
              <button
                key={index}
                className="platform-button"
                onClick={platform.action}
                style={{ '--platform-color': platform.color }}
              >
                <span className="platform-icon">{platform.icon}</span>
                <span className="platform-name">{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="share-modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;