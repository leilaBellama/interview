import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from motor.motor_asyncio import AsyncIOMotorClient

from api.main import app
import api.core.database as db_module


@pytest.fixture(scope="function")
def event_loop():
    """Create an instance of the default event loop for each test function."""
    import asyncio
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    yield loop
    loop.close()


@pytest_asyncio.fixture(scope="function")
async def db_client():
    client = AsyncIOMotorClient("mongodb://root:example@localhost:27017")
    yield client
    client.close()


@pytest_asyncio.fixture(scope="function")
async def patch_mongo_client(monkeypatch, db_client: AsyncIOMotorClient):
    """
    Patches the global 'client' object in the database module
    with the test client and initializes the database.
    """
    monkeypatch.setattr(db_module, "client", db_client)
    
    await db_module.drop_collections()
    
    # Initialize the database using the same function the app uses
    await db_module.init_db()


@pytest_asyncio.fixture(scope="function")
async def async_client(patch_mongo_client):
    """
    Provides an httpx client for an app where the DB client has been patched.
    """
    transport = ASGITransport(app=app)

    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client
