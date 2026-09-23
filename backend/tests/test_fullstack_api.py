import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"

def test_workspace_project_task_flow():
    # 1. Create Workspace
    ws_res = client.post("/api/v1/workspaces", json={"name": "Acme SaaS", "slug": "acme-saas"})
    assert ws_res.status_code == 200
    ws_id = ws_res.json()["id"]

    # 2. Create Project
    proj_res = client.post("/api/v1/projects", json={
        "name": "Mobile Redesign",
        "description": "Redesign iOS/Android apps",
        "workspace_id": ws_id
    })
    assert proj_res.status_code == 200
    proj_id = proj_res.json()["id"]

    # 3. Create Task
    task_res = client.post("/api/v1/tasks", json={
        "title": "Setup OAuth2 Flow",
        "status": "TODO",
        "project_id": proj_id
    })
    assert task_res.status_code == 200
    task_id = task_res.json()["id"]

    # 4. Update Task Status
    up_res = client.patch(f"/api/v1/tasks/{task_id}", json={"status": "IN_PROGRESS"})
    assert up_res.status_code == 200
    assert up_res.json()["status"] == "IN_PROGRESS"
