#! /bin/sh
docker build -t gcr.io/atlantean-force-165018/dripio-dashboard:v1.25 .
docker push gcr.io/atlantean-force-165018/dripio-dashboard:v1.25
