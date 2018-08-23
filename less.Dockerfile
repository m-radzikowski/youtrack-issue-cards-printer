FROM ewoutp/lessc

RUN npm install -g onchange@3.3.0
RUN npm install -g less-plugin-clean-css@1.5.1

COPY docker/less-compile.sh /less-compile.sh

RUN mkdir /app
WORKDIR /app

ENTRYPOINT onchange "**/*.less" -w -- /less-compile.sh "{{changed}}"

# Usage: docker build -t less-compiler -f less.Dockerfile . && docker run -it --rm -v $(pwd):/app less-compiler