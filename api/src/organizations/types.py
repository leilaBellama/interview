from typing import Annotated
from beanie import Document, Indexed, PydanticObjectId
from pydantic import Field, BaseModel, StringConstraints
from pymongo import ASCENDING, IndexModel

from api.src.users.types import UserRole


class OrganizationUser(BaseModel):
    user_id: PydanticObjectId
    role: UserRole = UserRole.MEMBER

    class Create(BaseModel):
        auth0_id: str
        role: UserRole = UserRole.MEMBER
    
    class Response(BaseModel):
        user_id: PydanticObjectId
        role: UserRole


class Organization(Document):
    id: PydanticObjectId = Field(default_factory=PydanticObjectId, alias="_id")
    org_name: Annotated[str, Indexed(unique=True)]
    members: list[OrganizationUser] = Field(default_factory=list)

    class Settings:
        name = "organizations"
        indexes = [IndexModel([("members.user_id", ASCENDING)])]

    class Create(BaseModel):
        org_name: Annotated[
            str,
            StringConstraints(
                strip_whitespace=True,
                min_length=5,
                max_length=100,
                pattern=r"^[a-zA-Z-_]+$",
            ),
        ]

    class Response(BaseModel):
        id: PydanticObjectId
        org_name: str
        members: list[OrganizationUser.Response]
