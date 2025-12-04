import React, { useState, useEffect } from 'react';
import { FaStar, FaComment, FaUser, FaThumbsUp, FaFlag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../styles/ProductReviews.css';

const ProductReviews = ({ productId, productName, initialRating = 0, initialReviews = [] }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [averageRating, setAverageRating] = useState(initialRating);
  const [reviewStats, setReviewStats] = useState({
    5: 0, 4: 0, 3: 0, 2: 0, 1: 0
  });
  
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    comment: '',
    createdAt: new Date().toISOString()
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Başlangıçta review istatistiklerini hesapla
  useEffect(() => {
    calculateReviewStats();
    calculateAverageRating();
  }, [reviews]);

  // Yorum istatistiklerini hesapla
  const calculateReviewStats = () => {
    const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        stats[review.rating]++;
      }
    });
    
    setReviewStats(stats);
  };

  // Ortalama puanı hesapla
  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      setAverageRating(0);
      return;
    }
    
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = total / reviews.length;
    setAverageRating(average.toFixed(1));
  };

  // Yıldız puanlaması için handler
  const handleStarClick = (rating) => {
    setNewReview(prev => ({
      ...prev,
      rating
    }));
  };

  // Input değişiklikleri için handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Yorum gönderme
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    // Doğrulama
    if (!newReview.name.trim()) {
      toast.error('Lütfen adınızı giriniz');
      return;
    }
    
    if (newReview.rating === 0) {
      toast.error('Lütfen puan veriniz');
      return;
    }
    
    if (!newReview.comment.trim() || newReview.comment.trim().length < 10) {
      toast.error('Yorumunuz en az 10 karakter olmalıdır');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Yeni yorum objesi oluştur
      const reviewToAdd = {
        id: Date.now(),
        productId,
        name: newReview.name.trim(),
        rating: newReview.rating,
        comment: newReview.comment.trim(),
        date: new Date().toLocaleDateString('tr-TR'),
        helpful: 0,
        verified: false
      };
      
      // Yorumları güncelle (burada backend'e gönderebilirsiniz)
      const updatedReviews = [reviewToAdd, ...reviews];
      setReviews(updatedReviews);
      
      // Formu sıfırla
      setNewReview({
        name: '',
        rating: 0,
        comment: '',
        createdAt: new Date().toISOString()
      });
      
      // Başarı mesajı
      toast.success('Yorumunuz başarıyla gönderildi! Teşekkür ederiz.');
      
      // Ortalama puanı güncelle
      const newAverage = ((averageRating * reviews.length + newReview.rating) / (reviews.length + 1)).toFixed(1);
      setAverageRating(newAverage);
      
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Faydalı buldum butonu
  const handleHelpful = (reviewId) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId
          ? { ...review, helpful: (review.helpful || 0) + 1 }
          : review
      )
    );
  };

  // Puan yüzdesi hesapla
  const calculateRatingPercentage = (star) => {
    const totalReviews = reviews.length;
    if (totalReviews === 0) return 0;
    return Math.round((reviewStats[star] / totalReviews) * 100);
  };

  return (
    <div className="product-reviews-container">
      
      {/* YORUM ÖZETİ VE PUANLAMA */}
      <div className="reviews-summary-section">
        <div className="average-rating-card">
          <div className="average-rating-score">
            <span className="rating-number">{averageRating}</span>
            <span className="rating-max">/5</span>
          </div>
          <div className="rating-stars-large">
            {[1, 2, 3, 4, 5].map(star => (
              <FaStar
                key={star}
                className={`star-icon ${star <= Math.round(averageRating) ? 'filled' : 'empty'}`}
              />
            ))}
          </div>
          <div className="total-reviews">
            {reviews.length} değerlendirme
          </div>
        </div>
        
        {/* PUAN DAĞILIMI */}
        <div className="rating-distribution">
          {[5, 4, 3, 2, 1].map(star => (
            <div key={star} className="rating-bar-row">
              <span className="star-label">{star} yıldız</span>
              <div className="rating-bar-container">
                <div 
                  className="rating-bar-fill"
                  style={{ width: `${calculateRatingPercentage(star)}%` }}
                ></div>
              </div>
              <span className="rating-count">{reviewStats[star]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* YORUM YAZMA FORMU */}
      <div className="write-review-section">
        <h3 className="section-title">Yorumunuzu Yazın</h3>
        <p className="section-subtitle">
          Ürün hakkındaki deneyimlerinizi paylaşın. Yorum yapmak için kayıt olmanıza gerek yok.
        </p>
        
        <form onSubmit={handleSubmitReview} className="review-form">
          {/* PUANLAMA */}
          <div className="form-group">
            <label className="form-label">Puanınız *</label>
            <div className="star-rating-input">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`star-button ${star <= newReview.rating ? 'selected' : ''}`}
                  onClick={() => handleStarClick(star)}
                  aria-label={`${star} yıldız`}
                >
                  <FaStar />
                </button>
              ))}
              <span className="rating-text">
                {newReview.rating === 0 ? 'Puan seçin' : `${newReview.rating} / 5`}
              </span>
            </div>
          </div>

          {/* AD SOYAD */}
          <div className="form-group">
            <label className="form-label" htmlFor="reviewName">
              Adınız Soyadınız *
            </label>
            <input
              type="text"
              id="reviewName"
              name="name"
              className="form-input"
              value={newReview.name}
              onChange={handleInputChange}
              placeholder="Adınızı ve soyadınızı girin"
              required
            />
          </div>

          {/* YORUM */}
          <div className="form-group">
            <label className="form-label" htmlFor="reviewComment">
              Yorumunuz *
            </label>
            <textarea
              id="reviewComment"
              name="comment"
              className="form-textarea"
              value={newReview.comment}
              onChange={handleInputChange}
              placeholder="Ürün hakkındaki deneyimlerinizi detaylı bir şekilde yazın..."
              rows="6"
              required
            ></textarea>
            <div className="character-count">
              {newReview.comment.length} / 500 karakter
            </div>
          </div>

          {/* GÖNDER BUTONU */}
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-submit-review"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <FaComment className="submit-icon" />
                  Yorumu Gönder
                </>
              )}
            </button>
            <small className="form-note">
              Yorumunuz onaylandıktan sonra yayınlanacaktır. 
              Kullanıcı sözleşmesini kabul ediyorsunuz.
            </small>
          </div>
        </form>
      </div>

      {/* MEVCUT YORUMLAR */}
      <div className="existing-reviews-section">
        <h3 className="section-title">
          Müşteri Yorumları ({reviews.length})
        </h3>
        
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <div className="no-reviews-icon">
              <FaComment />
            </div>
            <h4>Henüz Yorum Yok</h4>
            <p>Bu ürün için henüz müşteri yorumu bulunmuyor.</p>
            <p className="encourage-text">İlk yorumu siz yapın!</p>
          </div>
        ) : (
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      <FaUser />
                    </div>
                    <div className="reviewer-details">
                      <span className="reviewer-name">{review.name}</span>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                  <div className="review-rating">
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <FaStar
                          key={star}
                          className={`star-icon-small ${star <= review.rating ? 'filled' : 'empty'}`}
                        />
                      ))}
                    </div>
                    <span className="review-rating-number">{review.rating}/5</span>
                  </div>
                </div>
                
                <div className="review-content">
                  <p>{review.comment}</p>
                </div>
                
                <div className="review-footer">
                  <button 
                    className="helpful-button"
                    onClick={() => handleHelpful(review.id)}
                  >
                    <FaThumbsUp />
                    <span>Faydalı ({review.helpful || 0})</span>
                  </button>
                  <button className="report-button">
                    <FaFlag />
                    <span>Şikayet</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;