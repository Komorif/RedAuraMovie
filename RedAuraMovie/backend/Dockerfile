FROM python:3.13.0-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

ENTRYPOINT ["/app/docker-entrypoint.sh"]

CMD ["gunicorn", "mysite.wsgi:application", "--bind", "0.0.0.0:8000", "--log-level", "info"]