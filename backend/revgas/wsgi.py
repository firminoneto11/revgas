"""
WSGI config for revgas project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os
from django.conf import settings
from dj_static import Cling

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'revgas.settings')

if settings.DEBUG:
    application = get_wsgi_application()
else:
    application = Cling(get_wsgi_application())
