from api.utils import Gen, find_element
from rest_framework.response import Response
from rest_framework import status as st
from api.models import Banks
from api.serializers import BanksSerializer


class BanksApi(Gen):
    """
    An API for listing the existing bank companies.
    """
    queryset = Banks.objects.all()
    serializer_class = BanksSerializer

    def get(self, _request, compensation_code=None):
        # Returning a specific element from the database if a compensation code is informed
        if compensation_code:
            self.queryset = find_element(model=Banks, identifier=compensation_code)
            if self.queryset is not None:
                serialized_data = self.get_serializer(instance=self.queryset, many=False)
                return Response(data=serialized_data.data)
            return Response(data={"invalid_bank": "There isn't a bank registered in the database with the given compensation code."}, status=st.HTTP_404_NOT_FOUND)

        # Getting the paginated serialized data and returning it
        paginated_serializer = self.get_paginated_serializer()
        if paginated_serializer:
            return self.get_paginated_response(data=paginated_serializer.data)
        return Response(data={"error": "An error occurred."}, status=st.HTTP_500_INTERNAL_SERVER_ERROR)
