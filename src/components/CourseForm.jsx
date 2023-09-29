import { useNavigate, useParams } from 'react-router-dom';
import { useFormData } from '../utilities/useFormData'; 
import { useDbUpdate } from '../utilities/firebase';

const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const undoGenerateCourseId = (courseId) => {
  // Split the courseId string at '-' to get parts
  const parts = courseId.split('-');

  // Validate if the parts contain at least the term, number, and one part of meets
  if (parts.length < 3) {
      throw new Error('Invalid courseId format');
  }

  // The term will always be the first part
  const term = parts[0];

  let meets = "";
  let number = "";

  // Check if the third part is a number
  if (!isNaN(parts[2])) {
    number = parts[1] + "-" + parts[2]
    meets = parts.slice(3).join(' ');
  } else {
    // The meets is everything after the term and number
    // So we need to rejoin parts from index 2 onwards with a space
    number = parts[1]
    meets = parts.slice(2).join(' ');
  }

  return {
      term: term,
      number: number,
      meets: meets
  };
}

const calculateDbCourseId = (courseId) => {
  // Split the courseId string at '-' to get parts
  const parts = courseId.split('-');

  // Validate if the parts contain at least the term, number, and one part of meets
  if (parts.length < 3) {
    throw new Error('Invalid courseId format');
  }

  // The term will always be the first part
  const term = parts[0];

  // The number will always be the second part
  const number = parts[1];

  // Db format is the first char of the term plus the number
  return term[0] + number;
}


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

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const CourseForm = ({ courses }) => {
  const { courseId } = useParams();
  const dbCourseId = calculateDbCourseId(courseId);
  
  let courseDetails = undoGenerateCourseId(courseId);
  
  let matchedCourse = null;
  for (let c of Object.values(courses)) {
    if (c.term === courseDetails.term && c.number === courseDetails.number) {
      matchedCourse = c;
      break;
    }
  }

  // Use matchedCourse in the subsequent code, but check if it's non-null first
  if (!matchedCourse) {
    // Handle the case when the course wasn't found in the courses object
    // This might be returning a default object, showing an error, etc.
    return <div>Course not found</div>;  // Example handling
  }

  const [update, result] = useDbUpdate(`/courses/${dbCourseId}`);

  const [state, change] = useFormData(validator, { title: matchedCourse.title, meets: matchedCourse.meets });
  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      update(state.values);
    }
  };

  return (
    <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
      <InputField name="title" text="Course Title" state={state} change={change} />
      <InputField name="meets" text="Meeting Times" state={state} change={change} />
      <ButtonBar message={result?.message} disabled={!!state.errors} />
    </form>
  );
};
export default CourseForm;
