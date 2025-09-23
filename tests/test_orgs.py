import pytest
from httpx import AsyncClient

from api.core.config import settings

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
    """Test creating a new org."""
    # First create an organization
    org_response = await async_client.post(
        "/orgs",
        json={"org_name": "test-org"},
        headers={"X-API-Key": settings.SECRET_KEY},
    )
    assert org_response.status_code == 201
    org_data = org_response.json()
    assert org_data["org_name"] == "test-org"
    assert type(org_data["members"]) == list
    assert len(org_data["members"]) == 0
    assert "id" in org_data
