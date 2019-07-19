FROM ruby:2.6.2

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN gem install bundler && bundle install
# Installs node for asset pipeline
RUN apt-get update && \
  curl -sL https://deb.nodesource.com/setup_10.x | bash && \
  apt-get install -y nodejs

COPY . .

EXPOSE 3000

CMD bundle exec rails server -b 0.0.0.0 -p 3000