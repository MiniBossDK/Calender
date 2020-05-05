FROM  python:3.7
EXPOSE 3333
WORKDIR /user/app
COPY . .
CMD ["python3", "-m", "http.server", "3333"]