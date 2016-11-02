import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.cleanup()
GPIO.setup(10,GPIO.OUT)
print("done")
GPIO.output(10,True)

