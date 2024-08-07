from django.db import models

class StudentDetails(models.Model) :
    studentNumber = models.IntegerField()
    name = models.CharField(max_length=60)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    standard= models.IntegerField()
    dept = models.CharField(max_length=30)

    def __str__(self):
        return self.studentNumber
    
    
class StudentMarks(models.Model):
    studentNumber = models.IntegerField()
    subject1 = models.IntegerField()
    subject2 = models.IntegerField()
    subject3 = models.IntegerField()
    subject4 = models.IntegerField()
    subject5 = models.IntegerField()
    subject6 = models.IntegerField()


    def __str__(self):
        return self.studentNumber
    

class StudentGrades(models.Model) :
    grade = models.CharField(max_length=1)
    marklevelstart = models.IntegerField()
    marklevelend = models.IntegerField()


    def __str__(self):
        return self.grade