import React, { useState } from 'react';
import {
  Container,
  Table,
  TextInput,
  Button,
  Pagination,
  Checkbox,
  Group,
  Box,
  ActionIcon,
} from '@mantine/core';
import { Search, Pencil, Trash, Eye } from 'tabler-icons-react';
import Link from 'next/link';
import { teachersData } from './teachersData';

const TeacherListView = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  // Pagination settings
  const itemsPerPage = 10;
  const totalPages = Math.ceil(teachersData.length / itemsPerPage);
  const paginatedTeachers = teachersData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  const isRowSelected = (id: number) => selectedRows.includes(id);

  return (
    <div>
      <Box mb="lg">
        <Group grow>
          <TextInput
            placeholder="Search by Name or Email"
            leftSection={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </Group>
        <Button mt="sm">Search</Button>
      </Box>

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={selectedRows.length === paginatedTeachers.length}
                onChange={(e) =>
                  setSelectedRows(
                    e.currentTarget.checked
                      ? paginatedTeachers.map((teacher) => teacher.id)
                      : []
                  )
                }
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Expertise</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTeachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>
                <Checkbox
                  checked={isRowSelected(teacher.id)}
                  onChange={() => handleRowSelect(teacher.id)}
                />
              </td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.expertise.join(', ')}</td>
              <td>
                <Group>
                  <ActionIcon color="blue" variant="light">
                    <Eye size={16} />
                  </ActionIcon>
                  <Link href={`/teachers/edit/${teacher.id}`} passHref legacyBehavior>
                    <ActionIcon color="green" variant="light">
                      <Pencil size={16} />
                    </ActionIcon>
                  </Link>
                  <ActionIcon color="red" variant="light">
                    <Trash size={16} />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        mt="lg"
      />
    </div>
  );
};

export default TeacherListView;
