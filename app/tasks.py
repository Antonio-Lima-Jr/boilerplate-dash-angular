from django_celery.celery import app
from celery.schedules import crontab

# Schedule
@app.on_after_finalize.connect
def setup_periodic_tasks(sender, **kwargs):
    # Calls test('hello') every 1 seconds.
    sender.add_periodic_task(1.0, test.s('hello'), name='add every 1')
    sender.add_periodic_task(1.0, add.s(5, 10), name='add every 10')

    # Calls test('world') every 3 seconds
    sender.add_periodic_task(3.0, test.s('world'), expires=10)

# Tasks
@app.task
def test(arg):
    print(arg)
    
@app.task
def add(x, y):
    z = x + y
    print(z)