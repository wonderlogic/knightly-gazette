import ButtonPrimary from '@/app/components/ButtonPrimary';
import Navbar from '@/app/components/Navbar';
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
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Navbar/>

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col '>
            <label className='font-bold text-lg'>Title:</label>
            <input placeholder="Type here" className="input input-bordered input-md w-full" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
          </div>
          <div className='flex flex-col mt-5'>
            <label className='font-bold text-lg'>Description:</label>
            <textarea placeholder="Short description" className="textarea textarea-bordered textarea-sm w-full" value={description} onChange={(e) => setDescription(e.target.value)} required/>
          </div>
          <div className='flex flex-col mt-5'>
            <label className='font-bold text-lg'>Body:</label>
            <textarea placeholder="Body of the article" className="textarea textarea-bordered textarea-lg h-72 w-full" value={body} onChange={(e) => setBody(e.target.value)} required/>
          </div>
          
          <div className='flex flex-col mt-5'>
            <label  className='font-bold text-lg'>Image (optional):</label>
            <input type="file" className='file-input w-full max-w-xs mt-5' onChange={handleFileChange} />
          </div>
          
          <div className='flex flex-row justify-end'>
            <ButtonPrimary text="Create Article" className="btn btn-primary mt-5" type="submit"/>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateArticle;
