FROM ewoutp/lessc

RUN npm install -g onchange
RUN npm install -g less-plugin-clean-css

RUN mkdir /app
WORKDIR /app

ENTRYPOINT onchange "./*.less" -i -- lessc -sm=on --clean-css "card.less" "card.css"

# Usage: docker build -t card-lessc -f less.Dockerfile . && docker run -it --rm -v $(pwd):/app card-lessc