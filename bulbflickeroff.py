import RPi.GPIO as GPIO
import time
import sys
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(16,GPIO.OUT)

a=sys.argv[1]

while a==10:
  GPIO.output(16,True)
  
  time.sleep(0.5)
  GPIO.output(16,False)
  time.sleep(0.5)
  
if a==20:
  GPIO.setwarnings(False)
  GPIO.output(16,False)
  GPIO.cleanup()
