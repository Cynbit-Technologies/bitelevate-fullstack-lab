
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Kanban,
  FolderKanban,
  CheckCircle2,
  Clock,
  Plus,
} from 'lucide-react';

import CreateProjectModal from '@/components/CreateProjectModal';

interface Project {
  id: string;
  name: string;
  client_name: string;
  description: string | null;
  workspace_id: string;
  created_at: string;
}

const WORKSPACE_ID = "83192aeb-67e9-40ce-9fb8-d822c6518d9b";

export default function FullstackDashboard() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Implement JWT Auth Endpoint', status: 'DONE', project: 'Backend API' },
    { id: '2', title: 'Design Kanban Task Board UI', status: 'IN_PROGRESS', project: 'Frontend App' },
    { id: '3', title: 'Docker Compose Postgres Setup', status: 'TODO', project: 'DevOps & Infra' },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [apiStatus, setApiStatus] = useState<boolean | null>(null);

  // Project states
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch projects from backend
  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/projects?workspace_id=${WORKSPACE_ID}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data: Project[] = await response.json();
      setProjects(data);

    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, []);

  // Load projects when dashboard opens
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Check backend API status
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await fetch("http://localhost:8000/health");

        if (response.ok) {
          setApiStatus(true);
        } else {
          setApiStatus(false);
        }
      } catch (error) {
        setApiStatus(false);
      }
    };

    fetchuser();
  }, []);

  // Add task
  function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newTaskTitle.trim()) return;

    setTasks([
      ...tasks,
      {
        id: String(Date.now()),
        title: newTaskTitle,
        status: 'TODO',
        project: 'Frontend App'
      }
    ]);

    setNewTaskTitle('');
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-bold text-white">
            <Kanban className="w-5 h-5" />
          </div>

          <h1 className="font-bold text-slate-100 text-lg">
            SprintPulse SaaS
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-purple-950 text-purple-400 border border-purple-800 px-3 py-1 rounded-full font-medium">
            Acme Global Workspace
          </span>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">

        {/* Dashboard heading and Create Project button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">
              Project Tasks & Kanban Board
            </h2>

            <p className="text-sm text-slate-400">
              Fullstack integration connecting Next.js frontend to FastAPI backend.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-500"
          >
            <Plus className="w-4 h-4" />
            Create Project
          </button>
        </div>

        {/* Projects section */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

          <h3 className="mb-4 text-lg font-semibold text-white">
            Your Projects ({projects.length})
          </h3>

          {projects.length === 0 ? (
            <p className="text-sm text-slate-400">
              No projects found. Create your first project!
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-lg border border-slate-800 bg-slate-950 p-4"
                >
                  <h4 className="font-semibold text-white">
                    {project.name}
                  </h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Client: {project.client_name}
                  </p>
                </div>
              ))}

            </div>
          )}
        </div>

        {/* Add Task form */}
        <form
          onSubmit={addTask}
          className="flex gap-3 bg-slate-900 border border-slate-800 p-4 rounded-xl"
        >
          <input
            type="text"
            placeholder="Add new task title..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
          />

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </form>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* To Do */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
              <h3 className="font-semibold text-slate-300 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                To Do ({tasks.filter(t => t.status === 'TODO').length})
              </h3>
            </div>

            <div className="space-y-3">
              {tasks.filter(t => t.status === 'TODO').map(task => (
                <div key={task.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-sm text-slate-200">
                  <p className="font-medium">{task.title}</p>
                  <span className="text-xs text-slate-500 mt-1 block">{task.project}</span>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
              <h3 className="font-semibold text-slate-300 text-sm flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-blue-400" />
                In Progress ({tasks.filter(t => t.status === 'IN_PROGRESS').length})
              </h3>
            </div>

            <div className="space-y-3">
              {tasks.filter(t => t.status === 'IN_PROGRESS').map(task => (
                <div key={task.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-sm text-slate-200 border-l-4 border-l-blue-500">
                  <p className="font-medium">{task.title}</p>
                  <span className="text-xs text-slate-500 mt-1 block">{task.project}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Completed */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
              <h3 className="font-semibold text-slate-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Completed ({tasks.filter(t => t.status === 'DONE').length})
              </h3>
            </div>

            <div className="space-y-3">
              {tasks.filter(t => t.status === 'DONE').map(task => (
                <div key={task.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-sm text-slate-200 opacity-80">
                  <p className="font-medium line-through text-slate-400">{task.title}</p>
                  <span className="text-xs text-slate-500 mt-1 block">{task.project}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Create Project Modal */}
      {isModalOpen && (
        <CreateProjectModal
          onClose={() => setIsModalOpen(false)}
          onProjectCreated={fetchProjects}
        />
      )}

      {/* API Status Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 px-6 py-3 flex justify-end">
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 600,
            backgroundColor: apiStatus === true ? '#052e16' : apiStatus === false ? '#450a0a' : '#1e293b',
            color: apiStatus === true ? '#4ade80' : apiStatus === false ? '#f87171' : '#cbd5e1',
            border: `1px solid ${apiStatus === true ? '#166534' : apiStatus === false ? '#991b1b' : '#475569'}`,
          }}
        >
          <span>●</span>

          {apiStatus === null
            ? 'Checking API...'
            : apiStatus
              ? 'API Connected'
              : 'API Disconnected'}
        </span>
      </footer>

    </div>
  );
}
