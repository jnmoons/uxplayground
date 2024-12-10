import React, { useState } from 'react';
import {
    Container,
    Table,
    Select,
    NumberInput,
    Button,
    Pagination,
    Checkbox,
    Group,
    Box,
    ActionIcon,
    Input,
} from '@mantine/core';
import { Search, Pencil, Trash, Eye } from 'tabler-icons-react';
import { coursesData } from './coursesData';
import Link from 'next/link';

const CourseListView = () => {
    // State management
    const [search, setSearch] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [minDuration, setMinDuration] = useState<number | undefined>(undefined);
    const [maxDuration, setMaxDuration] = useState<number | undefined>(undefined);
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [page, setPage] = useState(1);

    // Pagination settings
    const itemsPerPage = 10;
    const totalPages = Math.ceil(coursesData.length / itemsPerPage);
    const paginatedCourses = coursesData.slice(
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
                <Group grow>
                    <Input
                        placeholder="Search by Course Name or Code"
                        leftSection={<Search size={16} />}
                        value={search}
                        onChange={(event) => setSearch(event.currentTarget.value)}
                    />
                    <Select
                        placeholder="Category"
                        data={['Psychology', 'Mathematics', 'Science', 'Arts']}
                        value={category}
                        onChange={(value) => setCategory(value || '')}
                    />
                    <Select
                        placeholder="Status"
                        data={['Active', 'Inactive']}
                        value={status}
                        onChange={(value) => setStatus(value || '')}
                    />
                </Group>

                <Group grow mt="sm">
                    <NumberInput
                        placeholder="Min Duration (hours)"
                        value={minDuration}
                        onChange={(value) => setMinDuration(typeof value === 'number' ? value : undefined)}
                    />
                    <NumberInput
                        placeholder="Max Duration (hours)"
                        value={maxDuration}
                        onChange={(value) => setMaxDuration(typeof value === 'number' ? value : undefined)}
                    />
                    <NumberInput
                        placeholder="Min Price ($)"
                        value={minPrice}
                        onChange={(value) => setMinPrice(typeof value === 'number' ? value : undefined)}
                    />
                    <NumberInput
                        placeholder="Max Price ($)"
                        value={maxPrice}
                        onChange={(value) => setMaxPrice(typeof value === 'number' ? value : undefined)}
                    />
                </Group>

                <Button mt="sm">Search</Button>
            </Box>

            <Table striped highlightOnHover>
                <thead>
                    <tr>
                        <th>
                            <Checkbox
                                checked={selectedRows.length === paginatedCourses.length}
                                onChange={(event) =>
                                    setSelectedRows(
                                        event.currentTarget.checked
                                            ? paginatedCourses.map((course) => course.id)
                                            : []
                                    )
                                }
                            />
                        </th>
                        <th>Course Name</th>
                        <th>Course Code</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Duration</th>
                        <th>Price</th>
                        <th>Sessions Count</th>
                        <th>Last Modified Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCourses.map((course) => (
                        <tr key={course.id}>
                            <td>
                                <Checkbox
                                    checked={isRowSelected(course.id)}
                                    onChange={() => handleRowSelect(course.id)}
                                />
                            </td>
                            <td>{course.name}</td>
                            <td>{course.code}</td>
                            <td>{course.category}</td>
                            <td>{course.status}</td>
                            <td>{course.duration}</td>
                            <td>${course.price}</td>
                            <td>{course.sessionsCount}</td>
                            <td>{course.lastModified}</td>
                            <td>
                                <Group>
                                    <ActionIcon color="blue" variant="light">
                                        <Eye size={16} />
                                    </ActionIcon>
                                    <Link href={`/courses/edit/${course.id}`} passHref legacyBehavior>
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

export default CourseListView;
