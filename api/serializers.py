from rest_framework.serializers import ModelSerializer
from api.models import Banks


class BanksSerializer(ModelSerializer):
    class Meta:
        model = Banks
        fields = "__all__"
