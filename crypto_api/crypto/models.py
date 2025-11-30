from django.db import models

class Chiffrement(models.Model):
    MODE_CHOICES = [
        ("encrypt", "Chiffrement"),
        ("decrypt", "Déchiffrement"),
    ]

    mode = models.CharField(max_length=10, choices=MODE_CHOICES)
    texte_clair = models.TextField(blank=True, null=True)
    texte_chiffre = models.TextField(blank=True, null=True)
    date_operation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.mode} - {self.date_operation.strftime('%Y-%m-%d %H:%M:%S')}"
