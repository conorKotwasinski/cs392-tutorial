import { useNavigate, useParams } from 'react-router-dom';
import { useFormData } from '../utilities/useFormData'; // Import the custom hook

const CourseForm = ({ courses }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const decodeCourseId = (id) => {
    const parts = id.split('-');
    const title = `${parts[0]}-${parts[1]}`;
    const meets = parts.slice(2).join(' ').replace(/-/g, ' ');
    return { title, meets };
  };

  const { title: initialTitle, meets: initialMeets } = decodeCourseId(courseId);

  const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

  const validator = (id, value) => {
    if (id === 'title' && value.length < 2) {
      return "Title must be at least two characters.";
    }
    if (id === 'meets' && value !== '' && !meetsPat.test(value)) {
      return "Must contain days and start-end, e.g., MWF 12:00-13:20.";
    }
    return '';
  };

  const [formData, handleChange] = useFormData(validator, { title: initialTitle, meets: initialMeets });

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
        <input
          type="text"
          className="form-control"
          id="title"
          value={formData.values.title || ''}
          onChange={handleChange}
        />
        {formData.errors && formData.errors.title && <div className="text-danger">{formData.errors.title}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="meets" className="form-label">Meeting Times</label>
        <input
          type="text"
          className="form-control"
          id="meets"
          value={formData.values.meets || ''}
          onChange={handleChange}
        />
        {formData.errors && formData.errors.meets && <div className="text-danger">{formData.errors.meets}</div>}
      </div>
      <button type="button" className="btn btn-secondary" onClick={cancelForm}>Cancel</button>
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default CourseForm;
