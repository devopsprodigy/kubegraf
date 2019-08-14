FROM grafana/grafana:6.0.0

COPY . /var/lib/grafana/plugins/devopsprodigy-kubegraf
