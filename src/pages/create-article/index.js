import ButtonPrimary from '@/app/components/ButtonPrimary';
import React, { useState } from 'react';
import 'src/app/globals.css';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);

  // New state for toast message and visibility
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }

    // Append article data to the formData
    formData.append('title', title);
    formData.append('description', description);
    formData.append('body', body);

    try {
      // Send the article data to your server
      const response = await fetch('/api/articles', {
        method: 'POST',
        body: formData
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      // Show success toast
      setToastMessage('Article created successfully!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      const newArticleId = responseData.id; 
      window.location.href = `/article/${newArticleId}`;

    } catch (error) {
      console.error('Error submitting article:', error);
      // Show error toast
      setToastMessage(error.message || 'Error creating article.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    // Function to reset file input
    const resetFileInput = () => {
      event.target.value = null; // This clears the selected file
      setImage(null);
    };
  
    // Check if file is selected
    if (!file) {
      resetFileInput();
      return;
    }
  
    // Check the file type
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setToastMessage('Please upload an image in JPG or PNG format.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      resetFileInput();
      return;
    }
  
    // Check the file size (3 MB in bytes)
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      setToastMessage('File size should be less than 3 MB.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      resetFileInput();
      return;
    }
  
    // If file is valid, update the image state
    setImage(file);
  };  

  return (
    <>
      {showToast && (
        <div className="fixed top-5 right-5 bg-blue-500 text-white p-3 rounded">
          {toastMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required/>
        </div>
        <div>
          <label>Body:</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} required/>
        </div>
        <div>
          <label>Image (optional):</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <ButtonPrimary text="Create Article" className="btn btn-primary" type="submit"/>
      </form>
    </>
  );
};

export default CreateArticle;
