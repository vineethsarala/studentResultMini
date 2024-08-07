from django.shortcuts import render
from .models import StudentDetails,StudentMarks,StudentGrades
from rest_framework import viewsets
from .serializer import Student,Marks,Grades
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class StudentViewset(viewsets.ModelViewSet) :
    queryset = StudentDetails.objects.all()
    serializer_class = Student


class StudentMarksViewset(viewsets.ModelViewSet) :
    queryset=StudentMarks.objects.all()
    serializer_class=Marks  


class StudentGradesViewSet(viewsets.ModelViewSet) :
    queryset=StudentGrades.objects.all()
    serializer_class=Grades



class StudentDeleteByNumber(APIView):
    def delete(self, request, student_number):
        try:
           
            StudentMarks.objects.filter(studentNumber=student_number).delete()
            
            StudentDetails.objects.filter(studentNumber=student_number).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except StudentDetails.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
