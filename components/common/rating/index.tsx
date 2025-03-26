import React from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'; // Import CSS

const RatingComponent: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="text-center">
      <Rating value={rating} readOnly style={{ maxWidth: 120 }} />
    </div>
  );
};

export default RatingComponent;
