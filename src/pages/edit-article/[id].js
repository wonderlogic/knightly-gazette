import ButtonPrimary from '@/app/components/ButtonPrimary';
import ButtonSecondary from '@/app/components/ButtonSecondary';
import Navbar from '@/app/components/Navbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'src/app/globals.css';

const EditArticle = () => {
  const [article, setArticle] = useState([]); // State to store the article data

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [articleImage, setArticleImage] = useState(null);

  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const router = useRouter(); // Using the useRouter hook from Next.js
  const { id } = router.query; // Extracting id from the router's query parameters

  // useEffect hook to fetch article data when the component mounts or id changes
  useEffect(() => {
    // Asynchronous function to load the article based on its ID
    async function loadArticle() {
        if (id) { // Checking if the ID is available
            const response = await fetch('/api/articles/' + id);
            const data = await response.json();
            setArticle(data);
            setTitle(data.title); // Set the initial title
            setDescription(data.description); // Set the initial description
            setBody(data.body); // Set the initial body
        }
    }

    loadArticle();
  }, [id]); // Adding id as a dependency to re-run the effect when id changes

  useEffect(() => {
    // Load the current image of the article
    if (article.imageURL) {
      setArticleImage(article.imageURL);
    }
  }, [article]); // Add article to the dependency array

  useEffect(() => {
    // Load the current image of the article
    if (article.imageURL) {
      setArticleImage(article.imageURL);
      setPreviousImage(article.imageURL); // Set the previous image as well
    }
  }, [article]); // Add article to the dependency array

  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();

    const formData = new FormData();

    formData.append('imageRemoved', imageRemoved);

    if (image) { // New image is chosen for upload
      formData.append('image', image);
    }

    // Append article data to the formData
    formData.append('title', title);
    formData.append('description', description);
    formData.append('body', body);

    try {
      // Send the article data to your server
      const response = await fetch(`/api/articles/edit/${id}`, {
        method: 'PUT',
        body: formData
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      // Show success toast
      setToastMessage('Article edited successfully!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      const theArticleId = responseData.id; 
      
      // setTimeout to delay the redirection, allowing the toast to be visible
      setTimeout(() => {
        router.push(`/article/${theArticleId}`);
      }, 3000);

    } catch (error) {
      setIsSubmitting(false);
      console.error('Error editing article:', error);
      // Show error toast
      setToastMessage(error.message || 'Error editing article.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Function to handle the deletion of the article
  const handleDelete = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();

    // Show confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");

    // Proceed only if the user confirms
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/articles/delete/${id}`, {
          method: 'DELETE',
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error);
        }

        setToastMessage('Article deleted successfully!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

        // setTimeout to delay the redirection, allowing the toast to be visible
        setTimeout(() => {
          router.push('/');
        }, 3000);

      } catch (error) {
        setIsSubmitting(false);
        console.error('Error deleting article:', error);
        // Show error toast
        setToastMessage(error.message || 'Error deleting article.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    // Function to reset file input
    const resetFileInput = () => {
      event.target.value = null; // This clears the selected file
      setImage(null);
      setImagePreviewUrl(null); // Clear the image preview URL
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
  
    // If file is valid, update the image state and set image preview URL
    setImage(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setPreviousImage(articleImage);
    setArticleImage(null);
    setImageRemoved(true);
    setImage(null);
    setImagePreviewUrl(null);
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleRemoveImageWithoutPrev = () => {
    setArticleImage(null);
    setImage(null);
    setImagePreviewUrl(null);
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleUndoRemoveImage = () => {
    setArticleImage(previousImage); // Restore the previous image
    setImageRemoved(false); // Reset the imageRemoved state
    setImage(null);
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  function handleKeyDown(e) {
    if (e.keyCode === 13) { // 13 is the Enter key
        e.preventDefault();
    }
  }
  
  return (
    <>
      {showToast && (
        <div className="fixed top-5 right-5 bg-blue-500 text-white p-3 rounded z-20">
          {toastMessage}
        </div>
      )}
      <div className="w-7/12 mx-auto">


        <div className='w-full'>
          <Navbar/>
        </div>
        
        <div className='px-4 sm:px-6 lg:px-8'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col '>
              <label htmlFor="title" className='font-bold text-lg'>Title:</label>
              <input id="title" placeholder="Type here" className="input input-bordered input-md w-full" type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength="80" required/>
            </div>
            <div className='flex flex-col mt-5'>
              <label htmlFor="description" className='font-bold text-lg'>Description:</label>
              <textarea id="description" placeholder="Short description" className="textarea textarea-bordered textarea-sm w-full" value={description} onChange={(e) => setDescription(e.target.value)} onKeyDown={handleKeyDown} maxLength="200"  required/>
            </div>
            <div className='flex flex-col mt-5'>
              <label htmlFor="body" className='font-bold text-lg'>Body:</label>
              <textarea id="body" placeholder="Body of the article" className="textarea textarea-bordered textarea-lg h-96 w-full" value={body} onChange={(e) => setBody(e.target.value)} required/>
            </div>
            {/* Conditional rendering based on articleImage */}
            {articleImage ? (
              <div className='flex flex-col mt-5'>
                <label className='font-bold text-lg'>Current image:</label>
                <figure>
                  <img
                    src={'/' + article.imageURL}
                    alt={article.title}
                    className="mt-3 max-w-xs max-h-64"
                  />
                  <button type="button" onClick={handleRemoveImage} className="btn btn-error text-white mt-2">
                    Remove Image
                  </button>
                </figure>
              </div>
            ) : (
              <div className='flex flex-col mt-5'>
                {previousImage && articleImage !== previousImage && (
                  <div className="flex gap-2">
                    <button onClick={handleUndoRemoveImage} className="btn btn-secondary text-white mt-2">
                      Undo - retain the image
                    </button>
                    <br />
                    <br />
                    <br />
                  </div>
                )}
                <label className='font-bold text-lg'>Image (optional):</label>
                {imagePreviewUrl && <img src={imagePreviewUrl} alt="Image preview" className="mt-3 max-w-xs max-h-64" />}
                <div className="flex gap-2  mt-5">
                  <input id="fileInput" type="file" className='file-input w-full max-w-xs' onChange={handleFileChange} />
                  {image && (
                    <button onClick={handleRemoveImageWithoutPrev} className="btn btn-error text-white">
                      Remove Image
                    </button>
                  )}
                </div>
              </div>
            )}
            <br />
            <div className='flex flex-row justify-between'>
              <ButtonPrimary text="Edit Article" className={`btn btn-primary mt-5 ${isSubmitting ? 'loading' : ''}`} type="submit" disabled={isSubmitting}/>
              <ButtonSecondary text="Delete article" className={`btn btn-error mt-5 ${isSubmitting ? 'loading' : ''}`} onClick={handleDelete}/>
            </div>
          </form>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default EditArticle