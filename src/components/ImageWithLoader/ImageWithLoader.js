import React, { useState, useEffect } from 'react';

const ImageWithLoader = ({ imageUrl }) => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setLoading(true);
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          setImage(URL.createObjectURL(blob));
          setLoading(false);
        } catch (error) {
          console.error('Error loading image:', error);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading image:', error);
        setLoading(false);
      }
    };

    loadImage();
  }, [imageUrl]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <img src={image} alt="Loaded Image" />
      )}
    </div>
  );
};

export default ImageWithLoader;