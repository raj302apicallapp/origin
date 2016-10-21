import RPi.GPIO as GPIO
import time
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(24,GPIO.OUT)
GPIO.output(24,True)
white = GPIO.PWM(24,100)
white.start(0)
white.ChangeDutyCycle(10)



     
     

