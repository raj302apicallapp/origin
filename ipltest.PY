import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO.setup(24,GPIO.OUT)
white = GPIO.PWM(24,100)
white.start(50)
white.ChangeDutyCycle(60)



     
     

