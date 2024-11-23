from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User


class CustomLoginForm(AuthenticationForm):
    """
    A custom Login form with handles to the username and password field
    to enable form manipulation using external libraries
    """

    class Meta:
        model = User
        fields = ["username", "password"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["password"].widget.attrs["class"] = "password-field"
        self.fields["username"].widget.attrs["class"] = "username-field"
