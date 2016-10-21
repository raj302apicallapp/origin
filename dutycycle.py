import RPi.GPIO as GPIO
import sys

GPIO.setmode(GPIO.BCM)

PIN_LIVING = 16
GPIO.setup(PIN_LIVING, GPIO.OUT)
living = GPIO.PWM(PIN_LIVING, 100)
living.start(0)
dc = 50
living.ChangeDutyCycle(dc)
