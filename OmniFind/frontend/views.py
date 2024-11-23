from django.contrib.auth.views import LoginView
from django.shortcuts import render

from .forms import CustomLoginForm


# Create your views here.
def index(request):
    return render(request, "frontend/index.html")


class CustomLoginView(LoginView):

    template_name = "frontend/index.html"
    next_page = "#"
    form_class = CustomLoginForm
