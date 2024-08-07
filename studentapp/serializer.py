from  rest_framework import serializers
from .models import StudentDetails,StudentMarks,StudentGrades


class Student(serializers.ModelSerializer) :
    class Meta :
        model = StudentDetails
        fields = '__all__'

class Marks(serializers.ModelSerializer) :
    class Meta :
        model = StudentMarks
        fields = '__all__'

class Grades(serializers.ModelSerializer) :
    class Meta :
        model = StudentGrades
        fields = '__all__'