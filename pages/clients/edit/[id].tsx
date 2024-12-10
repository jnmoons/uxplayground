import { useRouter } from 'next/router';
import { clientsData } from '../../../components/clientsData';
import ClientEditForm from '../../../components/ClientEditForm';

const EditClientPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find the client by ID
  const client = clientsData.find((c) => c.id === Number(id));

  if (!client) {
    return <p>Client not found</p>;
  }

  return <ClientEditForm client={client} />;
};

export default EditClientPage;
