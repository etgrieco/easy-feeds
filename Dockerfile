FROM ruby:2.6.2

WORKDIR /app

# Installs node for asset pipeline
RUN apt-get update \
  && curl -sL https://deb.nodesource.com/setup_10.x | bash \
  && apt-get install -y nodejs

# Installs gems
ENV BUNDLE_PATH=/bundle \
  BUNDLE_BIN=/bundle/bin \
  GEM_HOME=/bundle
ENV PATH="${BUNDLE_BIN}:${PATH}"
RUN gem install bundler -v 2.0.2
COPY Gemfile Gemfile.lock ./
RUN bundle install --binstubs="$BUNDLE_BIN"

COPY . .

EXPOSE 3000

CMD bundle exec rails server -b 0.0.0.0 -p 3000