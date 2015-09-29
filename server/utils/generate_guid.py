import uuid
import base64

# Generate a Globally Unique Identifier for API-access token
def generate_guid():
    r_uuid = base64.urlsafe_b64encode(uuid.uuid4().bytes)
    return r_uuid.replace('=', '')
