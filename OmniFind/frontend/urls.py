from django.urls import path

from .views import CustomLoginView, index

urlpatterns = [
    path("", CustomLoginView.as_view(), name="landing-page"),
    # path("", TemplateView.as_view(template_name="base.html")),
]
