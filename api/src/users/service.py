from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClientSession
from beanie import PydanticObjectId
import pymongo


from api.core.exceptions import NotFoundException, AlreadyExistsException
from api.core.logging import get_logger
from api.src.users.types import User, UserOrganization, UserRole


logger = get_logger(__name__)


class UserService:

    async def create(
        self,
        new_user: User.Create,
        session: Optional[AsyncIOMotorClientSession] = None,
    ) -> User:
        """Create a new user in the database."""
        # Check if user with this auth0_id already exists
        existing_user = await User.find_one(
            {"auth0_id": new_user.auth0_id}, session=session
        )
        if existing_user:
            raise AlreadyExistsException(
                f"User with auth0_id '{new_user.auth0_id}' already exists"
            )

        # Create a new User document from the creation data
        user = User(auth0_id=new_user.auth0_id)

        # Save the user to the database
        await user.insert(session=session)

        logger.info(f"Created new user with auth0_id: {new_user.auth0_id}")
        return user

    async def read_by_id(
        self,
        user_id: PydanticObjectId,
        session: Optional[AsyncIOMotorClientSession] = None,
    ) -> User:
        """Read a user by their primary key (id)."""
        user = await User.get(user_id, session=session)
        if not user:
            raise NotFoundException(f"User with id '{user_id}' not found")

        logger.info(f"Retrieved user with id: {user_id}")
        return user

    async def read_by_auth0_id(
        self, auth0_id: str, session: Optional[AsyncIOMotorClientSession] = None
    ) -> User:
        """Read a user by their auth0_id."""
        user = await User.find_one({"auth0_id": auth0_id}, session=session)
        if not user:
            raise NotFoundException(f"User with auth0_id '{auth0_id}' not found")

        logger.info(f"Retrieved user with auth0_id: {auth0_id}")
        return user

    async def read_by_auth0_id_or_create(
        self,
        auth0_id: str,
        session: Optional[AsyncIOMotorClientSession] = None,
    ) -> User:
        """Read a user by their auth0_id or create new one in 1 operation."""

        result = await User.find_one(User.auth0_id == auth0_id).update(
            {"$setOnInsert": User(auth0_id=auth0_id).model_dump(by_alias=True)},
            upsert=True,
            response_type=pymongo.ReturnDocument.AFTER,
            session=session,
        )

        logger.info(f"Retrieved or created user with auth0_id: {auth0_id}")
        return result

    async def read_by_auth0_id_in_org(
        self,
        auth0_id: str,
        org_id: PydanticObjectId,
        session: Optional[AsyncIOMotorClientSession] = None,
    ) -> User:
        user = await User.find_one(
            {"auth0_id": auth0_id, "organizations.org_id": org_id}, session=session
        )
        if not user:
            raise NotFoundException(
                f"User with auth0_id '{auth0_id}' not found in org '{org_id}'"
            )
        logger.info(f"Retrieved user from org {org_id} with auth0_id: {auth0_id}")
        return user

    async def add_organization(
        self,
        user_id: PydanticObjectId,
        org_id: PydanticObjectId,
        role: UserRole = UserRole.MEMBER,
        session: Optional[AsyncIOMotorClientSession] = None,
    ) -> User:
        """Add an organization to a user's organizations list."""
        user = await self.read_by_id(user_id, session=session)

        # Check if user is already a member of this organization
        if any(org.org_id == org_id for org in user.organizations):
            raise AlreadyExistsException(
                f"User is already a member of organization {org_id}"
            )

        # Add the organization to the user
        user.organizations.append(UserOrganization(org_id=org_id, role=role))
        await user.save(session=session)

        logger.info(f"Added user {user_id} to organization {org_id} with role {role}")
        return user

    async def update(self, session: Optional[AsyncIOMotorClientSession] = None):
        raise NotImplementedError("Update method not implemented.")

    async def delete(self, session: Optional[AsyncIOMotorClientSession] = None):
        raise NotImplementedError("Delete method not implemented.")
