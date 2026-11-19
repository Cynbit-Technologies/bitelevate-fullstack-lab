
'use client';

import React, { useState, type FormEvent } from 'react';

interface CreateProjectModalProps {
  onClose: () => void;
  onProjectCreated: () => void;
}

const CreateProjectModal = ({
  onClose,
  onProjectCreated
}: CreateProjectModalProps) => {

  const [projectname, setprojectname] = useState<string>("");
  const [clientname, setclientname] = useState<string>("");

  const handleprojectsubmission = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {

    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/v1/projects", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectname,
          client_name: clientname,
          workspace_id: "83192aeb-67e9-40ce-9fb8-d822c6518d9b"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const data = await response.json();

      console.log("Project created:", data);

      setprojectname("");
      setclientname("");

      onProjectCreated();
      onClose();

    } catch (error) {
      console.log("Error creating project:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl bg-slate-900 p-6 shadow-xl">

        <h2 className="mb-5 text-xl font-semibold text-white">
          Create New Project
        </h2>

        <form onSubmit={handleprojectsubmission}>

          <div className="mb-4">
            <label htmlFor="projectname" className="mb-2 block text-sm text-white">
              Project Name
            </label>

            <input
              type="text"
              id="projectname"
              value={projectname}
              onChange={(e) => setprojectname(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="clientname" className="mb-2 block text-sm text-white">
              Client Name
            </label>

            <input
              type="text"
              id="clientname"
              value={clientname}
              onChange={(e) => setclientname(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-slate-700 px-4 py-2 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-4 py-2 text-white"
            >
              Save Project
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
