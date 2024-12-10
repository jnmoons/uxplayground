import { useRouter } from 'next/router';
import { teachersData } from '../../../components/teachersData';
import TeacherEditForm from '../../../components/TeacherEditForm';

const EditTeacherPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p>Loading...</p>;
  }

  // Find the teacher by ID
  const teacher = teachersData.find((t) => t.id === Number(id));

  if (!teacher) {
    return <p>Teacher not found</p>;
  }

  return <TeacherEditForm teacher={teacher} />;
};

export default EditTeacherPage;
