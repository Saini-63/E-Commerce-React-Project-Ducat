import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryStart, updateCategoryStart } from '../../../redux/actions/category.action';

// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from '../../../firebase-config';
import { useFormData } from '../../../hooks/useFormData';

let initialState = {
  name: '',
  image: '',
  status: 0
}
export default function AddOrEditCategory() {
  let { id } = useParams();

  const categories = useSelector(state => state.category.categories)
  // const [formData, setFormData] = useState(initialState);
  // const [imageLoading, setImageLoading] = useState(false);

  const [formData, imageLoading, setFormData, inputChange, uploadFiles] = useFormData(initialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { name, status, image } = formData;

  // const inputChange = (event) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [event.target.name]: event.target.value,
  //   }))
  // }

  const submit = (event) => {
    event.preventDefault();
    if (id) {
      dispatch(updateCategoryStart(formData));
    } else {
      dispatch(addCategoryStart(formData));
    }

    setTimeout(() => {
      navigate('/admin/category');
    }, 1000);
  }

  const getCategoryById = () => {
    let category = categories.find((category) => category.id === id);

    if (category) {
      setFormData(category);
    }
    else {
      navigate('/admin/category');
    }

  }

  useEffect(() => {
    if (id) {
      getCategoryById();
    }
  }, [id])

  // const uploadFiles = (event) => {
  //   //console.log(event.target.files[0]);
  //   // const storage = getStorage();
  //   const storageRef = ref(storage, 'category/' + event.target.files[0].name);

  //   const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);

  //   // Register three observers:
  //   // 1. 'state_changed' observer, called any time the state changes
  //   // 2. Error observer, called on failure
  //   // 3. Completion observer, called on successful completion
  //   uploadTask.on('state_changed',
  //     (snapshot) => {
  //       // Observe state change events such as progress, pause, and resume
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log('Upload is ' + progress + '% done');
  //       setImageLoading(true);
  //       switch (snapshot.state) {
  //         case 'paused':
  //           console.log('Upload is paused');
  //           break;
  //         case 'running':
  //           console.log('Upload is running');
  //           break;
  //       }
  //     },
  //     (error) => {
  //       // Handle unsuccessful uploads
  //     },
  //     () => {
  //       // Handle successful uploads on complete
  //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         //console.log('File available at', downloadURL);
  //         setImageLoading(false);
  //         setFormData((prevValue) => ({
  //           ...prevValue,
  //           image: downloadURL,
  //         }))
  //       });
  //     }
  //   );
  // }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">{id ? 'Edit' : 'Add'} Category</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">{id ? 'Edit' : 'Add'}Category</li>
        </ol>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-sm-3">
            <Sidebar />
          </div>
          <div className="col-sm-9">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4 className='fw-bold'>Add Category</h4>
                <Link to="/admin/category" className='btn btn-primary text-white button'>Back</Link>
              </div>
              <div className="card-body">
                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Category Name</label>
                    <input type="text" className="form-control" id="name"
                      placeholder="category name"
                      name='name'
                      value={name}
                      onChange={inputChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Category Image</label>
                    <input type="file" className="form-control" id="image" onChange={uploadFiles} />
                    {
                      image && <div className='mt-4'>
                        <img src={image} alt='Not in database of firebase' style={{ height: "50px" }} />
                      </div>
                    }
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">Category Status</label>
                    <select id='status'
                      className='form-control'
                      name='status'
                      value={status}
                      onChange={inputChange}>
                      <option value='' hidden>Select Status</option>
                      <option value='0'>Inactive</option>
                      <option value='1'>Active</option>
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 d-grid">
                      <button type='submit' className='btn btn-primary text-white' disabled={imageLoading}>Submit</button>
                    </div>
                    <div className="col-sm-6 d-grid">
                      <button type='reset' className='btn btn-warning text-white'>Reset</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
