import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BOARD)
GPIO.setup(16,GPIO.OUT)
for x in range(1,3):
  GPIO.output(16,True)
  time.sleep(.5)
  GPIO.output(16,False)
  time.sleep(.5)
GPIO.cleanup()
