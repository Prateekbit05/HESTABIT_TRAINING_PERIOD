'use client';

import { useState } from 'react';
import Link from 'next/link';

/* 🔹 Integrated users data (from simple version) */
const users = [
  { name: 'John Doe', email: 'john@example.com', role: 'User' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { name: 'Michael Scott', email: 'michael@example.com', role: 'Admin' },
  { name: 'Pam Beesly', email: 'pam@example.com', role: 'User' },
  { name: 'Dwight Schrute', email: 'dwight@example.com', role: 'Manager' },
];

/* 🔹 Normalize data for advanced table */
const mockUsers = users.map((user, index) => ({
  id: index + 1,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: '18/10/2024 05:27',
  updatedAt: '18/10/2024 05:27',
}));

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + perPage
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-slate-600">
        <Link href="/dashboard" className="hover:text-slate-900">
          Users
        </Link>
        <span>›</span>
        <span className="text-slate-900">List</span>
      </nav>

      {/* Page Header */}
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Users</h1>

      {/* Card */}
      <div className="rounded-lg bg-white shadow-sm">
        {/* Search */}
        <div className="border-b border-slate-200 p-4 sm:p-6">
          <div className="flex justify-end">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <svg
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-700">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-700">
                  Created at
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-700">
                  Updated at
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {user.updatedAt}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg bg-purple-100 p-2 text-purple-600 hover:bg-purple-200">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-4 border-t border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="text-sm text-slate-600">
            Showing {startIndex + 1} to{' '}
            {Math.min(startIndex + perPage, filteredUsers.length)} of{' '}
            {filteredUsers.length} results
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Per page</span>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// Users page: Next.js users listing page with mocked data table and responsive TailwindCSS layout
