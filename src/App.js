import { useState } from "react";

const App = () => {

  const [image, setImage] = useState(null)
  const [value, setValue] = useState("")
  const [response,setResponse] = useState("")
  const [error,setError] = useState("")

  const surpriseOptions = [
    'Does the image have a whale?',
    'Is the image fabulously pin?',
    'Does the image have puppies?'
  ]

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    console.log(randomValue)
    setValue(randomValue)
  }

  const uploadImage = async (e) => {
    //console.log(e.target.files)
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    setImage(e.target.files[0])
    e.target.value = null
    try {
      const options = {
        method: 'POST',
        body: formData
      }
      const response = await fetch('http://localhost:8000/upload', options)
      const data = response.json()
      console.log(data)
    } catch (err) {
      setError("Something didn't work please try again.");
    }
  }
  const analyzeImage = () => {
    if(!image){
      setError("Error! Must have an existing image!")
      return
    }
    try{

    }catch(err){
      console.log(err)
      setError("Something didn't work please try again.");
    }

  }
  const clear = () => {
    setImage(null)
    setValue("")
    setResponse("")
    setError("")
  }

  return (
    <div className="app">
      <section className="section-container">
        <div className="image-container">
          {image && <img src={URL.createObjectURL(image)} alt="images" />}
        </div>
      
      <p className="extra-info">
        <span>
          <label htmlFor="files">upload an image</label>
          <input onChange={uploadImage} id="files" accept="image/*" type="file" hidden />
        </span>
        To ask question about.
      </p>
      <p>
        What do you know about the image?
        <button className="surprise" onClick={surprise} disabled={response}>Surprise me</button>
      </p>
      <div className="input-container">
        <input 
        value={value}
        placeholder="What is in the image..."
        onChange = {e => setValue(e.target.value)}
        />
        {(!response && !error) && <button onClick={analyzeImage}>ASk me</button>}
        {(response && error) && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      {response && <p className="answer">{response}</p>}
      </section>
    </div>
  );
}

export default App;
