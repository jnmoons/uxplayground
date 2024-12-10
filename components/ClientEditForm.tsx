import React, { useState } from 'react';
import {
  Container,
  TextInput,
  Button,
  Group,
  Box,
} from '@mantine/core';
import { useRouter } from 'next/router';

// Define the Client type
type Client = {
  id: number;
  name: string;
  vatCode: string;
  address: string;
  email: string;
  registrations: number;
};

interface ClientEditFormProps {
  client: Client;
}

const ClientEditForm: React.FC<ClientEditFormProps> = ({ client }) => {
  const [name, setName] = useState(client.name || '');
  const [vatCode, setVatCode] = useState(client.vatCode || '');
  const [address, setAddress] = useState(client.address || '');
  const [email, setEmail] = useState(client.email || '');
  const [registrations, setRegistrations] = useState<number | undefined>(
    client.registrations || undefined
  );

  // Error state
  const [vatError, setVatError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const router = useRouter();

  const validateVatCode = (value: string): boolean => {
    const vatRegex = /^BE\d{10}$/; // Belgian VAT code format
    return vatRegex.test(value);
  };

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (!validateVatCode(vatCode)) {
      setVatError('VAT code must follow the format "BE" followed by 10 digits.');
      isValid = false;
    } else {
      setVatError(null);
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!isValid) {
      return;
    }

    const updatedClient: Client = {
      ...client,
      name,
      vatCode,
      address,
      email,
      registrations: registrations || 0,
    };

    console.log('Updated Client:', updatedClient);
    alert('Client updated successfully!');
    router.push('/clients'); // Redirect to the client list view
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Box mb="lg">
          <TextInput
            label="Company Name"
            placeholder="Enter company name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <TextInput
            label="VAT Code"
            placeholder="Enter VAT code (e.g., BE0123456789)"
            value={vatCode}
            onChange={(e) => setVatCode(e.currentTarget.value)}
            error={vatError}
            required
            mt="sm"
          />
          <TextInput
            label="Address"
            placeholder="Enter full address"
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            required
            mt="sm"
          />
          <TextInput
            label="Email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            error={emailError}
            required
            mt="sm"
          />
          <TextInput
            label="Number of Registrations"
            placeholder="Enter number of registrations"
            value={registrations?.toString()}
            onChange={(e) =>
              setRegistrations(e.currentTarget.value ? parseInt(e.currentTarget.value) : undefined)
            }
            required
            mt="sm"
          />
          <Group mt="lg">
            <Button type="submit">Save Changes</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/clients')} // Navigate back to client list
            >
              Cancel
            </Button>
          </Group>
        </Box>
      </form>
    </Container>
  );
};

export default ClientEditForm;
