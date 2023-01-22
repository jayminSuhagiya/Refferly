FROM python:3.9 

ADD . ./api
WORKDIR api
RUN pip install --upgrade -r /api/requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
