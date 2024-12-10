import React, { useState } from 'react';
import { Container, TextInput, MultiSelect, Button, Group, Box, Text } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useRouter } from 'next/router';

type Teacher = {
  id: number;
  name: string;
  email: string;
  expertise: string[];
};

interface TeacherEditFormProps {
  teacher: Teacher;
}

const TeacherEditForm: React.FC<TeacherEditFormProps> = ({ teacher }) => {
  const [name, setName] = useState(teacher.name || '');
  const [email, setEmail] = useState(teacher.email || '');
  const [expertise, setExpertise] = useState<string[]>(teacher.expertise || []);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTeacher: Teacher = {
      ...teacher,
      name,
      email,
      expertise
    };

    console.log('Updated Teacher:', updatedTeacher);
    alert('Teacher updated successfully!');
    router.push('/teachers');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Box mb="lg">
          <TextInput
            label="Name"
            placeholder="Enter teacher name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
          <TextInput
            label="Email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
            mt="sm"
          />
          <MultiSelect
            label="Expertise"
            placeholder="Select expertise"
            data={['Leadership', 'Communication', 'Business Analysis', 'Agile', 'Scrum']}
            value={expertise}
            onChange={setExpertise}
            required
            mt="sm"
          />
          <Group mt="lg">
            <Button type="submit">Save Changes</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/teachers')}
            >
              Cancel
            </Button>
          </Group>
        </Box>
      </form>
    </Container>
  );
};

export default TeacherEditForm;
