import React, { useState } from 'react';
import {
    Container,
    TextInput,
    Select,
    NumberInput,
    Textarea,
    Button,
    Group,
    Box,
} from '@mantine/core';
import { useRouter } from 'next/router';

// Define the Course type
type Course = {
    id: number;
    name: string;
    code: string;
    category: string;
    status: string;
    duration: number;
    price: number;
    sessionsCount: number;
    description?: string;
};

interface CourseEditFormProps {
    course: Course;
}

const CourseEditForm: React.FC<CourseEditFormProps> = ({ course }) => {
    const [name, setName] = useState(course.name || '');
    const [code, setCode] = useState(course.code || '');
    const [category, setCategory] = useState(course.category || '');
    const [status, setStatus] = useState(course.status || 'Active');
    const [duration, setDuration] = useState<number | undefined>(course.duration || undefined);
    const [price, setPrice] = useState<number | undefined>(course.price || undefined);
    const [sessionsCount, setSessionsCount] = useState<number | undefined>(
        course.sessionsCount || undefined
    );
    const [description, setDescription] = useState(course.description || '');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedCourse: Course = {
            ...course,
            name,
            code,
            category,
            status,
            duration: duration || 0,
            price: price || 0,
            sessionsCount: sessionsCount || 0,
            description,
        };

        console.log('Updated Course:', updatedCourse);
        alert('Course updated successfully!');
        router.push('/'); // Redirect to the course list view
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Box mb="lg">
                    <TextInput
                        label="Course Name"
                        placeholder="Enter course name"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        required
                    />
                    <TextInput
                        label="Course Code"
                        placeholder="Enter course code"
                        value={code}
                        onChange={(e) => setCode(e.currentTarget.value)}
                        required
                        mt="sm"
                    />
                    <Select
                        label="Category"
                        placeholder="Select category"
                        data={['Psychology', 'Mathematics', 'Science', 'Arts']}
                        value={category}
                        onChange={(value) => setCategory(value || '')}
                        required
                        mt="sm"
                    />
                    <Select
                        label="Status"
                        placeholder="Select status"
                        data={['Active', 'Inactive']}
                        value={status}
                        onChange={(value) => setStatus(value || '')}
                        required
                        mt="sm"
                    />
                    <NumberInput
                        label="Duration (hours)"
                        placeholder="Enter duration in hours"
                        value={duration}
                        onChange={(value) => setDuration(typeof value === 'number' ? value : undefined)}
                        required
                        mt="sm"
                    />
                    <NumberInput
                        label="Price ($)"
                        placeholder="Enter price"
                        value={price}
                        onChange={(value) => setPrice(typeof value === 'number' ? value : undefined)}
                        required
                        mt="sm"
                    />
                    <NumberInput
                        label="Sessions Count"
                        placeholder="Enter number of sessions"
                        value={sessionsCount}
                        onChange={(value) => setSessionsCount(typeof value === 'number' ? value : undefined)}
                        required
                        mt="sm"
                    />
                    <Textarea
                        label="Description"
                        placeholder="Enter course description"
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        autosize
                        minRows={3}
                        mt="sm"
                    />
                    <Group mt="lg">
                        <Button type="submit">Save Changes</Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push('/')} // Navigate back to course list
                        >
                            Cancel
                        </Button>
                    </Group>
                </Box>
            </form>
        </Container>
    );
};

export default CourseEditForm;
