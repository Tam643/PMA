import SecondaryButton from '@/Components/SecondaryButton'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import { TASK_PRIORITY, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/contants'
import { cn } from '@/Untils/cn'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import { Link, router } from '@inertiajs/react'
import React from 'react'


const TASK_ROUTE = "task.index";

const tableHeads = [
    {
        th: "id",
        field_name: 'id'
    },
    {
        th: "image",
        field_name: 'iamge_path'
    },
    {
        th: "name",
        field_name: 'name'
    },
    {

        th: "status",
        field_name: 'status'
    },
    {

        th: "priority",
        field_name: 'priority'
    },
    {

        th: "project name",
        field_name: 'project'
    },
    {

        th: "created date",
        field_name: 'created_at'
    },
    {

        th: "creadted by",
        field_name: 'created_by'
    },
    {

        th: "actions",
        className: "text-right"
    },
];

const TaskTable = ({
    tasks,
    queryParams = null,
}) => {

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name];
        }

        router.get(route(TASK_ROUTE), queryParams);
    }

    const clearFilter = () => {
        router.get(route(TASK_ROUTE));
    }

    const onKeypress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    }

    const sortChange = (name) => {
        if (name === undefined) return;
        if (name === queryParams.sort_field) {
            queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
        } else {
            queryParams.sort_direction = 'asc';
            queryParams.sort_field = name;
        }
        router.get(route(TASK_ROUTE), queryParams);
    }

    
    const optionStatus = TASK_STATUS.map(status => <option key={status} value={status}>{TASK_STATUS_TEXT_MAP[status]}</option>);
    const optionPriority = TASK_PRIORITY.map(priority => <option key={priority} value={priority}>{TASK_PRIORITY_TEXT_MAP[priority]}</option>);

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                <tr className="text-nowrap">
                    <th className='px-3 py-3'></th>
                    <th className='px-3 py-3'></th>
                    <th className='px-3 py-3'>
                        <TextInput
                            defaultValue={queryParams.name}
                            className="w-full"
                            placeholder="Project Name"
                            onBlur={e => searchFieldChanged('name', e.target.value)}
                            onKeyPress={e => onKeypress('name', e)}
                        />
                    </th>
                    <th className='px-3 py-3'>
                        <SelectInput
                            defaultValue={queryParams.status}
                            className="w-full"
                            onChange={e => searchFieldChanged('status', e.target.value)}
                        >
                            <option value="">-Select Status-</option>
                            {optionStatus}
                        </SelectInput>
                    </th>
                    <th className='px-3 py-3'>
                        <SelectInput
                            defaultValue={queryParams.priority}
                            className="w-full"
                            onChange={e => searchFieldChanged('priority', e.target.value)}
                        >
                            <option value="">-Select Priority-</option>
                            {optionPriority}
                        </SelectInput>
                    </th>
                    <th className='px-3 py-3'></th>
                    <th className='px-3 py-3'>
                        <SecondaryButton
                            className='w-full'
                            onClick={() => clearFilter()}
                        >
                            Clear Fillter
                        </SecondaryButton>
                    </th>
                    <th className='px-3 py-3'></th>
                    <th className='px-3 py-3'></th>
                </tr>
                <tr className="text-nowrap">
                    {
                        tableHeads.map(
                            ({ th, className, field_name }, i) =>
                                <th
                                    key={i}
                                    onClick={() => sortChange(field_name)}
                                    className={cn([
                                        'px-3 py-3 cursor-pointer',
                                        className,
                                        { 'text-white': queryParams.sort_field === field_name }
                                    ])}>
                                    {th.toUpperCase()}
                                    {
                                        queryParams.sort_field == field_name
                                            && queryParams.sort_direction !== 'asc'
                                            ? <ChevronDownIcon className='w-4 inline-block' />
                                            : <ChevronUpIcon className='w-4 inline-block' />
                                    }
                                </th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    tasks.data.map((task, i) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                            <td className='px-3 py-2'>{task.id}</td>
                            <td className='px-3 py-2'>
                                <img src={task.image_path} alt="" className='w-20' />
                            </td>
                            <td className='px-3 py-2'>{task.name}</td>
                            <td className='px-3 py-2'>
                                <span
                                    className={cn(["px-3 py-1 rounded text-white text-nowrap", TASK_STATUS_CLASS_MAP[task.status]])}
                                >
                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                </span>
                            </td>
                            <td className='px-3 py-2'>
                                <span
                                    className={cn(["px-3 py-1 rounded text-white text-nowrap", TASK_PRIORITY_CLASS_MAP[task.priority]])}
                                >
                                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                </span>
                            </td>
                            <td className='px-3 py-2'>{task.project.name}</td>
                            <td className='px-3 py-2'>{task.created_at}</td>
                            <td className='px-3 py-2'>{task.createdBy.name}</td>
                            <td className='px-3 py-2'>
                                <Link href={route('task.edit', task.id)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                >
                                    Edit
                                </Link>
                                <Link href={route('task.destroy', task.id)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default TaskTable