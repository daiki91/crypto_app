from rest_framework.decorators import api_view
from rest_framework.response import Response
from .encryption import encrypt_text, decrypt_text
from .models import Chiffrement
from rest_framework import serializers, viewsets

class ChiffrementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chiffrement
        fields = "__all__"

from rest_framework import viewsets

class ChiffrementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Chiffrement.objects.all().order_by("-date_operation")
    serializer_class = ChiffrementSerializer

@api_view(["POST"])
def process_text(request):
    mode = request.data.get("mode")
    text = request.data.get("text", "")

    if mode == "encrypt":
        result = encrypt_text(text)
        obj = Chiffrement.objects.create(
            mode="encrypt", texte_clair=text, texte_chiffre=result
        )
    elif mode == "decrypt":
        result = decrypt_text(text)
        obj = Chiffrement.objects.create(
            mode="decrypt", texte_chiffre=text, texte_clair=result
        )
    else:
        result = "Mode invalide"

    return Response({
        "result": result,
        "id": obj.id if mode in ["encrypt", "decrypt"] else None
    })
