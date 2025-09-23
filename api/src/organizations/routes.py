from fastapi import APIRouter, Depends, status
from beanie import PydanticObjectId

from api.core.security import verify_api_key
from api.core.database import get_client
from api.src.organizations.service import OrganizationService
from api.src.organizations.types import Organization, OrganizationUser
from api.src.users.service import UserService

router = APIRouter(prefix="/orgs", tags=["orgs"])


def get_user_service() -> UserService:
    return UserService()


def get_org_service() -> OrganizationService:
    """Dependency to get organization service."""
    return OrganizationService()


@router.post(
    "",
    response_model=Organization.Response,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(verify_api_key)],
)
async def create_org(
    new_org: Organization.Create,
    org_service: OrganizationService = Depends(get_org_service),
):
    """Create a new organization."""
    org = await org_service.create(new_org)
    return org


@router.get(
    "",
    response_model=list[Organization.Response],
    dependencies=[Depends(verify_api_key)],
)
async def list_orgs(
    org_service: OrganizationService = Depends(get_org_service),
):
    orgs = await org_service.list_all()
    return orgs


@router.get(
    "/{org_id}",
    response_model=Organization.Response,
    dependencies=[Depends(verify_api_key)],
)
async def get_org_by_id(
    org_id: PydanticObjectId,
    org_service: OrganizationService = Depends(get_org_service),
):
    org = await org_service.read_by_id(org_id)
    return org


@router.post(
    "/{org_id}/users",
    response_model=Organization.Response,
    dependencies=[Depends(verify_api_key)],
)
async def add_member_to_org(
    org_id: PydanticObjectId,
    user_info: OrganizationUser.Create,
    org_service: OrganizationService = Depends(get_org_service),
    user_service: UserService = Depends(get_user_service),
):
    """Add a user to an organization."""
    user = await user_service.read_by_auth0_id(user_info.auth0_id)

    async with await get_client().start_session() as session:
        async with session.start_transaction():
            # Add the user to the organization
            updated_org = await org_service.add_member(
                org_id=org_id, user_id=user.id, role=user_info.role
            )
            # Also add the organization to the user's organizations list
            await user_service.add_organization(
                user_id=user.id, org_id=org_id, role=user_info.role
            )

    return updated_org
