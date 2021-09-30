from rest_framework.generics import GenericAPIView


class Gen(GenericAPIView):
    """
    This class inherits from 'GenericAPIView' and implements only a method called 'get_paginated_serializer', which is responsible 
    for executing a necessary part for the API's pagination.
    """
    def get_paginated_serializer(self):
        page = self.paginate_queryset(self.queryset)
        if page is not None:
            return self.get_serializer(page, many=True)
        return False


def find_element(model, identifier):
        """
        Function that will query the database for an element based on the parameters 'model' and 'identifier' if exists. Returns
        None if it does not find it.
        """
        try:
            element = model.objects.get(pk=int(identifier))
        except Exception:
            return None
        else:
            return element
