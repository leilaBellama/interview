from enum import Enum
from typing import Annotated
from pydantic import Field, BaseModel
from beanie import Document, Indexed, PydanticObjectId
from pymongo import ASCENDING, IndexModel


class UserRole(str, Enum):
    MEMBER = "member"
    ADMIN = "admin"


class UserOrganization(BaseModel):
    org_id: PydanticObjectId
    role: UserRole = UserRole.MEMBER


class User(Document):
    id: PydanticObjectId = Field(default_factory=PydanticObjectId, alias="_id")
    auth0_id: Annotated[str, Indexed(unique=True)]
    organizations: list[UserOrganization] = Field(default_factory=list)

    class Settings:
        name = "users"
        # Index for efficient organization membership queries
        indexes = [IndexModel([("organizations.org_id", ASCENDING)])]

    class Create(BaseModel):
        auth0_id: str

    class Response(BaseModel):
        id: PydanticObjectId
        auth0_id: str
        organizations: list[UserOrganization]
