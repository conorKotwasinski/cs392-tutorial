import { useNavigate, useParams } from 'react-router-dom';

const CourseForm = ({ courses }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  console.log("courseId", courseId);

  const decodeCourseId = (id) => {
    const parts = id.split('-');
    const title = `${parts[0]}-${parts[1]}`; 
    const meets = parts.slice(2).join(' ').replace(/-/g, ' '); 
    return { title, meets };
  };

  const { title, meets } = decodeCourseId(courseId);

  const cancelForm = () => {
    navigate('/');  
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Course Title</label>
        <input type="text" className="form-control" id="title" defaultValue={title} />
      </div>
      <div className="mb-3">
        <label htmlFor="meets" className="form-label">Meeting Times</label>
        <input type="text" className="form-control" id="meets" defaultValue={meets} />
      </div>
      <button type="button" className="btn btn-secondary" onClick={cancelForm}>Cancel</button>
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default CourseForm;
