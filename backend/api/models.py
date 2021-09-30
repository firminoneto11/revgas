from django.db import models


class Base(models.Model):
    created_at = models.DateTimeField(verbose_name="Created at", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="Updated at", auto_now=True)

    class Meta:
        abstract = True


class Banks(Base):
    compensation_code = models.IntegerField(verbose_name="Código de compensação", unique=True, null=False, blank=False)
    institution_name = models.CharField(verbose_name="Nome da instituição", max_length=100, null=False, blank=False)

    def __str__(self):
        return self.institution_name

    class Meta:
        db_table = "BANKS"
        ordering = ["compensation_code"]
        verbose_name = "Bank"
        verbose_name_plural = "Banks"
