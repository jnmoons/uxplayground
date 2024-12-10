import React, { useState } from 'react';
import {
  Container,
  Table,
  Select,
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
import { clientsData } from './clientsData';

const ClientListView = () => {
  // State management
  const [search, setSearch] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [minRegistrations, setMinRegistrations] = useState<number | undefined>(undefined);
  const [maxRegistrations, setMaxRegistrations] = useState<number | undefined>(undefined);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  // Pagination settings
  const itemsPerPage = 10;
  const totalPages = Math.ceil(clientsData.length / itemsPerPage);

  // Filtering and Pagination
  const filteredClients = clientsData.filter((client) => {
    const matchesSearch =
      search === '' ||
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.vatCode.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = country === '' || client.address.toLowerCase().includes(country.toLowerCase());
    const matchesRegistrations =
      (minRegistrations === undefined || client.registrations >= minRegistrations) &&
      (maxRegistrations === undefined || client.registrations <= maxRegistrations);

    return matchesSearch && matchesCountry && matchesRegistrations;
  });

  const paginatedClients = filteredClients.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handlers
  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  const isRowSelected = (id: number) => selectedRows.includes(id);

  return (
    <div>      
      <Box mb="lg">
        {/* Filters */}
        <Group grow>
          <TextInput
            placeholder="Search by Company Name or VAT Code"
            leftSection={<Search size={16} />}
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
          <Select
            placeholder="Country"
            data={['Belgium', 'Netherlands', 'France', 'Germany']}
            value={country}
            onChange={(value) => setCountry(value || '')}
          />
        </Group>

        <Group grow mt="sm">
          <TextInput
            placeholder="Min Registrations"
            value={minRegistrations?.toString()}
            onChange={(event) =>
              setMinRegistrations(event.currentTarget.value ? parseInt(event.currentTarget.value) : undefined)
            }
          />
          <TextInput
            placeholder="Max Registrations"
            value={maxRegistrations?.toString()}
            onChange={(event) =>
              setMaxRegistrations(event.currentTarget.value ? parseInt(event.currentTarget.value) : undefined)
            }
          />
        </Group>

        <Button mt="sm">Search</Button>
      </Box>

      {/* Table */}
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={selectedRows.length === paginatedClients.length}
                onChange={(event) =>
                  setSelectedRows(
                    event.currentTarget.checked
                      ? paginatedClients.map((client) => client.id)
                      : []
                  )
                }
              />
            </th>
            <th>Company Name</th>
            <th>VAT Code</th>
            <th>Address</th>
            <th>Email</th>
            <th>Registrations</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClients.map((client) => (
            <tr key={client.id}>
              <td>
                <Checkbox
                  checked={isRowSelected(client.id)}
                  onChange={() => handleRowSelect(client.id)}
                />
              </td>
              <td>{client.name}</td>
              <td>{client.vatCode}</td>
              <td>{client.address}</td>
              <td>{client.email}</td>
              <td>{client.registrations}</td>
              <td>
                <Group>
                  <ActionIcon color="blue" variant="light">
                    <Eye size={16} />
                  </ActionIcon>
                  <Link href={`/clients/edit/${client.id}`} passHref legacyBehavior>
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

      {/* Pagination */}
      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        mt="lg"
      />
    </div>      
  );
};

export default ClientListView;
