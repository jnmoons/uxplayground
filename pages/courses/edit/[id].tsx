import { useRouter } from 'next/router';
import { coursesData } from '../../../components/coursesData';
import CourseEditForm from '../../../components/CourseEditForm';

const EditCoursePage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find the course by ID
  const course = coursesData.find((c) => c.id === Number(id));

  if (!course) {
    return <p>Course not found</p>;
  }

  return <CourseEditForm course={course} />;
};

export default EditCoursePage;
