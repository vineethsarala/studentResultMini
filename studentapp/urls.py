from django.urls import path
from .views import StudentDeleteByNumber

urlpatterns = [
    path('app/Student/<int:student_number>/', StudentDeleteByNumber.as_view(), name='student-delete-by-number'),
]
