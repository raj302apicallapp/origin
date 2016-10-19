import RPi.GPIO as GPIO
import time
for i in range(0,10):
	GPIO.output(16,True)
	time.sleep(0.5)
	GPIO.output(16,False)
	time.sleep(0.5)
print "Done"
GPIO.cleanup()