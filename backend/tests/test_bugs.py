
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_disappearing_task_bug():

    response = client.patch(
        "/api/v1/tasks/f69ec6b1-10bf-4fce-a9e8-620cb999b450",
        json={
            "status": "in_progress"
        }
    )

    print("Status Code:", response.status_code)
    print("Response:", response.json())

    # Expected correct behavior
    assert response.status_code == 200
    assert response.json()["status"] == "IN_PROGRESS"
