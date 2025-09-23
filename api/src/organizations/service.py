from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClientSession
from beanie import PydanticObjectId


from api.core.exceptions import NotFoundException, AlreadyExistsException
from api.core.logging import get_logger
from api.src.organizations.types import Organization, OrganizationUser
from api.src.users.types import User, UserRole

logger = get_logger(__name__)


class OrganizationService:

    async def create(
        self,
        new_org: Organization.Create,
        session: Optional[AsyncIOMotorClientSession] = None,
    ) -> Organization:
        """Create a new organization in the database."""
        # Check if organization with this name already exists
        existing_org = await Organization.find_one(
            {"org_name": new_org.org_name}, session=session
        )
        if existing_org:
            raise AlreadyExistsException(
                f"Organization with name '{new_org.org_name}' already exists"
            )

        # Create a new Organization document from the creation data
        org = Organization(org_name=new_org.org_name)

        # Save the organization to the database
        await org.insert(session=session)

        logger.info(f"Created new organization with name: {new_org.org_name}")
        return org

    async def read_by_id(
        self,
        org_id: PydanticObjectId,
        session: Optional[AsyncIOMotorClientSession] = None,
    ) -> Organization:
        """Read an organization by their primary key (id)."""
        org = await Organization.get(org_id, session=session)
        if not org:
            raise NotFoundException(f"Organization with id '{org_id}' not found")

        logger.info(f"Retrieved organization with id: {org_id}")
        return org

    async def read_by_name(
        self, org_name: str, session: Optional[AsyncIOMotorClientSession] = None
    ) -> Organization:
        """Read an organization by their name."""
        org = await Organization.find_one({"org_name": org_name}, session=session)
        if not org:
            raise NotFoundException(f"Organization with name '{org_name}' not found")

        logger.info(f"Retrieved organization with name: {org_name}")
        return org

    async def add_member(
        self,
        org_id: PydanticObjectId,
        user_id: PydanticObjectId,
        role: UserRole = UserRole.MEMBER,
        session: Optional[AsyncIOMotorClientSession] = None,
    ) -> Organization:
        """Add a user to an organization's members list."""
        org = await self.read_by_id(org_id, session=session)
        
        # Check if user is already a member of this organization
        if any(member.user_id == user_id for member in org.members):
            raise AlreadyExistsException(f"User {user_id} is already a member of organization {org_id}")
        
        # Add the user to the organization
        org.members.append(OrganizationUser(user_id=user_id, role=role))
        await org.save(session=session)
        
        logger.info(f"Added user {user_id} to organization {org_id} with role {role}")
        return org

    async def list_all(self) -> list[Organization]:
        return await Organization.find_all().to_list()

    async def update(self, session: Optional[AsyncIOMotorClientSession] = None):
        raise NotImplementedError("Update method not implemented.")

    async def delete(self, session: Optional[AsyncIOMotorClientSession] = None):
        raise NotImplementedError("Delete method not implemented.")