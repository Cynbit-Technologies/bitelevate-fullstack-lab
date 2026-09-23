from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from app.models import TaskStatus

class WorkspaceCreate(BaseModel):
    name: str
    slug: str

class WorkspaceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    slug: str
    created_at: datetime

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    workspace_id: str

class ProjectResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    description: Optional[str]
    workspace_id: str
    created_at: datetime

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.TODO
    project_id: str

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None

class TaskResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    title: str
    description: Optional[str]
    status: TaskStatus
    project_id: str
    created_at: datetime
