from celery import shared_task


@shared_task
def test(arg):
    print('from app - È NOZEZ' + arg)