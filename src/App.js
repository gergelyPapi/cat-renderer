import React, { useState } from 'react';
import ImageWithLoader from './components/ImageWithLoader';

const App = () => {
  const baseCatUrl = 'https://cataas.com/cat/gif';

  const [formData, setFormData] = useState({
    type: '',
    filter: '',
    width: '',
    height: '',
  });
  const [imageUrl, setimageUrl] = useState('https://cataas.com/cat/gif/says/Hello?filter=mono&fontColor=orange&fontSize=20&type=square');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    console.log(value)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setimageUrl(createUrl(formData))
    setFormData({
      type: '',
      filter: '',
      width: '',
      height: '',
    });
  };

  const createUrl = (formDataObject) => {
    console.log(formDataObject);
    let catUrl = `${baseCatUrl}`
    let urlExtended = false;
    Object.keys(formDataObject).forEach((key, index) => {
      const obectValue = formDataObject[key];
      if(obectValue.length > 0) {
        catUrl += `${!urlExtended ? '?' : '&'}${key}=${formDataObject[key]}`;
        urlExtended = true;
      }
    })
    return catUrl;
  }

  return (
    <div className='container'>
      <div className = "form-box">
        <h5 className = "form-step"> Select options for your cat to appear </h5>
        <form onSubmit = {handleSubmit}>
          <div className = "field1">
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="">Select type</option>
              <option value="xsmall">Extra small</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>  
              <option value="square">Square</option>
            </select>
            <select
              id="filter"
              name="filter"
              value={formData.filter}
              onChange={handleInputChange}
            >
              <option value="">Select filter</option>
              <option value="mono">Mono</option>
              <option value="negate">Negative</option>
              <option value="custom">Custom</option>
            </select>
            <input
              type ="text" 
              className = "form-input"
              name ="width" 
              placeholder="width"
            />
            <input
              type ="text" 
              className = "form-input"
              name ="height" 
              placeholder="height"
            />
          </div>
        <button className = "submitBtn" type = "submit">Submit</button>
        </form>
      </div>
      <div className="image-container">
        <ImageWithLoader imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default App;
