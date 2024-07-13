import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { cn } from '@/Untils/cn';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { PROJECT_STATUS, PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/contants';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import SecondaryButton from '@/Components/SecondaryButton';
import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';

export default function Index({
    auth,
    projects,
    queryParams = null
}) {
    queryParams = queryParams || {};
    const title = "Project";
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name];
        }

        router.get(route('project.index'), queryParams);
    }

    const clearFilter = () => {
        router.get(route('project.index'));
    }

    const onKeypress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    }

    const sortChange = (name) => {
        if(name === undefined) return ;
        if(name === queryParams.sort_field){
            queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc' ;
        }else{
            queryParams.sort_direction = 'asc';
            queryParams.sort_field = name;
        }
        router.get(route('project.index'), queryParams);
    }

    const optionStatus = PROJECT_STATUS.map(status => <option key={status} value={status}>{PROJECT_STATUS_TEXT_MAP[status]}</option>);

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

            th: "created date",
            field_name: 'created_at'
        },
        {

            th: "due date",
            field_name: 'due_date'
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


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{title}</h2>}
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
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
                                        <th className='px-3 py-3'></th>
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
                                                            { 'text-white' : queryParams.sort_field === field_name}
                                                            ])}>
                                                        {th.toUpperCase()}
                                                        {
                                                            queryParams.sort_field == field_name 
                                                            && queryParams.sort_direction !== 'asc'
                                                            ? <ChevronDownIcon className='w-4 inline-block' />
                                                            : <ChevronUpIcon  className='w-4 inline-block'/>
                                                        }
                                                    </th>
                                            )
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        projects.data.map(({
                                            id,
                                            image_path,
                                            name,
                                            status,
                                            created_at,
                                            due_date,
                                            createdBy
                                        }, i) => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                                                <td className='px-3 py-2'>{id}</td>
                                                <td className='px-3 py-2'>
                                                    <img src={image_path} alt="" className='w-20' />
                                                </td>
                                                <td className='px-3 py-2'>{name}</td>
                                                <td className='px-3 py-2'>
                                                    <span
                                                        className={cn(["px-3 py-1 rounded text-white", PROJECT_STATUS_CLASS_MAP[status]])}
                                                    >
                                                        {PROJECT_STATUS_TEXT_MAP[status]}
                                                    </span>
                                                </td>
                                                <td className='px-3 py-2'>{created_at}</td>
                                                <td className='px-3 py-2'>{due_date}</td>
                                                <td className='px-3 py-2'>{createdBy.name}</td>
                                                <td className='px-3 py-2'>
                                                    <Link href={route('project.edit', id)}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link href={route('project.destroy', id)}
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
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}