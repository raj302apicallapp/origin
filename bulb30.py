import RPi.GPIO as GPIO
import time
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(24,GPIO.OUT)
GPIO.cleanup()
white = GPIO.PWM(24,100)
white.start(0)
white.ChangeDutyCycle(30)



     
     

