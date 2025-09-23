import pytest
from typing import Any
from httpx import AsyncClient

# @router.post(
#     "",
#     response_model=Organization.Response,
#     status_code=status.HTTP_201_CREATED,
#     dependencies=[Depends(verify_api_key)],
# )
# async def create_org(
#     new_org: Organization.Create,
#     org_service: OrganizationService = Depends(get_org_service),
# ):
#     """Create a new organization."""
#     org = await org_service.create(new_org)
#     return org

@pytest.mark.asyncio
async def test_create_org(async_client: AsyncClient):
    """Test creating a new patient case."""
    # First create an organization
    org_response = await async_client.post("/orgs/", json={"org_name": "test-org"})
    assert org_response.status_code == 201
    org_data = org_response.json()

    # Create the case
    response = await async_client.post(
        f"/orgs/{org_data['id']}/cases/", json=sample_case_payload
    )
    assert response.status_code == 201

    data = response.json()
    assert data["patient_name"] == sample_case_payload["patient_name"]
    assert data["location"] == sample_case_payload["location"]
    assert data["status"] == Status.PENDING.value
    assert "id" in data